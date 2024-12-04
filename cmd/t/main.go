package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent/area"
	"cscd-bds/store/ent/schema/geo"
	"cscd-bds/store/ent/user"
	"fmt"
	"time"

	"github.com/twpayne/go-geom"
	"github.com/twpayne/go-geom/encoding/geojson"
)

func main() {

	ctx := context.Background()
	st := store.NewStore()

	pt, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{16.646319, 87.42953}).SetSRID(4326))
	if err != nil {
		panic(err)
	}
	center := &geo.GeoJson{Geometry: pt}

	st.Area.Create().
		SetName("海外地区").
		SetCode("HW").
		SetCenter(center).
		Save(ctx)

	// st.Area.Update().Where(area.Code("HW")).SetCenter(center).Save(context.Background())

	area, err := st.Area.Query().Where(area.Code("HW")).First(ctx)
	if err != nil {
		panic(err)
	}

	// pt, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{16.646319, 87.42953}).SetSRID(4326))
	// if err != nil {
	// 	panic(err)
	// }
	// center := &geo.GeoJson{Geometry: pt}

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

	if _, err := st.Tender.Create().
		SetCode("HW20241007001").
		SetTenderCode("T2024-04R").
		SetName("謝赫扎耶德路-SZR Tower - 大樓").
		SetFullAddress("迪拜謝赫扎耶德路-SZR Tower - 大樓").
		SetDeveloper("Azizi Developments").
		SetArchitect("Atkins").
		SetFacadeConsultant("AE7 (項目顧問)").
		SetContractor("Inhabit / Meinhardt").
		SetDiscoveryDate(time.Date(2024, 10, 7, 0, 0, 0, 0, time.Local)).
		SetCreatedAt(time.Date(2024, 10, 7, 0, 0, 0, 0, time.Local)).
		// SetTenderClosingDate(time.Date(2024, 12, 10, 0, 0, 0, 0, time.Local)).
		SetArea(area).
		SetFinder(hkFinder).
		SetCreatedBy(hkCreatedBy).
		Save(ctx); err != nil {
		panic(err)
	}

	if _, err := st.Tender.Create().
		SetCode("HW20240910001").
		SetTenderCode("T2024-04R").
		SetName("謝赫扎耶德路-SZR Tower - 停車埸").
		SetFullAddress("迪拜謝赫扎耶德路-SZR Tower - 停車埸").
		SetDeveloper("Azizi Developments").
		SetArchitect("Atkins").
		SetFacadeConsultant("AE7 (項目顧問)").
		SetContractor("Inhabit / Meinhardt").
		SetDiscoveryDate(time.Date(2024, 9, 10, 0, 0, 0, 0, time.Local)).
		SetCreatedAt(time.Date(2024, 9, 10, 0, 0, 0, 0, time.Local)).
		// SetTenderClosingDate(time.Date(2024, 12, 10, 0, 0, 0, 0, time.Local)).
		SetArea(area).
		SetFinder(hkFinder).
		SetCreatedBy(hkCreatedBy).
		Save(ctx); err != nil {
		panic(err)
	}

	if _, err := st.Tender.Create().
		SetCode("HW20241121001").
		SetTenderCode("T2024-102").
		SetName("Upper Thomson Road Parcel B").
		SetFullAddress("新加坡Upper Thomson Road Parcel B").
		SetDeveloper("GuocoLand (Singapore) Pte. Ltd. and Intrepid Investments Pte. Ltd.").
		SetArchitect("ADDP").
		SetFacadeConsultant("待定").
		SetContractor("待定").
		SetDiscoveryDate(time.Date(2024, 11, 21, 0, 0, 0, 0, time.Local)).
		SetCreatedAt(time.Date(2024, 11, 21, 0, 0, 0, 0, time.Local)).
		SetTenderClosingDate(time.Date(2024, 11, 29, 0, 0, 0, 0, time.Local)).
		SetArea(area).
		SetFinder(hkFinder).
		SetCreatedBy(hkCreatedBy).
		Save(ctx); err != nil {
		panic(err)
	}

	if _, err := st.Tender.Create().
		SetCode("HW20241113001").
		SetTenderCode("T2024-103").
		SetName("Bedok Hospital").
		SetFullAddress("新加坡Bedok Hospital").
		SetDeveloper("Ministry of Health Singapore").
		SetArchitect("CPG").
		SetFacadeConsultant("MOHH").
		SetContractor("CPG").
		SetDiscoveryDate(time.Date(2024, 11, 13, 0, 0, 0, 0, time.Local)).
		SetCreatedAt(time.Date(2024, 11, 13, 0, 0, 0, 0, time.Local)).
		SetTenderClosingDate(time.Date(2024, 12, 10, 0, 0, 0, 0, time.Local)).
		SetArea(area).
		SetFinder(hkFinder).
		SetCreatedBy(hkCreatedBy).
		Save(ctx); err != nil {
		panic(err)
	}

	if _, err := st.Tender.Create().
		SetCode("HW20241121002").
		SetTenderCode("T2024-104").
		SetName("Toa Payoh Sportshub").
		SetFullAddress("新加坡Toa Payoh Sportshub").
		SetDeveloper("Singapore Sports Council").
		SetArchitect("CPG").
		SetFacadeConsultant("待定").
		SetContractor("待定").
		SetDiscoveryDate(time.Date(2024, 11, 21, 0, 0, 0, 0, time.Local)).
		SetCreatedAt(time.Date(2024, 11, 21, 0, 0, 0, 0, time.Local)).
		SetTenderClosingDate(time.Date(2024, 12, 19, 0, 0, 0, 0, time.Local)).
		SetArea(area).
		SetFinder(hkFinder).
		SetCreatedBy(hkCreatedBy).
		Save(ctx); err != nil {
		panic(err)
	}
}
