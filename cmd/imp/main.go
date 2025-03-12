package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent/potentialtender"
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func main() {

	s := store.New(false)

	db, err := sql.Open("sqlite3", "tenders.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	stmt, err := db.Prepare(`
	select 
		url,
		tender_title,
		tender_description,
		tender_requirement,
		tender_date,
		tender_type,
		tender_status,
		tender_amount,
		tender_size,
		tender_location,
		tender_contact,
		tender_contact_phone,
		tender_contact_email,
		tender_contact_address
	from tenders`)
	if err != nil {
		panic(err)
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var (
			url                    string
			tender_title           string
			tender_description     *string
			tender_requirement     *string
			tender_date            *string
			tender_type            *string
			tender_status          *string
			tender_amount          *string
			tender_size            *string
			tender_location        *string
			tender_contact         *string
			tender_contact_phone   *string
			tender_contact_email   *string
			tender_contact_address *string
		)
		err = rows.Scan(&url, &tender_title, &tender_description, &tender_requirement, &tender_date, &tender_type, &tender_status, &tender_amount, &tender_size, &tender_location, &tender_contact, &tender_contact_phone, &tender_contact_email, &tender_contact_address)
		if err != nil {
			panic(err)
		}
		fmt.Println(url, tender_title, tender_description, tender_requirement, tender_date, tender_type, tender_status, tender_amount, tender_size, tender_location, tender_contact, tender_contact_phone, tender_contact_email, tender_contact_address)

		if err := s.PotentialTender.Create().
			SetRefURL(url).
			SetTitle(tender_title).
			SetNillableDescription(tender_description).
			SetNillableRequirement(tender_requirement).
			SetNillableDate(tender_date).
			SetNillableType(tender_type).
			SetNillableStatus(tender_status).
			SetNillableAmount(tender_amount).
			SetNillableSize(tender_size).
			SetNillableLocation(tender_location).
			SetNillableContact(tender_contact).
			SetNillableContactPhone(tender_contact_phone).
			SetNillableContactEmail(tender_contact_email).
			SetNillableContactAddress(tender_contact_address).
			OnConflictColumns(potentialtender.FieldRefURL).
			DoNothing().
			Exec(context.Background()); err != nil {
			panic(err)
		}
	}

}
