package schema

import (
	"cscd-bds/store/ent/schema/zht"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Area holds the schema definition for the Area entity.
type Area struct {
	ent.Schema
}

func (Area) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("AR"),
		TimeMixin{},
	}
}

// Fields of the Area.
func (Area) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.String("code"),
		field.JSON("sales_team_members", []zht.User{}).
			Annotations(
				entgql.Skip(entgql.SkipAll),
			),
	}
}

// Edges of the Area.
func (Area) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("customers", Customer.Type),
		edge.To("tenders", Tender.Type),
	}
}

func (Area) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
