package schema

import (
	"cscd-bds/store/ent/schema/geo"
	"cscd-bds/store/ent/schema/xid"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Tender holds the schema definition for the Tender entity.
type Tender struct {
	ent.Schema
}

func (Tender) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("TE"),
		TimeMixin{},
	}
}

// Fields of the Tender.
func (Tender) Fields() []ent.Field {
	return []ent.Field{
		field.String("code").Unique(),
		field.Int("status").Default(1),
		field.String("name").
			Annotations(
				entgql.OrderField("NAME"),
			),
		field.Float("estimated_amount").
			Optional().
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}),
		field.Time("tender_date").Optional(),
		field.Time("discovery_date"),
		field.String("address").Optional().Nillable(),
		field.String("full_address").Optional().Nillable(),
		field.String("contractor").Optional().Nillable(),

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
		field.String("project_definition").Optional().Nillable(),
		field.Time("estimated_project_start_date").Optional().Nillable(),
		field.Time("estimated_project_end_date").Optional().Nillable(),
		field.String("project_type").Optional().Nillable(),
		field.Strings("attachements").Optional(),
		field.Other("geo_coordinate", &geo.GeoJson{}).
			SchemaType(map[string]string{
				dialect.Postgres: "geometry(Point,4326)",
			}).
			Nillable().
			Optional().
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.JSON("geo_bounds", [][]float64{}).
			Optional().
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.String("remark").Optional(),
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

		field.String("area_id").
			GoType(xid.ID("")),
		field.String("province_id").
			GoType(xid.ID("")),
		field.String("city_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
		field.String("district_id").
			GoType(xid.ID("")),
		field.String("customer_id").
			GoType(xid.ID("")),
		field.String("finder_id").
			GoType(xid.ID("")),
		field.String("created_by_id").
			GoType(xid.ID("")),
	}
}

// Edges of the Tender.
func (Tender) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("area", Area.Type).
			Ref("tenders").
			Field("area_id").
			Required().
			Unique(),
		edge.From("customer", Customer.Type).
			Ref("tenders").
			Field("customer_id").
			Required().
			Unique(),
		edge.To("finder", User.Type).
			Field("finder_id").
			Unique().
			Required(),
		edge.To("created_by", User.Type).
			Field("created_by_id").
			Unique().
			Required(),
		edge.To("following_sales", User.Type),
		edge.From("province", Province.Type).
			Ref("tenders").
			Field("province_id").
			Required().
			Unique(),
		edge.From("city", City.Type).
			Ref("tenders").
			Field("city_id").
			Unique(),
		edge.From("district", District.Type).
			Ref("tenders").
			Field("district_id").
			Required().
			Unique(),
		edge.To("visit_records", VisitRecord.Type).
			Annotations(
				entgql.RelayConnection(),
			),
	}
}

func (Tender) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
