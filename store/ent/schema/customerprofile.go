package schema

import (
	"cscd-bds/store/ent/schema/xid"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// CustomerProfile holds the schema definition for the CustomerProfile entity.
type CustomerProfile struct {
	ent.Schema
}

func (CustomerProfile) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("CH"),
		TimeMixin{},
	}
}

// Fields of the CustomerProfile.
func (CustomerProfile) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			Annotations(
				entgql.OrderField("NAME"),
			),
		field.Int("approval_status").
			Default(1).
			Min(1).
			Annotations(
				entgql.OrderField("APPROVAL_STATUS"),
			).
			Comment("1 待審核 2 已通過 3 已拒絕 4 已撤回"),
		field.Int("owner_type").
			Optional().
			Nillable().
			Annotations(
				entgql.OrderField("OWNER_TYPE"),
			),
		field.Int("industry").
			Optional().
			Nillable(),
		field.Int("size").
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

		field.String("sales_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("customer_id").
			GoType(xid.ID("")),
		field.String("created_by_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("approver_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
	}
}

// Edges of the CustomerProfile.
func (CustomerProfile) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("customer", Customer.Type).
			Ref("profiles").
			Field("customer_id").
			Required().
			Unique(),
		edge.To("created_by", User.Type).
			Field("created_by_id").
			Unique(),
		edge.To("approver", User.Type).
			Field("approver_id").
			Unique(),
		edge.To("sales", User.Type).
			Field("sales_id").
			Unique(),
	}
}

func (CustomerProfile) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.MultiOrder(),
		entgql.Mutations(
			entgql.MutationCreate(),
		),
	}
}
