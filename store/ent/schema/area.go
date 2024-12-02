package schema

import (
	"cscd-bds/store/ent/schema/geo"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Area holds the schema definition for the Area entity.
type Area struct {
	ent.Schema
}

func (Area) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("AR"),
		TimeMixin{},
	}
}

// Fields of the Area.
func (Area) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.String("code").Unique(),
		field.Other("center", &geo.GeoJson{}).
			SchemaType(map[string]string{
				dialect.Postgres: "geometry(Point,4326)",
			}).
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
	}
}

// Edges of the Area.
func (Area) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("customers", Customer.Type).
			Annotations(
				entgql.RelayConnection(),
			),
		edge.To("tenders", Tender.Type).
			Annotations(
				entgql.RelayConnection(),
			),
		edge.To("users", User.Type).
			Annotations(
				entgql.RelayConnection(),
			),
		edge.To("provinces", Province.Type).
			Annotations(
				entgql.RelayConnection(),
			),
	}
}

func (Area) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
