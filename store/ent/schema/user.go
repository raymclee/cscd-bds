package schema

import (
	"cscd-bds/store/ent/schema/xid"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

func (User) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("US"),
		TimeMixin{},
	}
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.String("email").Unique(),
		field.String("username").Unique(),
		field.String("open_id").Optional().Nillable(),
		field.String("avatar_url").Optional().Nillable(),
		field.Bool("disabled").Default(false),
		field.Bool("is_admin").Default(false),
		field.Bool("is_ceo").Default(false),
		field.Bool("is_super_admin").Default(false),
		field.Bool("has_map_access").Default(false),
		field.Bool("has_edit_access").Default(false),

		field.String("leader_id").
			GoType(xid.ID("")).
			Optional().
			Nillable(),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("areas", Area.Type).
			Ref("users").
			Annotations(
				entgql.RelayConnection(),
			),
		edge.To("customers", Customer.Type).
			Annotations(
				entgql.RelayConnection(),
			),
		edge.To("team_members", User.Type).
			From("leader").
			Field("leader_id").
			Unique(),
		edge.From("tenders", Tender.Type).
			Ref("following_sales").
			Annotations(
				entgql.RelayConnection(),
			),
		edge.To("visit_records", VisitRecord.Type).
			Annotations(
				entgql.RelayConnection(),
			),
	}
}

func (User) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(
			entgql.MutationCreate(),
			entgql.MutationUpdate(),
		),
	}
}
