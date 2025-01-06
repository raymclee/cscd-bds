package schema

import (
	"cscd-bds/store/ent/schema/xid"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// ProjectVO holds the schema definition for the ProjectVO entity.
type ProjectVO struct {
	ent.Schema
}

func (ProjectVO) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("PV"),
		TimeMixin{},
	}
}

// Fields of the ProjectVO.
func (ProjectVO) Fields() []ent.Field {
	return []ent.Field{
		field.String("project_id").
			GoType(xid.ID("")),

		field.Int("change_type").
			Default(0).
			Comment("变更类型"),

		field.Bool("is_approved").
			Default(false).
			Comment("是否已批复"),

		field.Float("azjd").
			Optional().
			Nillable().
			Comment("安装进度"),

		field.Float("yxhyze").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("有效合约总额"),

		field.Float("apply_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("申请总额"),

		field.Float("approve_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("批复总额"),
	}
}

// Edges of the ProjectVO.
func (ProjectVO) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref("vos").
			Field("project_id").
			Unique().
			Required(),
	}
}
