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

		field.Bool("is_finished").
			Default(false).
			Comment("是否完成"),

		field.String("name").
			Annotations(entgql.OrderField("NAME")),

		// 金額
		field.Float("revenue_kpi").
			Optional().
			Nillable().
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}).
			Comment("營業額KPI"),

		field.Float("revenue_current_year_completed").
			Optional().
			Nillable().
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}).
			Comment("營業額當年完成"),

		field.Float("revenue_accumulated_completed").
			Optional().
			Nillable().
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}).
			Comment("營業額累計完成"),

		// 合约成本
		field.Time("pay_date").
			Optional().
			Nillable().
			Comment("糧期"),

		field.Int("owner_vo_count").
			Optional().
			Nillable().
			Comment("業主VO數量"),

		field.Int("contractor_vo_count").
			Optional().
			Nillable().
			Comment("总包VO數量"),

		field.Float("accumulate_deduction").
			Optional().
			Nillable().
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}).
			Comment("累計扣款"),

		field.Int("subcontractor_va_count").
			Optional().
			Nillable().
			Comment("分判VA數量"),

		field.Int("contract_supplementary_count").
			Optional().
			Nillable().
			Comment("合約补料數量"),

		field.Float("repair_fee").
			Optional().
			Nillable().
			SchemaType(map[string]string{
				dialect.Postgres: "numeric",
			}).
			Comment("执修费"),

		// 安全

		// 單元件
		field.Float("unit_inventory_total").
			Optional().
			Nillable().
			Comment("單元件庫存累計"),

		field.Float("unit_component_total").
			Optional().
			Nillable().
			Comment("單元件總數"),

		field.Float("unit_component_production").
			Optional().
			Nillable().
			Comment("單元件生產數量"),

		field.Float("unit_component_installation").
			Optional().
			Nillable().
			Comment("單元件安裝數量"),

		field.Float("bulk_materials_total_order_quantity").
			Optional().
			Nillable().
			Comment("散件總訂貨數量"),

		field.Float("bulk_materials_completed_quantity").
			Optional().
			Nillable().
			Comment("散件已完成數量"),

		field.Float("bulk_materials_uncompleted_quantity").
			Optional().
			Nillable().
			Comment("散件未完成數量"),

		field.Int("diagram_bd_finish_count").
			Optional().
			Nillable().
			Comment("BD圖紙完成數量"),

		field.Int("diagram_bd_total_count").
			Optional().
			Nillable().
			Comment("BD圖紙總數"),

		field.Int("diagram_construction_finish_count").
			Optional().
			Nillable().
			Comment("施工圖紙完成數量"),

		field.Int("diagram_construction_total_count").
			Optional().
			Nillable().
			Comment("施工圖紙總數"),

		field.Int("diagram_processing_finish_count").
			Optional().
			Nillable().
			Comment("加工圖完成數量"),

		field.Int("diagram_processing_total_count").
			Optional().
			Nillable().
			Comment("加工圖總數"),

		field.Int("diagram_c_approval_ratio_numerator").
			Optional().
			Nillable().
			Comment("C版批圖率分子"),

		field.Int("diagram_c_approval_ratio_denominator").
			Optional().
			Nillable().
			Comment("C版批圖率分母"),
	}
}

// Edges of the Project.
func (Project) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("users", User.Type).
			Annotations(
				entgql.RelayConnection(),
			),
	}
}

func (Project) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.MultiOrder(),
		entgql.Mutations(
			entgql.MutationUpdate(),
		),
	}
}
