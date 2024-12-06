package main

import (
	"cscd-bds/sap"
	"fmt"
	"log"
)

func main() {
	sh := sap.New()
	rows, err := sh.Hana.Query("SELECT zxmmc, zbabh FROM SAPHANADB.ZTSD005")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var (
			zbabh string
			zxmmc string
		)
		err := rows.Scan(&zxmmc, &zbabh)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(zxmmc, zbabh)
	}
}
