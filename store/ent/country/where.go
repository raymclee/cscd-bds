// Code generated by ent, DO NOT EDIT.

package country

import (
	"cscd-bds/store/ent/predicate"
	"cscd-bds/store/ent/schema/geo"
	"cscd-bds/store/ent/schema/xid"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

// ID filters vertices based on their ID field.
func ID(id xid.ID) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id xid.ID) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id xid.ID) predicate.Country {
	return predicate.Country(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...xid.ID) predicate.Country {
	return predicate.Country(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...xid.ID) predicate.Country {
	return predicate.Country(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id xid.ID) predicate.Country {
	return predicate.Country(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id xid.ID) predicate.Country {
	return predicate.Country(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id xid.ID) predicate.Country {
	return predicate.Country(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id xid.ID) predicate.Country {
	return predicate.Country(sql.FieldLTE(FieldID, id))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldCreatedAt, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldUpdatedAt, v))
}

// Adcode applies equality check predicate on the "adcode" field. It's identical to AdcodeEQ.
func Adcode(v int) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldAdcode, v))
}

// Name applies equality check predicate on the "name" field. It's identical to NameEQ.
func Name(v string) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldName, v))
}

// Center applies equality check predicate on the "center" field. It's identical to CenterEQ.
func Center(v *geo.GeoJson) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldCenter, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.Country {
	return predicate.Country(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.Country {
	return predicate.Country(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldLTE(FieldCreatedAt, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.Country {
	return predicate.Country(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.Country {
	return predicate.Country(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.Country {
	return predicate.Country(sql.FieldLTE(FieldUpdatedAt, v))
}

// AdcodeEQ applies the EQ predicate on the "adcode" field.
func AdcodeEQ(v int) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldAdcode, v))
}

// AdcodeNEQ applies the NEQ predicate on the "adcode" field.
func AdcodeNEQ(v int) predicate.Country {
	return predicate.Country(sql.FieldNEQ(FieldAdcode, v))
}

// AdcodeIn applies the In predicate on the "adcode" field.
func AdcodeIn(vs ...int) predicate.Country {
	return predicate.Country(sql.FieldIn(FieldAdcode, vs...))
}

// AdcodeNotIn applies the NotIn predicate on the "adcode" field.
func AdcodeNotIn(vs ...int) predicate.Country {
	return predicate.Country(sql.FieldNotIn(FieldAdcode, vs...))
}

// AdcodeGT applies the GT predicate on the "adcode" field.
func AdcodeGT(v int) predicate.Country {
	return predicate.Country(sql.FieldGT(FieldAdcode, v))
}

// AdcodeGTE applies the GTE predicate on the "adcode" field.
func AdcodeGTE(v int) predicate.Country {
	return predicate.Country(sql.FieldGTE(FieldAdcode, v))
}

// AdcodeLT applies the LT predicate on the "adcode" field.
func AdcodeLT(v int) predicate.Country {
	return predicate.Country(sql.FieldLT(FieldAdcode, v))
}

// AdcodeLTE applies the LTE predicate on the "adcode" field.
func AdcodeLTE(v int) predicate.Country {
	return predicate.Country(sql.FieldLTE(FieldAdcode, v))
}

// NameEQ applies the EQ predicate on the "name" field.
func NameEQ(v string) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldName, v))
}

// NameNEQ applies the NEQ predicate on the "name" field.
func NameNEQ(v string) predicate.Country {
	return predicate.Country(sql.FieldNEQ(FieldName, v))
}

// NameIn applies the In predicate on the "name" field.
func NameIn(vs ...string) predicate.Country {
	return predicate.Country(sql.FieldIn(FieldName, vs...))
}

// NameNotIn applies the NotIn predicate on the "name" field.
func NameNotIn(vs ...string) predicate.Country {
	return predicate.Country(sql.FieldNotIn(FieldName, vs...))
}

// NameGT applies the GT predicate on the "name" field.
func NameGT(v string) predicate.Country {
	return predicate.Country(sql.FieldGT(FieldName, v))
}

// NameGTE applies the GTE predicate on the "name" field.
func NameGTE(v string) predicate.Country {
	return predicate.Country(sql.FieldGTE(FieldName, v))
}

// NameLT applies the LT predicate on the "name" field.
func NameLT(v string) predicate.Country {
	return predicate.Country(sql.FieldLT(FieldName, v))
}

// NameLTE applies the LTE predicate on the "name" field.
func NameLTE(v string) predicate.Country {
	return predicate.Country(sql.FieldLTE(FieldName, v))
}

// NameContains applies the Contains predicate on the "name" field.
func NameContains(v string) predicate.Country {
	return predicate.Country(sql.FieldContains(FieldName, v))
}

// NameHasPrefix applies the HasPrefix predicate on the "name" field.
func NameHasPrefix(v string) predicate.Country {
	return predicate.Country(sql.FieldHasPrefix(FieldName, v))
}

// NameHasSuffix applies the HasSuffix predicate on the "name" field.
func NameHasSuffix(v string) predicate.Country {
	return predicate.Country(sql.FieldHasSuffix(FieldName, v))
}

// NameEqualFold applies the EqualFold predicate on the "name" field.
func NameEqualFold(v string) predicate.Country {
	return predicate.Country(sql.FieldEqualFold(FieldName, v))
}

// NameContainsFold applies the ContainsFold predicate on the "name" field.
func NameContainsFold(v string) predicate.Country {
	return predicate.Country(sql.FieldContainsFold(FieldName, v))
}

// CenterEQ applies the EQ predicate on the "center" field.
func CenterEQ(v *geo.GeoJson) predicate.Country {
	return predicate.Country(sql.FieldEQ(FieldCenter, v))
}

// CenterNEQ applies the NEQ predicate on the "center" field.
func CenterNEQ(v *geo.GeoJson) predicate.Country {
	return predicate.Country(sql.FieldNEQ(FieldCenter, v))
}

// CenterIn applies the In predicate on the "center" field.
func CenterIn(vs ...*geo.GeoJson) predicate.Country {
	return predicate.Country(sql.FieldIn(FieldCenter, vs...))
}

// CenterNotIn applies the NotIn predicate on the "center" field.
func CenterNotIn(vs ...*geo.GeoJson) predicate.Country {
	return predicate.Country(sql.FieldNotIn(FieldCenter, vs...))
}

// CenterGT applies the GT predicate on the "center" field.
func CenterGT(v *geo.GeoJson) predicate.Country {
	return predicate.Country(sql.FieldGT(FieldCenter, v))
}

// CenterGTE applies the GTE predicate on the "center" field.
func CenterGTE(v *geo.GeoJson) predicate.Country {
	return predicate.Country(sql.FieldGTE(FieldCenter, v))
}

// CenterLT applies the LT predicate on the "center" field.
func CenterLT(v *geo.GeoJson) predicate.Country {
	return predicate.Country(sql.FieldLT(FieldCenter, v))
}

// CenterLTE applies the LTE predicate on the "center" field.
func CenterLTE(v *geo.GeoJson) predicate.Country {
	return predicate.Country(sql.FieldLTE(FieldCenter, v))
}

// HasProvinces applies the HasEdge predicate on the "provinces" edge.
func HasProvinces() predicate.Country {
	return predicate.Country(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, ProvincesTable, ProvincesColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasProvincesWith applies the HasEdge predicate on the "provinces" edge with a given conditions (other predicates).
func HasProvincesWith(preds ...predicate.Province) predicate.Country {
	return predicate.Country(func(s *sql.Selector) {
		step := newProvincesStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Country) predicate.Country {
	return predicate.Country(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Country) predicate.Country {
	return predicate.Country(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Country) predicate.Country {
	return predicate.Country(sql.NotPredicates(p))
}