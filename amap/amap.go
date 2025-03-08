package amap

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

type AMap struct {
	Key string
	hc  *http.Client
}

func New(key string) *AMap {
	return &AMap{Key: key, hc: &http.Client{}}
}

func (a *AMap) GeoCode(address string) (int, float64, float64, string, error) {
	req, err := http.NewRequest("GET", "https://restapi.amap.com/v3/geocode/geo", nil)
	if err != nil {
		return 0, 0, 0, "", err
	}
	q := req.URL.Query()
	q.Add("key", a.Key)
	q.Add("address", address)
	req.URL.RawQuery = q.Encode()
	resp, err := a.hc.Do(req)
	if err != nil {
		return 0, 0, 0, "", err
	}
	defer resp.Body.Close()

	var geoResp GeoResponse
	if err := json.NewDecoder(resp.Body).Decode(&geoResp); err != nil {
		return 0, 0, 0, "", err
	}

	if len(geoResp.GeoCodes) < 1 {
		return 0, 0, 0, "", fmt.Errorf("no geo code")
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

func (a *AMap) Regeo(lng float64, lat float64) (RegeoResponse, error) {
	req, err := http.NewRequest("GET", "https://restapi.amap.com/v3/geocode/regeo", nil)
	if err != nil {
		return RegeoResponse{}, err
	}
	q := req.URL.Query()
	q.Add("key", a.Key)
	q.Add("location", fmt.Sprintf("%f,%f", lng, lat))
	req.URL.RawQuery = q.Encode()
	resp, err := a.hc.Do(req)
	if err != nil {
		return RegeoResponse{}, err
	}
	defer resp.Body.Close()

	var regeoResp RegeoResponse
	if err := json.NewDecoder(resp.Body).Decode(&regeoResp); err != nil {
		return RegeoResponse{}, err
	}
	return regeoResp, nil
}

func makePlaceRequest(a *AMap, keyword string, page int) (*http.Request, error) {
	req, err := http.NewRequest("GET", "https://restapi.amap.com/v5/place/text", nil)
	if err != nil {
		return nil, err
	}
	q := req.URL.Query()
	q.Add("key", a.Key)
	q.Add("keywords", keyword)
	q.Add("page_size", "25")
	q.Add("page_num", strconv.Itoa(page))
	req.URL.RawQuery = q.Encode()
	return req, nil
}

func (a *AMap) Place(keyword string) (PlaceResponse, error) {
	var currentPage int = 1
	req, err := makePlaceRequest(a, keyword, currentPage)
	if err != nil {
		return PlaceResponse{}, err
	}

	resp, err := a.hc.Do(req)
	if err != nil {
		return PlaceResponse{}, err
	}
	defer resp.Body.Close()

	var count int
	var out PlaceResponse
	if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
		return PlaceResponse{}, err
	}
	fmt.Println(out)
	count = out.Count

	for {
		if count == 0 {
			break
		}

		req, err = makePlaceRequest(a, keyword, currentPage)
		if err != nil {
			return PlaceResponse{}, err
		}
		resp, err := a.hc.Do(req)
		if err != nil {
			return PlaceResponse{}, err
		}
		defer resp.Body.Close()

		var placeResp PlaceResponse
		if err := json.NewDecoder(resp.Body).Decode(&placeResp); err != nil {
			return PlaceResponse{}, err
		}
		count = placeResp.Count
		out.Pois = append(out.Pois, placeResp.Pois...)
		currentPage++
	}

	return out, nil
}

func (a *AMap) SearchLocation(keyword string) (GeoResponse, error) {
	req, err := http.NewRequest("GET", "https://restapi.amap.com/v3/geocode/geo", nil)
	if err != nil {
		return GeoResponse{}, err
	}
	q := req.URL.Query()
	q.Add("key", a.Key)
	q.Add("address", keyword)
	req.URL.RawQuery = q.Encode()
	resp, err := a.hc.Do(req)
	if err != nil {
		fmt.Println(fmt.Errorf("failed to search location: %w", err))
		return GeoResponse{}, err
	}
	defer resp.Body.Close()

	var geoResp GeoResponse
	if err := json.NewDecoder(resp.Body).Decode(&geoResp); err != nil {
		return GeoResponse{}, err
	}
	return geoResp, nil
}

func (a *AMap) LocationTips(keyword string) (LocationTipsResponse, error) {
	req, err := http.NewRequest("GET", "https://restapi.amap.com/v3/assistant/inputtips", nil)
	if err != nil {
		return LocationTipsResponse{}, err
	}
	q := req.URL.Query()
	q.Add("key", a.Key)
	q.Add("keywords", keyword)
	req.URL.RawQuery = q.Encode()

	resp, err := a.hc.Do(req)
	if err != nil {
		return LocationTipsResponse{}, err
	}
	defer resp.Body.Close()

	var geoResp LocationTipsResponse
	if err := json.NewDecoder(resp.Body).Decode(&geoResp); err != nil {
		return LocationTipsResponse{}, err
	}
	fmt.Println(geoResp)
	return geoResp, nil
}

type LocationTipsResponse struct {
	Tips []struct {
		ID       string      `json:"id"`
		Name     string      `json:"name"`
		District string      `json:"district"`
		Adcode   string      `json:"adcode"`
		Location string      `json:"location"`
		Address  interface{} `json:"address"`
		Typecode string      `json:"typecode"`
		City     []string    `json:"city"`
	} `json:"tips"`
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

type RegeoResponse struct {
	Status    string    `json:"status"`
	ReGeocode ReGeocode `json:"regeocode"`
	Info      string    `json:"info"`
	InfoCode  string    `json:"infocode"`
}

type ReGeocode struct {
	AddressComponent AddressComponent `json:"addressComponent"`
	FormattedAddress string           `json:"formatted_address"`
}

type AddressComponent struct {
	City          []string     `json:"city"`
	Province      string       `json:"province"`
	AdCode        string       `json:"adcode"`
	District      string       `json:"district"`
	TownCode      []string     `json:"towncode"`
	StreetNumber  StreetNumber `json:"streetNumber"`
	Country       string       `json:"country"`
	Township      []string     `json:"township"`
	SeaArea       string       `json:"seaArea"`
	BusinessAreas [][]string   `json:"businessAreas"`
	Neighborhood  SubLocation  `json:"neighborhood"`
	CityCode      string       `json:"citycode"`
}

type StreetNumber struct {
	Number    string `json:"number"`
	Location  string `json:"location"`
	Direction string `json:"direction"`
	Distance  string `json:"distance"`
	Street    string `json:"street"`
}

type PlaceResponse struct {
	Status   string `json:"status"`
	Count    int    `json:"count"`
	InfoCode string `json:"infocode"`
	Pois     []POI  `json:"pois"`
}

type POI struct {
	Parent   string `json:"parent"`
	Address  string `json:"address"`
	Distance string `json:"distance"`
	PCode    string `json:"pcode"`
	AdCode   string `json:"adcode"`
	PName    string `json:"pname"`
	CityName string `json:"cityname"`
	Type     string `json:"type"`
	TypeCode string `json:"typecode"`
	AdName   string `json:"adname"`
	CityCode string `json:"citycode"`
	Name     string `json:"name"`
	Location string `json:"location"`
	ID       string `json:"id"`
}
