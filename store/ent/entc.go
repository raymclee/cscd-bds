//go:build ignore
// +build ignore

package main

import (
	"log"

	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
)

func main() {
	exgpl, err := entgql.NewExtension(
		// Tell Ent to generate a GraphQL schema for
		// the Ent schema in a file named ent.graphql.
		entgql.WithWhereInputs(true),
		entgql.WithConfigPath("../../gqlgen.yml"),
		entgql.WithSchemaGenerator(),
		entgql.WithSchemaPath("../../graphql/ent.graphql"),
	)
	if err != nil {
		log.Fatalf("creating entgql extension: %v", err)
	}
	templates := entgql.AllTemplates
	templates = append(templates, gen.MustParse(
		gen.NewTemplate("xid.tmpl").
			ParseFiles("./schema/xid/template/xid.tmpl")),
	)

	// extoas, err := entoas.NewExtension(
	// 	entoas.g
	// )
	// if err != nil {
	// 	log.Fatalf("creating entoas extension: %v", err)
	// }

	opts := []entc.Option{
		entc.Extensions(exgpl),
		// entc.Extensions(extoas),
	}
	if err := entc.Generate("./schema", &gen.Config{
		Templates: templates,
		Features: []gen.Feature{
			gen.FeatureUpsert,
			gen.FeaturePrivacy,
			gen.FeatureSnapshot,
			gen.FeatureEntQL,
		},
	}, opts...); err != nil {
		log.Fatal("running ent codegen:", err)
	}
}
