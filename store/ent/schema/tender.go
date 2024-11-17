package schema

import (
	"cscd-bds/store/ent/schema/geo"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/schema/zht"

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
		field.String("code"),
		field.Int("status").Default(1),
		field.String("name"),
		field.Float("estimated_amount").
			Optional().
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}),
		field.Time("tender_date").Optional(),
		field.Time("find_date"),
		field.JSON("finder", &zht.User{}).
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.JSON("created_by", &zht.User{}).
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.JSON("following_person", []zht.User{}).
			Optional().
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.Int("size_and_value_rating").Optional().Min(1).Max(5),
		field.Int("credit_and_payment_rating").Optional().Min(1).Max(5),
		field.Int("time_limit_rating").Optional().Min(1).Max(5),
		field.Int("customer_relationship_rating").Optional().Min(1).Max(5),
		field.Int("competitive_partnership_rating").Optional().Min(1).Max(5),
		field.Bool("prepare_to_bid").Default(false),
		field.String("project_code").Optional().Nillable(),
		field.String("project_definition").Optional().Nillable(),
		field.Time("estimated_project_start_date").Optional().Nillable(),
		field.Time("estimated_project_end_date").Optional().Nillable(),
		field.String("project_type").Optional().Nillable(),
		field.Strings("attachements").Optional(),
		field.String("geo_location").Optional().Nillable(),
		field.Other("geo_coordinate", &geo.GeoJson{}).
			SchemaType(map[string]string{
				dialect.Postgres: "geometry(Point,4326)",
			}).
			Nillable().
			Optional().
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
		field.String("remark").Optional().Nillable(),
		field.Strings("images").Optional(),

		field.String("area_id").
			GoType(xid.ID{}),
		field.String("customer_id").
			GoType(xid.ID{}),
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
