package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Project holds the schema definition for the Project entity.
type Project struct {
	ent.Schema
}

func (Project) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("PJ"),
		TimeMixin{},
	}
}

// Fields of the Project.
func (Project) Fields() []ent.Field {
	return []ent.Field{
		field.String("code").
			Unique().
			Annotations(entgql.OrderField("CODE")),

		field.String("name").
			Optional().
			Nillable().
			Annotations(entgql.OrderField("NAME")),

		field.Bool("is_finished").
			Default(false).
			Comment("是否完成"),

		field.Float("cje").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("成交额"),

		field.Float("yye").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("营业额"),

		field.Float("xjl").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("现金流"),

		field.Float("xmglf_ys").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("项目管理费预算"),

		field.Float("xmglf_lj").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("项目管理费累计"),

		field.Float("xmsjf").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("项目设计费"),

		field.String("xmfzr").
			Optional().
			Nillable().
			Comment("项目负责人"),

		field.Float("owner_apply_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("业主申请总额"),

		field.Int("owner_apply_count").
			Optional().
			Nillable().
			Comment("业主申请数量"),

		field.Float("owner_approve_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("业主批复总额"),

		field.Int("owner_approve_count").
			Optional().
			Nillable().
			Comment("业主批复数量"),

		field.Float("contractor_apply_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("总包申请总额"),

		field.Int("contractor_apply_count").
			Optional().
			Nillable().
			Comment("总包申请数量"),

		field.Float("contractor_approve_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("总包批复总额"),

		field.Int("contractor_approve_count").
			Optional().
			Nillable().
			Comment("总包批复数量"),

		field.Float("install_progress").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("安装进度"),

		field.Float("effective_contract_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("有效合同金额"),

		field.Float("va_apply_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("分判VA申请总额"),

		field.Float("va_approve_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("分判VA批复总额"),

		field.Float("accumulated_statutory_deductions").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("累计法定扣款"),

		field.Float("accumulated_non_statutory_deductions").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("累计非法定扣款"),

		field.Float("accumulated_statutory_deductions_period").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("本期法定扣款"),

		field.Float("accumulated_non_statutory_deductions_period").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("本期非法定扣款"),

		field.Float("total_contract_amount").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("合約总额"),
	}
}

// Edges of the Project.
func (Project) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("vos", ProjectVO.Type),
	}
}

func (Project) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.MultiOrder(),
	}
}
