package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/field"
)

// Opportunity holds the schema definition for the Opportunity entity.
type Opportunity struct {
	ent.Schema
}

func (Opportunity) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("OP"),
		TimeMixin{},
	}
}

// Fields of the Opportunity.
func (Opportunity) Fields() []ent.Field {
	return []ent.Field{
		field.String("registration_number"),
	}
}

// Edges of the Opportunity.
func (Opportunity) Edges() []ent.Edge {
	return nil
}

func (Opportunity) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
