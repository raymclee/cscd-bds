package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
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
		field.Int("cje_ys").Optional().Nillable().Comment("成交额预算"),
		field.Int("cje_lj").Optional().Nillable().Comment("成交额累计"),
		field.Int("yye_ys").Optional().Nillable().Comment("营业额预算"),
		field.Int("yye_lj").Optional().Nillable().Comment("营业额累计"),
		field.Int("xjl_ys").Optional().Nillable().Comment("现金流预算"),
		field.Int("xjl_lj").Optional().Nillable().Comment("现金流累计"),
		field.Int("xmglf").Optional().Nillable().Comment("项目管理费"),
		field.Int("xmsjf").Optional().Nillable().Comment("项目设计费"),
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
