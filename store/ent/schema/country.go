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

// Country holds the schema definition for the Country entity.
type Country struct {
	ent.Schema
}

func (Country) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("CO"),
		TimeMixin{},
	}
}

// Fields of the Country.
func (Country) Fields() []ent.Field {
	return []ent.Field{
		field.Int("adcode").Unique(),
		field.String("name"),
		field.Other("center", &geo.GeoJson{}).
			SchemaType(map[string]string{
				dialect.Postgres: "geometry(Point,4326)",
			}).
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
	}
}

// Edges of the Country.
func (Country) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("provinces", Province.Type).
			Annotations(
				entgql.RelayConnection(),
			),
	}
}

func (Country) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
