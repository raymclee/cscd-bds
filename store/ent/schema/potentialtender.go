package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
)

// PotentialTender holds the schema definition for the PotentialTender entity.
type PotentialTender struct {
	ent.Schema
}

func (PotentialTender) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("PT"),
		TimeMixin{},
	}
}

// Fields of the PotentialTender.
func (PotentialTender) Fields() []ent.Field {
	return []ent.Field{
		// field.JSON("meta", map[string]interface{}{}),
	}
}

// Edges of the PotentialTender.
func (PotentialTender) Edges() []ent.Edge {
	return nil
}

func (PotentialTender) Annotations() []schema.Annotation {
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
