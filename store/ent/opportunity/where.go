// Code generated by ent, DO NOT EDIT.

package opportunity

import (
	"cscd-bds/store/ent/predicate"
	"cscd-bds/store/ent/schema/xid"
	"time"

	"entgo.io/ent/dialect/sql"
)

// ID filters vertices based on their ID field.
func ID(id xid.ID) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id xid.ID) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id xid.ID) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...xid.ID) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...xid.ID) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id xid.ID) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id xid.ID) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id xid.ID) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id xid.ID) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldLTE(FieldID, id))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldEQ(FieldCreatedAt, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldEQ(FieldUpdatedAt, v))
}

// RegistrationNumber applies equality check predicate on the "registration_number" field. It's identical to RegistrationNumberEQ.
func RegistrationNumber(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldEQ(FieldRegistrationNumber, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldLTE(FieldCreatedAt, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldLTE(FieldUpdatedAt, v))
}

// RegistrationNumberEQ applies the EQ predicate on the "registration_number" field.
func RegistrationNumberEQ(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldEQ(FieldRegistrationNumber, v))
}

// RegistrationNumberNEQ applies the NEQ predicate on the "registration_number" field.
func RegistrationNumberNEQ(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldNEQ(FieldRegistrationNumber, v))
}

// RegistrationNumberIn applies the In predicate on the "registration_number" field.
func RegistrationNumberIn(vs ...string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldIn(FieldRegistrationNumber, vs...))
}

// RegistrationNumberNotIn applies the NotIn predicate on the "registration_number" field.
func RegistrationNumberNotIn(vs ...string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldNotIn(FieldRegistrationNumber, vs...))
}

// RegistrationNumberGT applies the GT predicate on the "registration_number" field.
func RegistrationNumberGT(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldGT(FieldRegistrationNumber, v))
}

// RegistrationNumberGTE applies the GTE predicate on the "registration_number" field.
func RegistrationNumberGTE(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldGTE(FieldRegistrationNumber, v))
}

// RegistrationNumberLT applies the LT predicate on the "registration_number" field.
func RegistrationNumberLT(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldLT(FieldRegistrationNumber, v))
}

// RegistrationNumberLTE applies the LTE predicate on the "registration_number" field.
func RegistrationNumberLTE(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldLTE(FieldRegistrationNumber, v))
}

// RegistrationNumberContains applies the Contains predicate on the "registration_number" field.
func RegistrationNumberContains(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldContains(FieldRegistrationNumber, v))
}

// RegistrationNumberHasPrefix applies the HasPrefix predicate on the "registration_number" field.
func RegistrationNumberHasPrefix(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldHasPrefix(FieldRegistrationNumber, v))
}

// RegistrationNumberHasSuffix applies the HasSuffix predicate on the "registration_number" field.
func RegistrationNumberHasSuffix(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldHasSuffix(FieldRegistrationNumber, v))
}

// RegistrationNumberEqualFold applies the EqualFold predicate on the "registration_number" field.
func RegistrationNumberEqualFold(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldEqualFold(FieldRegistrationNumber, v))
}

// RegistrationNumberContainsFold applies the ContainsFold predicate on the "registration_number" field.
func RegistrationNumberContainsFold(v string) predicate.Opportunity {
	return predicate.Opportunity(sql.FieldContainsFold(FieldRegistrationNumber, v))
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Opportunity) predicate.Opportunity {
	return predicate.Opportunity(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Opportunity) predicate.Opportunity {
	return predicate.Opportunity(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Opportunity) predicate.Opportunity {
	return predicate.Opportunity(sql.NotPredicates(p))
}
