// Code generated by ent, DO NOT EDIT.

package tendercompetitor

import (
	"cscd-bds/store/ent/predicate"
	"cscd-bds/store/ent/schema/xid"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

// ID filters vertices based on their ID field.
func ID(id xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLTE(FieldID, id))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldCreatedAt, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldUpdatedAt, v))
}

// TenderID applies equality check predicate on the "tender_id" field. It's identical to TenderIDEQ.
func TenderID(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldTenderID, v))
}

// CompetitorID applies equality check predicate on the "competitor_id" field. It's identical to CompetitorIDEQ.
func CompetitorID(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldCompetitorID, v))
}

// Amount applies equality check predicate on the "amount" field. It's identical to AmountEQ.
func Amount(v float64) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldAmount, v))
}

// Result applies equality check predicate on the "result" field. It's identical to ResultEQ.
func Result(v bool) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldResult, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLTE(FieldCreatedAt, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLTE(FieldUpdatedAt, v))
}

// TenderIDEQ applies the EQ predicate on the "tender_id" field.
func TenderIDEQ(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldTenderID, v))
}

// TenderIDNEQ applies the NEQ predicate on the "tender_id" field.
func TenderIDNEQ(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNEQ(FieldTenderID, v))
}

// TenderIDIn applies the In predicate on the "tender_id" field.
func TenderIDIn(vs ...xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldIn(FieldTenderID, vs...))
}

// TenderIDNotIn applies the NotIn predicate on the "tender_id" field.
func TenderIDNotIn(vs ...xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNotIn(FieldTenderID, vs...))
}

// TenderIDGT applies the GT predicate on the "tender_id" field.
func TenderIDGT(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGT(FieldTenderID, v))
}

// TenderIDGTE applies the GTE predicate on the "tender_id" field.
func TenderIDGTE(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGTE(FieldTenderID, v))
}

// TenderIDLT applies the LT predicate on the "tender_id" field.
func TenderIDLT(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLT(FieldTenderID, v))
}

// TenderIDLTE applies the LTE predicate on the "tender_id" field.
func TenderIDLTE(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLTE(FieldTenderID, v))
}

// TenderIDContains applies the Contains predicate on the "tender_id" field.
func TenderIDContains(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldContains(FieldTenderID, vc))
}

// TenderIDHasPrefix applies the HasPrefix predicate on the "tender_id" field.
func TenderIDHasPrefix(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldHasPrefix(FieldTenderID, vc))
}

// TenderIDHasSuffix applies the HasSuffix predicate on the "tender_id" field.
func TenderIDHasSuffix(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldHasSuffix(FieldTenderID, vc))
}

// TenderIDEqualFold applies the EqualFold predicate on the "tender_id" field.
func TenderIDEqualFold(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldEqualFold(FieldTenderID, vc))
}

// TenderIDContainsFold applies the ContainsFold predicate on the "tender_id" field.
func TenderIDContainsFold(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldContainsFold(FieldTenderID, vc))
}

// CompetitorIDEQ applies the EQ predicate on the "competitor_id" field.
func CompetitorIDEQ(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldCompetitorID, v))
}

// CompetitorIDNEQ applies the NEQ predicate on the "competitor_id" field.
func CompetitorIDNEQ(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNEQ(FieldCompetitorID, v))
}

// CompetitorIDIn applies the In predicate on the "competitor_id" field.
func CompetitorIDIn(vs ...xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldIn(FieldCompetitorID, vs...))
}

// CompetitorIDNotIn applies the NotIn predicate on the "competitor_id" field.
func CompetitorIDNotIn(vs ...xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNotIn(FieldCompetitorID, vs...))
}

// CompetitorIDGT applies the GT predicate on the "competitor_id" field.
func CompetitorIDGT(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGT(FieldCompetitorID, v))
}

// CompetitorIDGTE applies the GTE predicate on the "competitor_id" field.
func CompetitorIDGTE(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGTE(FieldCompetitorID, v))
}

// CompetitorIDLT applies the LT predicate on the "competitor_id" field.
func CompetitorIDLT(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLT(FieldCompetitorID, v))
}

// CompetitorIDLTE applies the LTE predicate on the "competitor_id" field.
func CompetitorIDLTE(v xid.ID) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLTE(FieldCompetitorID, v))
}

// CompetitorIDContains applies the Contains predicate on the "competitor_id" field.
func CompetitorIDContains(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldContains(FieldCompetitorID, vc))
}

// CompetitorIDHasPrefix applies the HasPrefix predicate on the "competitor_id" field.
func CompetitorIDHasPrefix(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldHasPrefix(FieldCompetitorID, vc))
}

// CompetitorIDHasSuffix applies the HasSuffix predicate on the "competitor_id" field.
func CompetitorIDHasSuffix(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldHasSuffix(FieldCompetitorID, vc))
}

// CompetitorIDEqualFold applies the EqualFold predicate on the "competitor_id" field.
func CompetitorIDEqualFold(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldEqualFold(FieldCompetitorID, vc))
}

// CompetitorIDContainsFold applies the ContainsFold predicate on the "competitor_id" field.
func CompetitorIDContainsFold(v xid.ID) predicate.TenderCompetitor {
	vc := string(v)
	return predicate.TenderCompetitor(sql.FieldContainsFold(FieldCompetitorID, vc))
}

// AmountEQ applies the EQ predicate on the "amount" field.
func AmountEQ(v float64) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldAmount, v))
}

// AmountNEQ applies the NEQ predicate on the "amount" field.
func AmountNEQ(v float64) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNEQ(FieldAmount, v))
}

// AmountIn applies the In predicate on the "amount" field.
func AmountIn(vs ...float64) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldIn(FieldAmount, vs...))
}

// AmountNotIn applies the NotIn predicate on the "amount" field.
func AmountNotIn(vs ...float64) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNotIn(FieldAmount, vs...))
}

// AmountGT applies the GT predicate on the "amount" field.
func AmountGT(v float64) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGT(FieldAmount, v))
}

// AmountGTE applies the GTE predicate on the "amount" field.
func AmountGTE(v float64) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldGTE(FieldAmount, v))
}

// AmountLT applies the LT predicate on the "amount" field.
func AmountLT(v float64) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLT(FieldAmount, v))
}

// AmountLTE applies the LTE predicate on the "amount" field.
func AmountLTE(v float64) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldLTE(FieldAmount, v))
}

// ResultEQ applies the EQ predicate on the "result" field.
func ResultEQ(v bool) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldEQ(FieldResult, v))
}

// ResultNEQ applies the NEQ predicate on the "result" field.
func ResultNEQ(v bool) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.FieldNEQ(FieldResult, v))
}

// HasTender applies the HasEdge predicate on the "tender" edge.
func HasTender() predicate.TenderCompetitor {
	return predicate.TenderCompetitor(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, TenderTable, TenderColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasTenderWith applies the HasEdge predicate on the "tender" edge with a given conditions (other predicates).
func HasTenderWith(preds ...predicate.Tender) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(func(s *sql.Selector) {
		step := newTenderStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasCompetitor applies the HasEdge predicate on the "competitor" edge.
func HasCompetitor() predicate.TenderCompetitor {
	return predicate.TenderCompetitor(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, CompetitorTable, CompetitorColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasCompetitorWith applies the HasEdge predicate on the "competitor" edge with a given conditions (other predicates).
func HasCompetitorWith(preds ...predicate.Competitor) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(func(s *sql.Selector) {
		step := newCompetitorStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.TenderCompetitor) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.TenderCompetitor) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.TenderCompetitor) predicate.TenderCompetitor {
	return predicate.TenderCompetitor(sql.NotPredicates(p))
}
