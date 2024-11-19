package schema

import (
	"cscd-bds/store/ent/schema/geo"
	"cscd-bds/store/ent/schema/xid"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Province holds the schema definition for the Province entity.
type Province struct {
	ent.Schema
}

func (Province) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("PR"),
		TimeMixin{},
	}
}

// Fields of the Province.
func (Province) Fields() []ent.Field {
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
		field.String("country_id").GoType(xid.ID{}),
	}
}

// Edges of the Province.
func (Province) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("districts", District.Type),
		edge.To("cities", City.Type),
		edge.From("country", Country.Type).
			Ref("provinces").
			Required().
			Field("country_id").
			Unique(),
	}
}

func (Province) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
