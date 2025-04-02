package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/field"
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
		field.String("ref_url").Unique(),
		field.String("title"),
		field.String("description").Nillable().Optional(),
		field.String("requirement").Nillable().Optional(),
		field.String("address").Nillable().Optional(),
		field.String("date").Nillable().Optional(),
		field.String("type").Nillable().Optional(),
		field.String("status").Nillable().Optional(),
		field.String("amount").Nillable().Optional(),
		field.String("size").Nillable().Optional(),
		field.String("location").Nillable().Optional(),
		field.String("contact").Nillable().Optional(),
		field.String("contact_phone").Nillable().Optional(),
		field.String("contact_email").Nillable().Optional(),
		field.String("contact_address").Nillable().Optional(),
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
	}
}
