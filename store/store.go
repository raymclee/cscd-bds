package store

import (
	"context"
	"cscd-bds/store/ent"
	"cscd-bds/store/ent/migrate"
	"database/sql"
	"log"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type Store struct {
	*ent.Client
}

func Open(databaseUrl string) *ent.Client {
	db, err := sql.Open("pgx", databaseUrl)
	if err != nil {
		log.Fatal(err)
	}
	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(100)
	// Create an ent.Driver from `db`.
	drv := entsql.OpenDB(dialect.Postgres, db)
	o := []ent.Option{
		ent.Driver(drv),
		// ent.Debug(),
	}
	// if isDev {
	// 	o = append(o, ent.Debug())
	// }
	return ent.NewClient(o...)
}

func NewStore() *Store {
	client := Open("postgresql://postgres:postgres@localhost:5432/cscd_bds?sslmode=disable")
	if err := client.Schema.Create(
		context.Background(),
		migrate.WithGlobalUniqueID(true),
		migrate.WithDropColumn(true),
		migrate.WithDropIndex(true),
		migrate.WithForeignKeys(true),
	); err != nil {
		log.Fatal("opening ent client", err)
	}
	return &Store{client}
}
