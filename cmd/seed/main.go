package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent/schema/geo"
	"encoding/json"
	"os"

	"github.com/twpayne/go-geom"
	"github.com/twpayne/go-geom/encoding/geojson"
)

type AutoGenerated struct {
	Adcode   int       `json:"adcode"`
	Level    string    `json:"level"`
	Center   []float64 `json:"center"`
	Name     string    `json:"name"`
	Children []struct {
		Adcode   int       `json:"adcode"`
		Level    string    `json:"level"`
		Center   []float64 `json:"center"`
		Name     string    `json:"name"`
		Children []struct {
			Adcode   int       `json:"adcode"`
			ProvCode int       `json:"provCode"`
			CityCode int       `json:"cityCode"`
			Level    string    `json:"level"`
			Center   []float64 `json:"center"`
			Name     string    `json:"name"`
			Bbox     []int     `json:"bbox"`
			Acroutes []int     `json:"acroutes"`
			Children []struct {
				AdCode   int        `json:"adcode"`
				ProvCode int        `json:"provCode"`
				CityCode int        `json:"cityCode"`
				Level    string     `json:"level"`
				Center   [2]float64 `json:"center"`
				Name     string     `json:"name"`
				BBox     [4]int     `json:"bbox"`
				ACRoutes [3]int     `json:"acroutes"`
			} `json:"children,omitempty"`
		} `json:"children,omitempty"`
		Acroutes  []int `json:"acroutes"`
		Bbox      []int `json:"bbox"`
		IdealZoom int   `json:"idealZoom,omitempty"`
	} `json:"children"`
	Bbox      []int `json:"bbox"`
	IdealZoom int   `json:"idealZoom"`
	Pz        int   `json:"pz"`
	Radix     int   `json:"radix"`
}

func main() {

	ctx := context.Background()
	s := store.New(false)

	b, err := os.ReadFile("country-tree.json")
	if err != nil {
		panic(err)
	}

	var country AutoGenerated
	if err = json.Unmarshal(b, &country); err != nil {
		panic(err)
	}

	center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{country.Center[1], country.Center[0]}).SetSRID(4326))
	if err != nil {
		panic(err)
	}
	coun := s.Country.Create().
		SetName(country.Name).
		SetAdcode(country.Adcode).
		SetCenter(&geo.GeoJson{Geometry: center}).
		SaveX(ctx)
	if err != nil {
		panic(err)
	}

	countryId := coun.ID
	for _, province := range country.Children {
		center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{province.Center[1], province.Center[0]}).SetSRID(4326))
		if err != nil {
			panic(err)
		}
		p, err := s.Province.Create().
			SetCountryID(countryId).
			SetName(province.Name).
			SetAdcode(province.Adcode).
			SetCenter(&geo.GeoJson{Geometry: center}).
			Save(ctx)
		if err != nil {
			panic(err)
		}

		for _, child := range province.Children {
			if child.Level == "city" {
				center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{child.Center[1], child.Center[0]}).SetSRID(4326))
				if err != nil {
					panic(err)
				}
				ci, err := s.City.Create().
					SetProvinceID(p.ID).
					SetName(child.Name).
					SetAdcode(child.Adcode).
					SetProvCode(child.ProvCode).
					SetCenter(&geo.GeoJson{Geometry: center}).
					Save(ctx)
				if err != nil {
					panic(err)
				}

				for _, district := range child.Children {
					center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{district.Center[1], district.Center[0]}).SetSRID(4326))
					if err != nil {
						panic(err)
					}
					if _, err := s.District.Create().
						SetCityID(ci.ID).
						SetProvinceID(p.ID).
						SetName(district.Name).
						SetProvCode(district.ProvCode).
						SetCityCode(district.CityCode).
						SetAdcode(district.AdCode).
						SetCenter(&geo.GeoJson{Geometry: center}).
						Save(ctx); err != nil {
						panic(err)
					}
				}
			}

			if child.Level == "district" {
				center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{child.Center[1], child.Center[0]}).SetSRID(4326))
				if err != nil {
					panic(err)
				}
				_, err = s.District.Create().
					SetProvinceID(p.ID).
					SetName(child.Name).
					SetProvCode(child.ProvCode).
					SetCityCode(child.CityCode).
					SetAdcode(child.Adcode).
					SetCenter(&geo.GeoJson{Geometry: center}).
					Save(ctx)
				if err != nil {
					panic(err)
				}
			}
		}

	}

}
