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

		field.String("manager").
			Optional().
			Nillable().
			Comment("地盤經理"),

		field.String("name").
			Optional().
			Nillable().
			Annotations(entgql.OrderField("NAME")),

		field.String("owner").
			Optional().
			Nillable().
			Comment("客戶"),

		field.String("jzs").
			Optional().
			Nillable().
			Comment("建築師"),

		field.String("mcn").
			Optional().
			Nillable().
			Comment("總承包商"),

		field.String("consultant").
			Optional().
			Nillable().
			Comment("幕墻顧問"),

		field.String("areas").
			Optional().
			Nillable().
			Comment("工程規模"),

		field.Time("start_date").
			Optional().
			Nillable().
			Comment("開工日期"),

		field.Time("fs_date").
			Optional().
			Nillable().
			Comment("封頂日期"),

		field.Time("op_date").
			Optional().
			Nillable().
			Comment("開始安裝日期"),

		field.Time("end_date").
			Optional().
			Nillable().
			Comment("竣工日期"),

		field.String("mntyr").
			Optional().
			Nillable().
			Comment("維修保養期"),

		field.String("con_type").
			Optional().
			Nillable().
			Comment("中標形式"),

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

		field.Float("aluminum_plate_budget_percentage").
			Optional().
			Nillable().
			Comment("鋁板預算百分比"),

		field.Float("aluminum_budget_percentage").
			Optional().
			Nillable().
			Comment("鋁型材預算百分比"),

		field.Float("glass_budget_percentage").
			Optional().
			Nillable().
			Comment("玻璃預算百分比"),

		field.Float("iron_budget_percentage").
			Optional().
			Nillable().
			Comment("鐵型材預算百分比"),

		// field.Float("staff_install").
		// 	Optional().
		// 	Nillable().
		// 	Comment("安裝人員"),

		// field.Float("staff_management").
		// 	Optional().
		// 	Nillable().
		// 	Comment("管理人員"),

		// field.Float("staff_design").
		// 	Optional().
		// 	Nillable().
		// 	Comment("設計人員"),

		field.Int("milestone_plan_year").
			Optional().
			Nillable().
			Comment("里程碑計劃年份"),

		field.Int("milestone_plan_month").
			Optional().
			Nillable().
			Comment("里程碑計劃月份"),

		field.Int("milestone_done_year").
			Optional().
			Nillable().
			Comment("里程碑完成年份"),

		field.Int("milestone_done_month").
			Optional().
			Nillable().
			Comment("里程碑完成月份"),

		field.Float("pm_area").
			Optional().
			Nillable().
			Comment("生产管理面积"),

		field.Float("pm_year_target").
			Optional().
			Nillable().
			Comment("生产管理當年累計生產"),

		field.Float("pm_month_target").
			Optional().
			Nillable().
			Comment("生产管理當月累計生產"),

		field.Float("pm_year_actual").
			Optional().
			Nillable().
			Comment("生产管理當年實際生產"),

		field.Float("pm_month_actual").
			Optional().
			Nillable().
			Comment("生产管理當月實際生產"),

		field.Float("pm_total").
			Optional().
			Nillable().
			Comment("生产管理累計生產"),

		field.Float("pm_yesterday").
			Optional().
			Nillable().
			Comment("生产管理昨日生產"),

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

		field.Float("material_loss").
			Optional().
			Nillable().
			Comment("物料損失金額"),

		field.Float("design_rated_weight").
			Optional().
			Nillable().
			Comment("设计定额重量"),

		field.Float("processing_weight").
			Optional().
			Nillable().
			Comment("加工图成型重量"),

		field.Float("item_stock_weight").
			Optional().
			Nillable().
			Comment("項目物料庫存重量"),

		field.Float("pallets_in_stock").
			Optional().
			Nillable().
			Comment("卡板庫存數量"),

		field.Float("parts_in_stock").
			Optional().
			Nillable().
			Comment("散件庫存數量"),

		field.Float("quality_score").
			Optional().
			Nillable().
			Comment("質量得分"),

		field.Float("quality_ranking").
			Optional().
			Nillable().
			Comment("質量排名"),

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

		field.Int("plan_total_count").
			Optional().
			Nillable().
			Comment("計劃總數"),

		field.Int("plan_overdue_count").
			Optional().
			Nillable().
			Comment("計劃超期數量"),

		field.Int("plan_overdue_month_count").
			Optional().
			Nillable().
			Comment("當月計劃超期數量"),

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
		edge.To("vos", ProjectVO.Type),
		edge.To("project_staffs", ProjectStaff.Type).
			Annotations(
				entgql.RelayConnection(),
			),
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
