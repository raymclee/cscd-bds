package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/field"
)

// Operation holds the schema definition for the Operation entity.
type Operation struct {
	ent.Schema
}

func (Operation) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("OP"),
		TimeMixin{},
	}
}

// Fields of the Operation.
func (Operation) Fields() []ent.Field {
	return []ent.Field{
		field.Float("cje_ys").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("成交额预算"),

		field.Float("cje_lj").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("成交额累计"),

		field.Float("yye_ys").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("营业额预算"),

		field.Float("yye_lj").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("营业额累计"),

		field.Float("xjl_ys").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("现金流预算"),

		field.Float("xjl_lj").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("现金流累计"),

		field.Float("xmglf").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("项目管理费"),

		field.Float("xmsjf").
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,2)", // Override MySQL.
				dialect.Postgres: "numeric(18,2)", // Override Postgres.
			}).
			Optional().
			Nillable().
			Comment("项目设计费"),
	}
}

// Edges of the Operation.
func (Operation) Edges() []ent.Edge {
	return nil
}

func (Operation) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
	}
}
