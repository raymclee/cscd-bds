package schema

import (
	"cscd-bds/store/ent/schema/model"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/schema/zht"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
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
		field.String("name").
			Annotations(
				entgql.OrderField("NAME"),
			),
		field.Int("approval_status").
			Default(1).
			Min(1).
			Max(3).
			Annotations(
				entgql.OrderField("APPROVAL_STATUS"),
			).
			Comment("1 待審核 2 已通過 3 已拒絕"),
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

		field.JSON("draft", &model.Customer{}).
			Optional().
			Annotations(entgql.Skip(entgql.SkipAll)),

		field.JSON("feishu_group", &zht.Group{}).
			Optional().
			Annotations(entgql.Skip(entgql.SkipAll)),

		field.String("area_id").
			GoType(xid.ID("")),
		field.String("sales_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("created_by_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("updated_by_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("approver_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),

		field.String("active_profile_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("pending_profile_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
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
		edge.To("tenders", Tender.Type).
			Annotations(
				entgql.RelayConnection(),
			),
		edge.From("sales", User.Type).
			Field("sales_id").
			Ref("customers").
			Unique(),
		edge.To("created_by", User.Type).
			Field("created_by_id").
			Unique(),
		edge.To("updated_by", User.Type).
			Field("updated_by_id").
			Unique(),
		edge.To("approver", User.Type).
			Field("approver_id").
			Unique(),
		edge.To("visit_records", VisitRecord.Type).
			Annotations(
				entgql.RelayConnection(),
			),
		edge.To("profiles", CustomerProfile.Type).
			Annotations(
				entgql.RelayConnection(),
			),
		edge.To("active_profile", CustomerProfile.Type).
			Field("active_profile_id").
			Unique(),
		edge.To("pending_profile", CustomerProfile.Type).
			Field("pending_profile_id").
			Unique(),
	}
}

func (Customer) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("name", "area_id").Unique(),
	}
}

func (Customer) Annotations() []schema.Annotation {
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
