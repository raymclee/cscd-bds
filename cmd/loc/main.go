package main

import (
	"context"
	"cscd-bds/amap"
	"cscd-bds/store"
	"cscd-bds/store/ent/district"
	"cscd-bds/store/ent/schema/geo"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/tender"
	"fmt"

	"github.com/twpayne/go-geom"
	"github.com/twpayne/go-geom/encoding/geojson"
)

func main() {
	am := amap.New("28982eb1a6a3cd956e0e0614c2fb131b")

	s := store.NewStore()

	ctx := context.Background()

	// tenders, err := s.Area.Query().Where(area.Code("GA")).QueryTenders().Where(tender.GeoCoordinateIsNil()).All(ctx)
	// if err != nil {
	// 	panic(err)
	// }

	tenders, err := s.Tender.Query().Where(tender.ID(xid.ID("TE-ctbpea49q6nmh5o28vs0"))).All(ctx)
	if err != nil {
		panic(err)
	}

	for _, tender := range tenders {
		adcode, lng, lat, address, err := am.GeoCode(*tender.Address)
		if err != nil {
			fmt.Println(fmt.Errorf("failed to get geo code: %w", err))
			continue
		}

		d, err := s.District.Query().Where(district.Adcode(adcode)).Only(ctx)
		if err != nil {
			fmt.Println(fmt.Errorf("failed to get district: %w", err))
			continue
		}
		center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{lng, lat}).SetSRID(4326))
		if err != nil {
			fmt.Println(fmt.Errorf("failed to encode geo coordinate: %w", err))
			continue
		}
		coordinate := &geo.GeoJson{Geometry: center}

		if err := tender.Update().
			// SetAddress(*tender.FullAddress).
			SetFullAddress(address).
			SetDistrict(d).
			SetGeoCoordinate(coordinate).
			Exec(ctx); err != nil {
			fmt.Println(fmt.Errorf("failed to update tender: %w", err))
			continue
		}

	}
}
