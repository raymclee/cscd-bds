package schema

import (
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/schema/zht"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Customer holds the schema definition for the Customer entity.
type Customer struct {
	ent.Schema
}

func (Customer) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("CU"),
		TimeMixin{},
	}
}

// Fields of the Customer.
func (Customer) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.Int("owner_type").
			Optional().
			Nillable(),
		field.Int("industry"),
		field.Int("status").
			Optional().
			Nillable(),
		field.String("contact_person").
			Optional().
			Nillable(),
		field.String("contact_person_position").
			Optional().
			Nillable(),
		field.String("contact_person_phone").
			Optional().
			Nillable(),
		field.String("contact_person_email").
			Optional().
			Nillable(),

		field.JSON("customer_owner", &zht.User{}).
			Optional().
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.JSON("sales_leader", &zht.User{}).
			Optional().
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.JSON("created_by", &zht.User{}).
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),

		field.String("area_id").
			GoType(xid.ID{}),
	}
}

// Edges of the Customer.
func (Customer) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("area", Area.Type).
			Ref("customers").
			Field("area_id").
			Unique().
			Required(),
		edge.To("tenders", Tender.Type),
	}
}

func (Customer) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}