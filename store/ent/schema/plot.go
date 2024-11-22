package schema

import (
	"cscd-bds/store/ent/schema/xid"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Plot holds the schema definition for the Plot entity.
type Plot struct {
	ent.Schema
}

func (Plot) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("PL"),
		TimeMixin{},
	}
}

// Fields of the Plot.
func (Plot) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.String("color_hex"),
		field.JSON("geo_bounds", [][]float64{}).
			Optional().
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),

		field.String("district_id").GoType(xid.ID("")),
	}
}

// Edges of the Plot.
func (Plot) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("district", District.Type).
			Ref("plots").
			Field("district_id").
			Required().
			Unique(),
	}
}

func (Plot) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
