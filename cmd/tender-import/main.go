package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent/area"
	"cscd-bds/store/ent/district"
	"cscd-bds/store/ent/province"
	"cscd-bds/store/ent/schema/geo"
	"cscd-bds/store/ent/user"
	"encoding/json"
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

	hkProvince, err := st.Province.Query().Where(province.Adcode(810000)).Only(ctx)
	if err != nil {
		fmt.Println(err)
		return
	}

	hkFinder, err := st.User.Query().Where(user.Name("劉世瑛")).Only(ctx)
	if err != nil {
		fmt.Println(err)
		return
	}

	hkCreatedBy, err := st.User.Query().Where(user.Name("余敬琳")).Only(ctx)
	if err != nil {
		fmt.Println(err)
		return
	}

	hkArea, err := st.Area.Query().Where(area.Code("GA")).Only(ctx)
	if err != nil {
		fmt.Println(err)
		return
	}

	rows, err := f.GetRows("hk")
	if err != nil {
		fmt.Println(err)
		return
	}
	codeMap := map[string][]string{}
row:
	for _, row := range rows {
		time.Sleep(time.Second)
		var code string

		q := st.Tender.Create().
			SetStatus(1).
			SetArea(hkArea).
			SetProvince(hkProvince).
			SetFinder(hkFinder).
			SetCreatedBy(hkCreatedBy)

		for j, colCell := range row {
			if j == 0 {
				// if colCell != "T2024-89" && colCell != "T2024-91" {
				// 	continue row
				// }
				q.SetTenderCode(colCell)
			}
			if j == 1 {
				q.SetName(colCell)
				var address string
				fmt.Println(colCell)
				if strings.Contains(colCell, "亞洲博覽館") {
					address = "亞洲博覽館"
				} else if strings.Contains(colCell, "港深創新") {
					address = "港深創新及科技園"
				} else if strings.Contains(colCell, "The Henderson Art Garden") {
					address = "美利道2號"
				} else if strings.Contains(colCell, "發祥街1號") {
					address = "發祥街1號"
				} else {
					address = strings.Split(colCell, " - ")[0]
				}
				adcode, lng, lat, fullAddress, err := getGeoCoordinate(address)
				if err != nil {
					fmt.Println(err)
					continue row
				}
				q.SetFullAddress(fullAddress)
				if strings.Contains(colCell, "港深創新") {
					adcode = 810013
				}
				d, err := st.District.Query().Where(district.Adcode(adcode)).Only(ctx)
				if err != nil {
					fmt.Println(err)
					continue row
				}
				center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{lng, lat}).SetSRID(4326))
				if err != nil {
					fmt.Println(err)
					continue row
				} else {
					coordinate := &geo.GeoJson{Geometry: center}
					q.SetGeoCoordinate(coordinate).SetDistrict(d)
				}
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
					q.SetDiscoveryDate(t)
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
			fmt.Println("code is empty")
			continue row
		}

		if err := q.Exec(ctx); err != nil {
			fmt.Println(err)
		}
	}

	if err := wg.Wait(); err != nil {
		fmt.Println(err)
	}
}

func getGeoCoordinate(address string) (int, float64, float64, string, error) {
	// GET https://restapi.amap.com/v3/geocode/geo?key=28982eb1a6a3cd956e0e0614c2fb131b&city=香港特别行政区&address=亞洲博覽館
	req, err := http.NewRequest("GET", "https://restapi.amap.com/v3/geocode/geo", nil)
	if err != nil {
		return 0, 0, 0, "", err
	}
	q := req.URL.Query()
	q.Add("key", "28982eb1a6a3cd956e0e0614c2fb131b")
	// q.Add("city", "香港特别行政区")
	q.Add("address", address)
	req.URL.RawQuery = q.Encode()
	resp, err := hc.Do(req)
	if err != nil {
		return 0, 0, 0, "", err
	}
	defer resp.Body.Close()

	var geoResp GeoResponse
	if err := json.NewDecoder(resp.Body).Decode(&geoResp); err != nil {
		return 0, 0, 0, "", err
	}

	if len(geoResp.GeoCodes) < 1 {
		return 0, 0, 0, "", fmt.Errorf("error")
	}

	loc := strings.Split(geoResp.GeoCodes[0].Location, ",")
	lat, err := strconv.ParseFloat(loc[0], 64)
	if err != nil {
		return 0, 0, 0, "", err
	}
	lng, err := strconv.ParseFloat(loc[1], 64)
	if err != nil {
		return 0, 0, 0, "", err
	}
	adcode, _ := strconv.Atoi(geoResp.GeoCodes[0].AdCode)
	return adcode, lng, lat, geoResp.GeoCodes[0].FormattedAddress, nil
}

type GeoResponse struct {
	Status   string    `json:"status"`
	Info     string    `json:"info"`
	InfoCode string    `json:"infocode"`
	Count    string    `json:"count"`
	GeoCodes []GeoCode `json:"geocodes"`
}

type GeoCode struct {
	FormattedAddress string `json:"formatted_address"`
	Country          string `json:"country"`
	Province         string `json:"province"`
	// City             []string    `json:"city"`
	// District     string      `json:"district"`
	Township     []string    `json:"township"`
	Neighborhood SubLocation `json:"neighborhood"`
	Building     SubLocation `json:"building"`
	AdCode       string      `json:"adcode"`
	// Street           []string    `json:"street"`
	// Number   []string `json:"number"`
	Location string `json:"location"`
	Level    string `json:"level"`
}

type SubLocation struct {
	Name []string `json:"name"`
	Type []string `json:"type"`
}
