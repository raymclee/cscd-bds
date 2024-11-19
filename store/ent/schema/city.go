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

// City holds the schema definition for the City entity.
type City struct {
	ent.Schema
}

func (City) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("CI"),
		TimeMixin{},
	}
}

// Fields of the City.
func (City) Fields() []ent.Field {
	return []ent.Field{
		field.Int("adcode").Unique(),
		field.Int("prov_code"),
		field.String("name"),
		field.Other("center", &geo.GeoJson{}).
			SchemaType(map[string]string{
				dialect.Postgres: "geometry(Point,4326)",
			}).
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.String("province_id").
			GoType(xid.ID("")),
	}
}

// Edges of the City.
func (City) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("districts", District.Type),
		edge.From("province", Province.Type).
			Ref("cities").
			Required().
			Field("province_id").
			Unique(),
		edge.To("tenders", Tender.Type),
	}
}

func (City) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
