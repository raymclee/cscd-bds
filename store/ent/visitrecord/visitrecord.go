// Code generated by ent, DO NOT EDIT.

package visitrecord

import (
	"cscd-bds/store/ent/schema/xid"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

const (
	// Label holds the string label denoting the visitrecord type in the database.
	Label = "visit_record"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// FieldVisitType holds the string denoting the visit_type field in the database.
	FieldVisitType = "visit_type"
	// FieldCommPeople holds the string denoting the comm_people field in the database.
	FieldCommPeople = "comm_people"
	// FieldCommContent holds the string denoting the comm_content field in the database.
	FieldCommContent = "comm_content"
	// FieldNextStep holds the string denoting the next_step field in the database.
	FieldNextStep = "next_step"
	// FieldDate holds the string denoting the date field in the database.
	FieldDate = "date"
	// FieldTenderID holds the string denoting the tender_id field in the database.
	FieldTenderID = "tender_id"
	// FieldCustomerID holds the string denoting the customer_id field in the database.
	FieldCustomerID = "customer_id"
	// EdgeTender holds the string denoting the tender edge name in mutations.
	EdgeTender = "tender"
	// EdgeCustomer holds the string denoting the customer edge name in mutations.
	EdgeCustomer = "customer"
	// EdgeFollowUpBys holds the string denoting the followupbys edge name in mutations.
	EdgeFollowUpBys = "followUpBys"
	// Table holds the table name of the visitrecord in the database.
	Table = "visit_records"
	// TenderTable is the table that holds the tender relation/edge.
	TenderTable = "visit_records"
	// TenderInverseTable is the table name for the Tender entity.
	// It exists in this package in order to avoid circular dependency with the "tender" package.
	TenderInverseTable = "tenders"
	// TenderColumn is the table column denoting the tender relation/edge.
	TenderColumn = "tender_id"
	// CustomerTable is the table that holds the customer relation/edge.
	CustomerTable = "visit_records"
	// CustomerInverseTable is the table name for the Customer entity.
	// It exists in this package in order to avoid circular dependency with the "customer" package.
	CustomerInverseTable = "customers"
	// CustomerColumn is the table column denoting the customer relation/edge.
	CustomerColumn = "customer_id"
	// FollowUpBysTable is the table that holds the followUpBys relation/edge. The primary key declared below.
	FollowUpBysTable = "user_visit_records"
	// FollowUpBysInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	FollowUpBysInverseTable = "users"
)

// Columns holds all SQL columns for visitrecord fields.
var Columns = []string{
	FieldID,
	FieldCreatedAt,
	FieldUpdatedAt,
	FieldVisitType,
	FieldCommPeople,
	FieldCommContent,
	FieldNextStep,
	FieldDate,
	FieldTenderID,
	FieldCustomerID,
}

var (
	// FollowUpBysPrimaryKey and FollowUpBysColumn2 are the table columns denoting the
	// primary key for the followUpBys relation (M2M).
	FollowUpBysPrimaryKey = []string{"user_id", "visit_record_id"}
)

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

var (
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultUpdatedAt holds the default value on creation for the "updated_at" field.
	DefaultUpdatedAt func() time.Time
	// UpdateDefaultUpdatedAt holds the default value on update for the "updated_at" field.
	UpdateDefaultUpdatedAt func() time.Time
	// DefaultVisitType holds the default value on creation for the "visit_type" field.
	DefaultVisitType int
	// CommPeopleValidator is a validator for the "comm_people" field. It is called by the builders before save.
	CommPeopleValidator func(string) error
	// CommContentValidator is a validator for the "comm_content" field. It is called by the builders before save.
	CommContentValidator func(string) error
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() xid.ID
)

// OrderOption defines the ordering options for the VisitRecord queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByCreatedAt orders the results by the created_at field.
func ByCreatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatedAt, opts...).ToFunc()
}

// ByUpdatedAt orders the results by the updated_at field.
func ByUpdatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUpdatedAt, opts...).ToFunc()
}

// ByVisitType orders the results by the visit_type field.
func ByVisitType(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldVisitType, opts...).ToFunc()
}

// ByCommPeople orders the results by the comm_people field.
func ByCommPeople(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCommPeople, opts...).ToFunc()
}

// ByCommContent orders the results by the comm_content field.
func ByCommContent(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCommContent, opts...).ToFunc()
}

// ByNextStep orders the results by the next_step field.
func ByNextStep(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldNextStep, opts...).ToFunc()
}

// ByDate orders the results by the date field.
func ByDate(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldDate, opts...).ToFunc()
}

// ByTenderID orders the results by the tender_id field.
func ByTenderID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldTenderID, opts...).ToFunc()
}

// ByCustomerID orders the results by the customer_id field.
func ByCustomerID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCustomerID, opts...).ToFunc()
}

// ByTenderField orders the results by tender field.
func ByTenderField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newTenderStep(), sql.OrderByField(field, opts...))
	}
}

// ByCustomerField orders the results by customer field.
func ByCustomerField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newCustomerStep(), sql.OrderByField(field, opts...))
	}
}

// ByFollowUpBysCount orders the results by followUpBys count.
func ByFollowUpBysCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newFollowUpBysStep(), opts...)
	}
}

// ByFollowUpBys orders the results by followUpBys terms.
func ByFollowUpBys(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newFollowUpBysStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}
func newTenderStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(TenderInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, TenderTable, TenderColumn),
	)
}
func newCustomerStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(CustomerInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, CustomerTable, CustomerColumn),
	)
}
func newFollowUpBysStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(FollowUpBysInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2M, true, FollowUpBysTable, FollowUpBysPrimaryKey...),
	)
}
