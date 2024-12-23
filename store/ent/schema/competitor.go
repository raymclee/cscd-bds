package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Competitor holds the schema definition for the Competitor entity.
type Competitor struct {
	ent.Schema
}

func (Competitor) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("CP"),
		TimeMixin{},
	}
}

// Fields of the Competitor.
func (Competitor) Fields() []ent.Field {
	return []ent.Field{
		field.String("short_name").
			Unique(),
		field.String("name").
			Annotations(
				entgql.OrderField("NAME"),
			),
	}
}

// Edges of the Competitor.
func (Competitor) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("won_tenders", Tender.Type).
			Annotations(
				entgql.RelayConnection(),
				// entgql.OrderField("WON_TENDERS_COUNT"),
			),
	}
}

func (Competitor) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.MultiOrder(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
