package sap

import (
	"context"
	"cscd-bds/config"
	"cscd-bds/store"
	"cscd-bds/store/ent"
	"cscd-bds/store/ent/tender"
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"strings"

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

func (s *Sap) InsertTender(st *store.Store, t *ent.Tender) {
	ctx := context.Background()
	t, err := st.Tender.Query().Where(tender.ID(t.ID)).
		WithArea().
		WithCustomer().
		WithFinder().
		WithCreatedBy().
		WithFollowingSales().
		Only(ctx)
	if err != nil {
		fmt.Println(err)
	}
	var (
		// now                 = time.Now()
		customerName           string
		followingSalesNames    []string
		mandt                  string
		tenderDate             *string
		followingSalesNamesStr string
		esAmount               string
	)
	if config.IsProd {
		mandt = "300"
	} else {
		mandt = "300"
	}
	if t.Developer != "" {
		customerName = t.Developer
	} else {
		customerName = t.Edges.Customer.Name
	}
	if !t.TenderDate.IsZero() {
		ti := t.TenderDate.Format("20060102")
		tenderDate = &ti
	}
	for _, s := range t.Edges.FollowingSales {
		followingSalesNames = append(followingSalesNames, s.Name)
	}
	followingSalesNamesStr = strings.Join(followingSalesNames, ",")
	esAmount = strconv.FormatFloat(t.EstimatedAmount, 'f', -1, 64)

	_, err = s.Hana.Exec(`
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
					"ZXMLX"
				) VALUES (
					?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
				)
			`,
		mandt,
		t.Code,
		t.Name,
		t.Edges.Area.Name,
		customerName,
		t.Edges.Finder.Name,
		t.DiscoveryDate.Format("20060102"),
		t.Edges.CreatedBy.Name,
		t.CreatedAt.Format("20060102"),
		"中标",
		followingSalesNamesStr,
		t.FullAddress,
		esAmount,
		tenderDate,
		t.ProjectCode,
		t.ProjectDefinition,
		t.ProjectType,
	)
	if err != nil {
		fmt.Println(err)
	}
}
