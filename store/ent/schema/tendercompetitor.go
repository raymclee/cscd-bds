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

// TenderCompetitor holds the schema definition for the TenderCompetitor entity.
type TenderCompetitor struct {
	ent.Schema
}

func (TenderCompetitor) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("TC"),
		TimeMixin{},
	}
}

// Fields of the TenderCompetitor.
func (TenderCompetitor) Fields() []ent.Field {
	return []ent.Field{
		field.String("tender_id").
			GoType(xid.ID("")),
		field.String("competitor_id").
			GoType(xid.ID("")),
		field.Float("amount").
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}),
	}
}

// Edges of the TenderCompetitor.
func (TenderCompetitor) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("tender", Tender.Type).
			Ref("competitors").
			Field("tender_id").
			Required().Unique(),
		edge.From("competitor", Competitor.Type).
			Ref("tenders").
			Field("competitor_id").
			Required().Unique(),
		// edge.From("competitor", Competitor.Type).
		// 	Ref("competitors").
		// 	Required().
		// 	Unique(),
	}
}

func (TenderCompetitor) Annotations() []schema.Annotation {
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
