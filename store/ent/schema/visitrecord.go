package schema

import (
	"cscd-bds/store/ent/schema/xid"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// VisitRecord holds the schema definition for the VisitRecord entity.
type VisitRecord struct {
	ent.Schema
}

func (VisitRecord) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("VR"),
		TimeMixin{},
	}
}

// Fields of the VisitRecord.
func (VisitRecord) Fields() []ent.Field {
	return []ent.Field{
		field.Int("visit_type").
			Default(1),
		field.String("comm_people").
			NotEmpty(),
		field.String("comm_content").
			NotEmpty(),
		field.String("next_step").
			Optional().
			Nillable(),
		field.Time("date").
			Annotations(
				entgql.OrderField("DATE"),
			),

		field.String("tender_id").
			GoType(xid.ID("")).
			Nillable().
			Optional(),
		field.String("customer_id").
			GoType(xid.ID("")),
	}
}

// Edges of the VisitRecord.
func (VisitRecord) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("tender", Tender.Type).
			Field("tender_id").
			Ref("visit_records").
			Unique(),
		edge.From("customer", Customer.Type).
			Field("customer_id").
			Ref("visit_records").
			Required().
			Unique(),
		edge.From("followUpBys", User.Type).
			Ref("visit_records").
			Annotations(
				entgql.RelayConnection(),
			),
	}
}

func (VisitRecord) Annotations() []schema.Annotation {
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
