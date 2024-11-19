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

// District holds the schema definition for the District entity.
type District struct {
	ent.Schema
}

func (District) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("DI"),
		TimeMixin{},
	}
}

// Fields of the District.
func (District) Fields() []ent.Field {
	return []ent.Field{
		field.Int("adcode").Unique(),
		field.Int("prov_code"),
		field.Int("city_code"),
		field.String("name"),
		field.Other("center", &geo.GeoJson{}).
			SchemaType(map[string]string{
				dialect.Postgres: "geometry(Point,4326)",
			}).
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.String("province_id").GoType(xid.ID{}),
		field.String("city_id").Optional().GoType(xid.ID{}),
	}
}

// Edges of the District.
func (District) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("province", Province.Type).
			Ref("districts").
			Required().
			Field("province_id").
			Unique(),
		edge.From("city", City.Type).
			Ref("districts").
			Field("city_id").
			Unique(),
	}
}

func (District) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
