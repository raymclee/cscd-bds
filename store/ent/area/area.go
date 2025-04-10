// Code generated by ent, DO NOT EDIT.

package area

import (
	"cscd-bds/store/ent/schema/xid"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

const (
	// Label holds the string label denoting the area type in the database.
	Label = "area"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// FieldName holds the string denoting the name field in the database.
	FieldName = "name"
	// FieldCode holds the string denoting the code field in the database.
	FieldCode = "code"
	// FieldLeaderChatID holds the string denoting the leader_chat_id field in the database.
	FieldLeaderChatID = "leader_chat_id"
	// FieldSalesChatID holds the string denoting the sales_chat_id field in the database.
	FieldSalesChatID = "sales_chat_id"
	// FieldCenter holds the string denoting the center field in the database.
	FieldCenter = "center"
	// EdgeCustomers holds the string denoting the customers edge name in mutations.
	EdgeCustomers = "customers"
	// EdgeTenders holds the string denoting the tenders edge name in mutations.
	EdgeTenders = "tenders"
	// EdgeUsers holds the string denoting the users edge name in mutations.
	EdgeUsers = "users"
	// EdgeProvinces holds the string denoting the provinces edge name in mutations.
	EdgeProvinces = "provinces"
	// Table holds the table name of the area in the database.
	Table = "areas"
	// CustomersTable is the table that holds the customers relation/edge.
	CustomersTable = "customers"
	// CustomersInverseTable is the table name for the Customer entity.
	// It exists in this package in order to avoid circular dependency with the "customer" package.
	CustomersInverseTable = "customers"
	// CustomersColumn is the table column denoting the customers relation/edge.
	CustomersColumn = "area_id"
	// TendersTable is the table that holds the tenders relation/edge.
	TendersTable = "tenders"
	// TendersInverseTable is the table name for the Tender entity.
	// It exists in this package in order to avoid circular dependency with the "tender" package.
	TendersInverseTable = "tenders"
	// TendersColumn is the table column denoting the tenders relation/edge.
	TendersColumn = "area_id"
	// UsersTable is the table that holds the users relation/edge. The primary key declared below.
	UsersTable = "area_users"
	// UsersInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	UsersInverseTable = "users"
	// ProvincesTable is the table that holds the provinces relation/edge.
	ProvincesTable = "provinces"
	// ProvincesInverseTable is the table name for the Province entity.
	// It exists in this package in order to avoid circular dependency with the "province" package.
	ProvincesInverseTable = "provinces"
	// ProvincesColumn is the table column denoting the provinces relation/edge.
	ProvincesColumn = "area_id"
)

// Columns holds all SQL columns for area fields.
var Columns = []string{
	FieldID,
	FieldCreatedAt,
	FieldUpdatedAt,
	FieldName,
	FieldCode,
	FieldLeaderChatID,
	FieldSalesChatID,
	FieldCenter,
}

var (
	// UsersPrimaryKey and UsersColumn2 are the table columns denoting the
	// primary key for the users relation (M2M).
	UsersPrimaryKey = []string{"area_id", "user_id"}
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
	// LeaderChatIDValidator is a validator for the "leader_chat_id" field. It is called by the builders before save.
	LeaderChatIDValidator func(string) error
	// SalesChatIDValidator is a validator for the "sales_chat_id" field. It is called by the builders before save.
	SalesChatIDValidator func(string) error
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() xid.ID
)

// OrderOption defines the ordering options for the Area queries.
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

// ByName orders the results by the name field.
func ByName(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldName, opts...).ToFunc()
}

// ByCode orders the results by the code field.
func ByCode(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCode, opts...).ToFunc()
}

// ByLeaderChatID orders the results by the leader_chat_id field.
func ByLeaderChatID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLeaderChatID, opts...).ToFunc()
}

// BySalesChatID orders the results by the sales_chat_id field.
func BySalesChatID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldSalesChatID, opts...).ToFunc()
}

// ByCenter orders the results by the center field.
func ByCenter(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCenter, opts...).ToFunc()
}

// ByCustomersCount orders the results by customers count.
func ByCustomersCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newCustomersStep(), opts...)
	}
}

// ByCustomers orders the results by customers terms.
func ByCustomers(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newCustomersStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByTendersCount orders the results by tenders count.
func ByTendersCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newTendersStep(), opts...)
	}
}

// ByTenders orders the results by tenders terms.
func ByTenders(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newTendersStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByUsersCount orders the results by users count.
func ByUsersCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newUsersStep(), opts...)
	}
}

// ByUsers orders the results by users terms.
func ByUsers(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newUsersStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByProvincesCount orders the results by provinces count.
func ByProvincesCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newProvincesStep(), opts...)
	}
}

// ByProvinces orders the results by provinces terms.
func ByProvinces(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newProvincesStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}
func newCustomersStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(CustomersInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, CustomersTable, CustomersColumn),
	)
}
func newTendersStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(TendersInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, TendersTable, TendersColumn),
	)
}
func newUsersStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(UsersInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2M, false, UsersTable, UsersPrimaryKey...),
	)
}
func newProvincesStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(ProvincesInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, ProvincesTable, ProvincesColumn),
	)
}
