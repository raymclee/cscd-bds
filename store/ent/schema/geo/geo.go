package geo

import (
	"database/sql/driver"
	"encoding/binary"
	"encoding/json"
	"errors"

	"github.com/twpayne/go-geom/encoding/ewkbhex"
	"github.com/twpayne/go-geom/encoding/geojson"
)

type GeoJson struct {
	*geojson.Geometry
}

func (t *GeoJson) Value() (driver.Value, error) {
	geometry, err := t.Decode()
	if err != nil {
		return nil, err
	}

	encodedGeometry, err := ewkbhex.Encode(geometry, binary.LittleEndian)
	if err != nil {
		return nil, err
	}

	return encodedGeometry, nil
}

func (t *GeoJson) Scan(value interface{}) error {
	// handle nil
	if value == nil {
		t = nil
		return nil
	}

	// parse as string
	stringValue, ok := value.(string)
	if !ok {
		return errors.New("value is no string")
	}

	geometry, err := ewkbhex.Decode(stringValue)
	if err != nil {
		return err
	}

	geometryAsBytes, err := geojson.Marshal(geometry)
	if err != nil {
		return err
	}

	var geoJson GeoJson
	if err := json.Unmarshal(geometryAsBytes, &geoJson); err != nil {
		return err
	}

	*t = geoJson

	return nil
}
