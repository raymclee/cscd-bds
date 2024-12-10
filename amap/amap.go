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
	q.Add("key", "28982eb1a6a3cd956e0e0614c2fb131b")
	// q.Add("city", "香港特别行政区")
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
