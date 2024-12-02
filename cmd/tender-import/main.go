package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent/province"
	"cscd-bds/store/ent/schema/geo"
	"cscd-bds/store/ent/schema/xid"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/twpayne/go-geom"
	"github.com/twpayne/go-geom/encoding/geojson"
	"github.com/xuri/excelize/v2"
	"golang.org/x/sync/errgroup"
)

var (
	hc = &http.Client{}
)

func main() {
	f, err := excelize.OpenFile("cmd/tender-import/source.xlsx")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer func() {
		if err := f.Close(); err != nil {
			fmt.Println(err)
		}
	}()

	ctx := context.Background()
	st := store.NewStore()
	wg := &errgroup.Group{}

	rows, err := f.GetRows("source")
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, row := range rows {

		wg.Go(func() error {
			var code string
			codeMap := map[string][]string{}

			q := st.Tender.Create().
				SetStatus(1).
				SetAreaID(xid.ID("AR-csurl81hi0179h2ef5ng"))

			for j, colCell := range row {
				if j == 0 {
					q.SetTenderCode(colCell)
				}
				if j == 1 {
					adcode, lng, lat, err := getGeoCoordinate(colCell)
					if err != nil {
						return err
					}
					p, err := st.Province.Query().Where(province.Adcode(adcode)).Only(ctx)
					if err != nil {
						return err
					}
					center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{lng, lat}).SetSRID(4326))
					if err != nil {
						return err
					}
					coordinate := &geo.GeoJson{Geometry: center}
					q.SetName(colCell).SetGeoCoordinate(coordinate).SetProvince(p)
				}
				if j == 2 {
					q.SetDeveloper(colCell)
				}
				if j == 3 {
					q.SetArchitect(colCell)
				}
				if j == 4 {
					q.SetFacadeConsultant(colCell)
				}
				if j == 5 {
					q.SetContractor(colCell)
				}
				if j == 6 {
					t, err := time.Parse("01-02-06", colCell)
					if err != nil {
						fmt.Println(err)
					}
					if err == nil {
						code = fmt.Sprintf("GA%s%03d", t.Format("20060102"), len(codeMap[colCell])+1)
						fmt.Println(code)
						codeMap[colCell] = append(codeMap[colCell], colCell)
						q.SetCreatedAt(t).SetCode(code)
					}
				}
				if j == 8 {
					t, err := time.Parse("01-02-06", colCell)
					if err == nil {
						q.SetTenderClosingDate(t)
					}
				}

			}
			fmt.Println()

			if code == "" {
				return errors.New("code is empty")
			}

			return q.Exec(ctx)
		})
	}

	if err := wg.Wait(); err != nil {
		fmt.Println(err)
	}
}

func getGeoCoordinate(address string) (int, float64, float64, error) {
	// GET https://restapi.amap.com/v3/geocode/geo?key=28982eb1a6a3cd956e0e0614c2fb131b&city=香港特别行政区&address=亞洲博覽館
	req, err := http.NewRequest("GET", "https://restapi.amap.com/v3/geocode/geo", nil)
	if err != nil {
		return 0, 0, 0, err
	}
	q := req.URL.Query()
	q.Add("key", "28982eb1a6a3cd956e0e0614c2fb131b")
	q.Add("city", "香港特别行政区")
	q.Add("address", address)
	req.URL.RawQuery = q.Encode()
	resp, err := hc.Do(req)
	if err != nil {
		return 0, 0, 0, err
	}
	defer resp.Body.Close()

	var geoResp GeoResponse
	if err := json.NewDecoder(resp.Body).Decode(&geoResp); err != nil {
		return 0, 0, 0, err
	}
	fmt.Println(geoResp)

	if len(geoResp.GeoCodes) != 1 {
		return 0, 0, 0, fmt.Errorf("error")
	}

	loc := strings.Split(geoResp.GeoCodes[0].Location, ",")
	lat, err := strconv.ParseFloat(loc[0], 64)
	if err != nil {
		return 0, 0, 0, err
	}
	lng, err := strconv.ParseFloat(loc[1], 64)
	if err != nil {
		return 0, 0, 0, err
	}
	adcode, _ := strconv.Atoi(geoResp.GeoCodes[0].AdCode)
	return adcode, lng, lat, nil
}

type GeoResponse struct {
	Status   string    `json:"status"`
	Info     string    `json:"info"`
	InfoCode string    `json:"infocode"`
	Count    string    `json:"count"`
	GeoCodes []GeoCode `json:"geocodes"`
}

type GeoCode struct {
	FormattedAddress string      `json:"formatted_address"`
	Country          string      `json:"country"`
	Province         string      `json:"province"`
	City             []string    `json:"city"`
	District         string      `json:"district"`
	Township         []string    `json:"township"`
	Neighborhood     SubLocation `json:"neighborhood"`
	Building         SubLocation `json:"building"`
	AdCode           string      `json:"adcode"`
	Street           []string    `json:"street"`
	Number           []string    `json:"number"`
	Location         string      `json:"location"`
	Level            string      `json:"level"`
}

type SubLocation struct {
	Name []string `json:"name"`
	Type []string `json:"type"`
}
