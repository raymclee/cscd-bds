package schema

import (
	"cscd-bds/store/ent/schema/xid"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// TenderProfile holds the schema definition for the TenderProfile entity.
type TenderProfile struct {
	ent.Schema
}

func (TenderProfile) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("TP"),
		TimeMixin{},
	}
}

// Fields of the TenderProfile.
func (TenderProfile) Fields() []ent.Field {
	return []ent.Field{
		field.Int("status").Default(1),
		field.Int("approval_status").
			Default(1).
			Min(1).
			Max(3).
			Annotations(
				entgql.OrderField("APPROVAL_STATUS"),
			).
			Comment("1 待審核 2 已通過 3 已拒絕"),
		field.String("approval_msg_id").Optional().Nillable().Comment("審核飛書訊息ID"),

		field.String("name").
			NotEmpty().
			Annotations(
				entgql.OrderField("NAME"),
			),
		field.Float("estimated_amount").
			Optional().
			Nillable().
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}),
		field.Time("tender_date").Optional().Nillable().Annotations(
			entgql.OrderField("TENDER_DATE"),
		),
		field.Int("classify").Optional().Nillable().Min(1).Max(3),
		field.Time("discovery_date"),
		field.String("address").Optional().Nillable(),
		field.String("full_address").Optional().Nillable(),
		field.String("contractor").Optional().Nillable(),

		field.Int("level_involved").Optional().Nillable().Min(1).Max(5),

		field.Int("size_and_value_rating").Optional().Nillable().Min(1).Max(5),
		field.String("size_and_value_rating_overview").Optional().Nillable(),
		field.Int("credit_and_payment_rating").Optional().Nillable().Min(1).Max(5),
		field.String("credit_and_payment_rating_overview").Optional().Nillable(),
		field.Int("time_limit_rating").Optional().Nillable().Min(1).Max(5),
		field.String("time_limit_rating_overview").Optional().Nillable(),
		field.Int("customer_relationship_rating").Optional().Nillable().Min(1).Max(5),
		field.String("customer_relationship_rating_overview").Optional().Nillable(),
		field.Int("competitive_partnership_rating").Optional().Nillable().Min(1).Max(5),
		field.String("competitive_partnership_rating_overview").Optional().Nillable(),

		field.Bool("prepare_to_bid").Default(false),
		field.String("project_code").Optional().Nillable(),
		field.String("project_type").Optional().Nillable(),
		field.String("project_definition").Optional().Nillable(),
		field.Time("estimated_project_start_date").Optional().Nillable(),
		field.Time("estimated_project_end_date").Optional().Nillable(),
		field.Strings("attachments").Optional(),
		field.Floats("geo_coordinate").Optional(),
		field.JSON("geo_bounds", [][]float64{}).
			Optional().
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.String("remark").Optional().Nillable(),
		field.Strings("images").Optional(),
		field.String("tender_situations").Optional().Nillable(),
		field.String("owner_situations").Optional().Nillable(),
		field.String("bidding_instructions").Optional().Nillable(),
		field.String("competitor_situations").Optional().Nillable(),
		field.String("cost_engineer").Optional().Nillable(),
		field.String("tender_form").Optional().Nillable(),
		field.String("contract_form").Optional().Nillable(),
		field.String("management_company").Optional().Nillable(),
		field.String("tendering_agency").Optional().Nillable(),
		field.Time("bidding_date").Optional().Nillable(),
		field.String("facade_consultant").Optional().Nillable(),
		field.String("design_unit").Optional().Nillable(),
		field.String("consulting_firm").Optional().Nillable(),
		field.Bool("key_project").Default(false),
		field.String("current_progress").Optional().Nillable(),
		field.String("tender_win_company").Optional().Nillable(),

		field.String("tender_code").Optional().Nillable().Comment("投標編號，只限港澳"),
		field.String("architect").Optional().Nillable().Comment("則師，只限港澳"),
		field.String("developer").Optional().Nillable().Comment("業主，只限港澳"),
		field.Time("tender_closing_date").Optional().Nillable().Comment("交標日期，只限港澳").Annotations(
			entgql.OrderField("CLOSING_DATE"),
		),
		field.String("construction_area").Optional().Nillable().Comment("施工面積，只限港澳"),
		field.Time("tender_win_date").Optional().Nillable().Comment("得標日期，只限港澳"),
		field.Float("tender_win_amount").Optional().
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}).
			Positive().
			Nillable().
			Comment("得標金額"),
		field.Float("last_tender_amount").Optional().Comment("最後一次投標金額，只限港澳").
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}).
			Positive().
			Nillable().
			Comment("最後一次投標金額，只限港澳"),

		field.String("tender_id").
			GoType(xid.ID("")),
		field.String("province_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("city_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("district_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("customer_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("finder_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
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

// Edges of the TenderProfile.
func (TenderProfile) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("tender", Tender.Type).
			Ref("profiles").
			Field("tender_id").
			Required().
			Unique(),
		edge.To("customer", Customer.Type).
			Field("customer_id").
			Unique(),
		edge.To("finder", User.Type).
			Field("finder_id").
			Unique(),
		edge.To("created_by", User.Type).
			Field("created_by_id").
			Unique(),
		edge.To("province", Province.Type).
			Field("province_id").
			Unique(),
		edge.To("city", City.Type).
			Field("city_id").
			Unique(),
		edge.To("district", District.Type).
			Field("district_id").
			Unique(),
		edge.To("approver", User.Type).
			Field("approver_id").
			Unique(),
	}
}

func (TenderProfile) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.MultiOrder(),
		entgql.Mutations(
			entgql.MutationCreate(),
		),
	}
}
