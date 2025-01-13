package schema

import (
	"cscd-bds/store/ent/schema/xid"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// ProjectStaff holds the schema definition for the ProjectStaff entity.
type ProjectStaff struct {
	ent.Schema
}

func (ProjectStaff) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("PS"),
		TimeMixin{},
	}
}

// Fields of the ProjectStaff.
func (ProjectStaff) Fields() []ent.Field {
	return []ent.Field{
		field.String("cym").
			Unique().
			Comment("Code-YYYY-MM"),

		field.Float("installation").
			Optional().
			Nillable().
			Comment("安裝人數"),

		field.Float("management").
			Optional().
			Nillable().
			Comment("管理人數"),

		field.Float("design").
			Optional().
			Nillable().
			Comment("設計人數"),

		field.String("project_id").
			GoType(xid.ID("")),
	}
}

// Edges of the ProjectStaff.
func (ProjectStaff) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref("project_staffs").
			Field("project_id").
			Required().
			Unique(),
	}
}

func (ProjectStaff) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.MultiOrder(),
	}
}
