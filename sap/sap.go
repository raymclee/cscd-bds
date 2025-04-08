package sap

import (
	"context"
	"cscd-bds/config"
	"cscd-bds/store"
	"cscd-bds/store/ent"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/tender"
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"strings"
	"time"

	_ "github.com/SAP/go-hdb/driver"
)

type Sap struct {
	Hana *sql.DB
}

func New() *Sap {
	db, err := sql.Open(
		"hdb",
		fmt.Sprintf("hdb://%s:%s@%s:%d", config.HanaUsername, config.HanaPassword, config.HanaHost, config.HanaPort),
	)
	if err != nil {
		log.Fatal(err)
	}
	return &Sap{Hana: db}
}

func (s *Sap) Close() error {
	return s.Hana.Close()
}

func (s *Sap) InsertTender(st *store.Store, tenderId xid.ID) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	te, err := st.Tender.Query().Where(tender.ID(tenderId)).
		WithArea().
		WithFollowingSales().
		WithCreatedBy().
		WithCustomer().
		WithFinder().
		WithActiveProfile(func(tpq *ent.TenderProfileQuery) {
			tpq.WithFinder()
			tpq.WithCreatedBy()
		}).
		Only(ctx)
	if err != nil {
		fmt.Printf("failed to get tender profile: %v\n", err)
		return
	}
	if te.Edges.ActiveProfile == nil {
		fmt.Printf("tender %s has no active profile\n", tenderId)
		return
	}
	t := te.Edges.ActiveProfile

	var (
		now                       = time.Now()
		customerName              string
		followingSalesNames       []string
		mandt                     string
		tenderDate                = ""
		followingSalesNamesStr    string
		esAmount                  string
		projectCode               = ""
		projectDefinition         = ""
		projectType               = ""
		location                  = ""
		estimatedProjectStartDate = "19700101"
		estimatedProjectEndDate   = "19700101"
	)
	if config.IsProd {
		mandt = "800"
	} else {
		mandt = "300"
	}
	if t.Developer != nil {
		customerName = *t.Developer
	} else {
		customerName = te.Edges.Customer.Name
	}
	if t.TenderDate != nil && !t.TenderDate.IsZero() {
		ti := t.TenderDate.Format("20060102")
		tenderDate = ti
	}
	if t.FullAddress != nil {
		location = *t.FullAddress
	}
	if t.ProjectCode != nil {
		projectCode = *t.ProjectCode
	}
	if t.ProjectDefinition != nil {
		projectDefinition = *t.ProjectDefinition
	}
	if t.ProjectType != nil {
		projectType = *t.ProjectType
	}
	for _, s := range te.Edges.FollowingSales {
		if s.Name != nil {
			followingSalesNames = append(followingSalesNames, *s.Name)
		}
	}
	followingSalesNamesStr = strings.Join(followingSalesNames, ",")
	esAmount = strconv.FormatFloat(*t.EstimatedAmount, 'f', -1, 64)

	if t.EstimatedProjectStartDate != nil && !t.EstimatedProjectStartDate.IsZero() {
		estimatedProjectStartDate = t.EstimatedProjectStartDate.Format("20060102")
	}
	if t.EstimatedProjectEndDate != nil && !t.EstimatedProjectEndDate.IsZero() {
		estimatedProjectEndDate = t.EstimatedProjectEndDate.Format("20060102")
	}

	ca, _ := strconv.Atoi(now.Local().Format("20060102150405"))
	ua, _ := strconv.Atoi(now.Local().Format("20060102150405"))

	fmt.Println("Inserting tender to sap")

	_, err = s.Hana.Exec(
		`
				INSERT INTO "ZTSD005" (
					"MANDT",
					"ZBABH",
					"ZXMMC",
					"ZYWQY",
					"ZYZMC",
					"ZSJFXR",
					"ZSJFXRQ",
					"ZCJZ",
					"ZCJRQ",
					"ZSJZT",
					"ZDQGZR",
					"ZLOCATION",
					"ZYJJE",
					"ZTBSJ",
					"ZXMDM",
					"ZXMDY",
					"ZXMLX",
					"ZYJXMKSRQ",
					"ZXMYJJSRQ",
					"ZCRDATE",
					"ZUPDATE"
				) VALUES (
					?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
				)
			`,
		// `
		// 	MERGE INTO ZTSD005 m
		// 		USING (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) as s
		// 		(MANDT, ZBABH, ZXMMC, ZYWQY, ZYZMC, ZSJFXR, ZSJFXRQ, ZCJZ, ZCJRQ, ZSJZT, ZDQGZR, ZLOCATION, ZYJJE, ZTBSJ, ZXMDM, ZXMLX)
		// 		ON m.ZBABH = s.ZBABH
		// 		WHEN MATCHED THEN
		// 		UPDATE SET
		// 			MANDT = s.MANDT,
		// 			ZBABH = s.ZBABH,
		// 			ZXMMC = s.ZXMMC,
		// 			ZYWQY = s.ZYWQY,
		// 			ZYZMC = s.ZYZMC,
		// 			ZSJFXR = s.ZSJFXR,
		// 			ZSJFXRQ = s.ZSJFXRQ,
		// 			ZCJZ = s.ZCJZ,
		// 			ZCJRQ = s.ZCJRQ,
		// 			ZSJZT = s.ZSJZT,
		// 			ZDQGZR = s.ZDQGZR,
		// 			ZLOCATION = s.ZLOCATION,
		// 			ZYJJE = s.ZYJJE,
		// 			ZTBSJ = s.ZTBSJ,
		// 			ZXMDM = s.ZXMDM,
		// 			ZXMLX = s.ZXMLX
		// 		WHEN NOT MATCHED BY TARGET THEN
		// 		INSERT (MANDT, ZBABH, ZXMMC, ZYWQY, ZYZMC, ZSJFXR, ZSJFXRQ, ZCJZ, ZCJRQ, ZSJZT, ZDQGZR, ZLOCATION, ZYJJE, ZTBSJ, ZXMDM, ZXMLX)
		// 		VALUES (s.MANDT, s.ZBABH, s.ZXMMC, s.ZYWQY, s.ZYZMC, s.ZSJFXR, s.ZSJFXRQ, s.ZCJZ, s.ZCJRQ, s.ZSJZT, s.ZDQGZR, s.ZLOCATION, s.ZYJJE, s.ZTBSJ, s.ZXMDM, s.ZXMLX);
		// `,
		mandt,
		te.Code,
		t.Name,
		te.Edges.Area.Name,
		customerName,
		t.Edges.Finder.Name,
		t.DiscoveryDate.Format("20060102"),
		t.Edges.CreatedBy.Name,
		t.CreatedAt.Format("20060102"),
		"中标",
		followingSalesNamesStr,
		location,
		esAmount,
		tenderDate,
		projectCode,
		projectDefinition,
		projectType,
		estimatedProjectStartDate,
		estimatedProjectEndDate,
		int64(ca),
		int64(ua),
	)
	if err != nil {
		fmt.Println(fmt.Errorf("failed to insert tender to sap: %w", err))
	}
}
