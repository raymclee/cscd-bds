package sap

import (
	"cscd-bds/config"
	"database/sql"
	"fmt"
	"log"

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
