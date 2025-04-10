// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"cscd-bds/store/ent/area"
	"cscd-bds/store/ent/customer"
	"cscd-bds/store/ent/predicate"
	"cscd-bds/store/ent/province"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/tender"
	"cscd-bds/store/ent/user"
	"database/sql/driver"
	"fmt"
	"math"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// AreaQuery is the builder for querying Area entities.
type AreaQuery struct {
	config
	ctx                *QueryContext
	order              []area.OrderOption
	inters             []Interceptor
	predicates         []predicate.Area
	withCustomers      *CustomerQuery
	withTenders        *TenderQuery
	withUsers          *UserQuery
	withProvinces      *ProvinceQuery
	modifiers          []func(*sql.Selector)
	loadTotal          []func(context.Context, []*Area) error
	withNamedCustomers map[string]*CustomerQuery
	withNamedTenders   map[string]*TenderQuery
	withNamedUsers     map[string]*UserQuery
	withNamedProvinces map[string]*ProvinceQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the AreaQuery builder.
func (aq *AreaQuery) Where(ps ...predicate.Area) *AreaQuery {
	aq.predicates = append(aq.predicates, ps...)
	return aq
}

// Limit the number of records to be returned by this query.
func (aq *AreaQuery) Limit(limit int) *AreaQuery {
	aq.ctx.Limit = &limit
	return aq
}

// Offset to start from.
func (aq *AreaQuery) Offset(offset int) *AreaQuery {
	aq.ctx.Offset = &offset
	return aq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (aq *AreaQuery) Unique(unique bool) *AreaQuery {
	aq.ctx.Unique = &unique
	return aq
}

// Order specifies how the records should be ordered.
func (aq *AreaQuery) Order(o ...area.OrderOption) *AreaQuery {
	aq.order = append(aq.order, o...)
	return aq
}

// QueryCustomers chains the current query on the "customers" edge.
func (aq *AreaQuery) QueryCustomers() *CustomerQuery {
	query := (&CustomerClient{config: aq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := aq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := aq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(area.Table, area.FieldID, selector),
			sqlgraph.To(customer.Table, customer.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, area.CustomersTable, area.CustomersColumn),
		)
		fromU = sqlgraph.SetNeighbors(aq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryTenders chains the current query on the "tenders" edge.
func (aq *AreaQuery) QueryTenders() *TenderQuery {
	query := (&TenderClient{config: aq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := aq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := aq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(area.Table, area.FieldID, selector),
			sqlgraph.To(tender.Table, tender.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, area.TendersTable, area.TendersColumn),
		)
		fromU = sqlgraph.SetNeighbors(aq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryUsers chains the current query on the "users" edge.
func (aq *AreaQuery) QueryUsers() *UserQuery {
	query := (&UserClient{config: aq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := aq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := aq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(area.Table, area.FieldID, selector),
			sqlgraph.To(user.Table, user.FieldID),
			sqlgraph.Edge(sqlgraph.M2M, false, area.UsersTable, area.UsersPrimaryKey...),
		)
		fromU = sqlgraph.SetNeighbors(aq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryProvinces chains the current query on the "provinces" edge.
func (aq *AreaQuery) QueryProvinces() *ProvinceQuery {
	query := (&ProvinceClient{config: aq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := aq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := aq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(area.Table, area.FieldID, selector),
			sqlgraph.To(province.Table, province.FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, area.ProvincesTable, area.ProvincesColumn),
		)
		fromU = sqlgraph.SetNeighbors(aq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first Area entity from the query.
// Returns a *NotFoundError when no Area was found.
func (aq *AreaQuery) First(ctx context.Context) (*Area, error) {
	nodes, err := aq.Limit(1).All(setContextOp(ctx, aq.ctx, ent.OpQueryFirst))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{area.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (aq *AreaQuery) FirstX(ctx context.Context) *Area {
	node, err := aq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first Area ID from the query.
// Returns a *NotFoundError when no Area ID was found.
func (aq *AreaQuery) FirstID(ctx context.Context) (id xid.ID, err error) {
	var ids []xid.ID
	if ids, err = aq.Limit(1).IDs(setContextOp(ctx, aq.ctx, ent.OpQueryFirstID)); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{area.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (aq *AreaQuery) FirstIDX(ctx context.Context) xid.ID {
	id, err := aq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single Area entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one Area entity is found.
// Returns a *NotFoundError when no Area entities are found.
func (aq *AreaQuery) Only(ctx context.Context) (*Area, error) {
	nodes, err := aq.Limit(2).All(setContextOp(ctx, aq.ctx, ent.OpQueryOnly))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{area.Label}
	default:
		return nil, &NotSingularError{area.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (aq *AreaQuery) OnlyX(ctx context.Context) *Area {
	node, err := aq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only Area ID in the query.
// Returns a *NotSingularError when more than one Area ID is found.
// Returns a *NotFoundError when no entities are found.
func (aq *AreaQuery) OnlyID(ctx context.Context) (id xid.ID, err error) {
	var ids []xid.ID
	if ids, err = aq.Limit(2).IDs(setContextOp(ctx, aq.ctx, ent.OpQueryOnlyID)); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{area.Label}
	default:
		err = &NotSingularError{area.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (aq *AreaQuery) OnlyIDX(ctx context.Context) xid.ID {
	id, err := aq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of Areas.
func (aq *AreaQuery) All(ctx context.Context) ([]*Area, error) {
	ctx = setContextOp(ctx, aq.ctx, ent.OpQueryAll)
	if err := aq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*Area, *AreaQuery]()
	return withInterceptors[[]*Area](ctx, aq, qr, aq.inters)
}

// AllX is like All, but panics if an error occurs.
func (aq *AreaQuery) AllX(ctx context.Context) []*Area {
	nodes, err := aq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of Area IDs.
func (aq *AreaQuery) IDs(ctx context.Context) (ids []xid.ID, err error) {
	if aq.ctx.Unique == nil && aq.path != nil {
		aq.Unique(true)
	}
	ctx = setContextOp(ctx, aq.ctx, ent.OpQueryIDs)
	if err = aq.Select(area.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (aq *AreaQuery) IDsX(ctx context.Context) []xid.ID {
	ids, err := aq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (aq *AreaQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, aq.ctx, ent.OpQueryCount)
	if err := aq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, aq, querierCount[*AreaQuery](), aq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (aq *AreaQuery) CountX(ctx context.Context) int {
	count, err := aq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (aq *AreaQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, aq.ctx, ent.OpQueryExist)
	switch _, err := aq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (aq *AreaQuery) ExistX(ctx context.Context) bool {
	exist, err := aq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the AreaQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (aq *AreaQuery) Clone() *AreaQuery {
	if aq == nil {
		return nil
	}
	return &AreaQuery{
		config:        aq.config,
		ctx:           aq.ctx.Clone(),
		order:         append([]area.OrderOption{}, aq.order...),
		inters:        append([]Interceptor{}, aq.inters...),
		predicates:    append([]predicate.Area{}, aq.predicates...),
		withCustomers: aq.withCustomers.Clone(),
		withTenders:   aq.withTenders.Clone(),
		withUsers:     aq.withUsers.Clone(),
		withProvinces: aq.withProvinces.Clone(),
		// clone intermediate query.
		sql:  aq.sql.Clone(),
		path: aq.path,
	}
}

// WithCustomers tells the query-builder to eager-load the nodes that are connected to
// the "customers" edge. The optional arguments are used to configure the query builder of the edge.
func (aq *AreaQuery) WithCustomers(opts ...func(*CustomerQuery)) *AreaQuery {
	query := (&CustomerClient{config: aq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	aq.withCustomers = query
	return aq
}

// WithTenders tells the query-builder to eager-load the nodes that are connected to
// the "tenders" edge. The optional arguments are used to configure the query builder of the edge.
func (aq *AreaQuery) WithTenders(opts ...func(*TenderQuery)) *AreaQuery {
	query := (&TenderClient{config: aq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	aq.withTenders = query
	return aq
}

// WithUsers tells the query-builder to eager-load the nodes that are connected to
// the "users" edge. The optional arguments are used to configure the query builder of the edge.
func (aq *AreaQuery) WithUsers(opts ...func(*UserQuery)) *AreaQuery {
	query := (&UserClient{config: aq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	aq.withUsers = query
	return aq
}

// WithProvinces tells the query-builder to eager-load the nodes that are connected to
// the "provinces" edge. The optional arguments are used to configure the query builder of the edge.
func (aq *AreaQuery) WithProvinces(opts ...func(*ProvinceQuery)) *AreaQuery {
	query := (&ProvinceClient{config: aq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	aq.withProvinces = query
	return aq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		CreatedAt time.Time `json:"created_at,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.Area.Query().
//		GroupBy(area.FieldCreatedAt).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (aq *AreaQuery) GroupBy(field string, fields ...string) *AreaGroupBy {
	aq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &AreaGroupBy{build: aq}
	grbuild.flds = &aq.ctx.Fields
	grbuild.label = area.Label
	grbuild.scan = grbuild.Scan
	return grbuild
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		CreatedAt time.Time `json:"created_at,omitempty"`
//	}
//
//	client.Area.Query().
//		Select(area.FieldCreatedAt).
//		Scan(ctx, &v)
func (aq *AreaQuery) Select(fields ...string) *AreaSelect {
	aq.ctx.Fields = append(aq.ctx.Fields, fields...)
	sbuild := &AreaSelect{AreaQuery: aq}
	sbuild.label = area.Label
	sbuild.flds, sbuild.scan = &aq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a AreaSelect configured with the given aggregations.
func (aq *AreaQuery) Aggregate(fns ...AggregateFunc) *AreaSelect {
	return aq.Select().Aggregate(fns...)
}

func (aq *AreaQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range aq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, aq); err != nil {
				return err
			}
		}
	}
	for _, f := range aq.ctx.Fields {
		if !area.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if aq.path != nil {
		prev, err := aq.path(ctx)
		if err != nil {
			return err
		}
		aq.sql = prev
	}
	return nil
}

func (aq *AreaQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*Area, error) {
	var (
		nodes       = []*Area{}
		_spec       = aq.querySpec()
		loadedTypes = [4]bool{
			aq.withCustomers != nil,
			aq.withTenders != nil,
			aq.withUsers != nil,
			aq.withProvinces != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*Area).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &Area{config: aq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	if len(aq.modifiers) > 0 {
		_spec.Modifiers = aq.modifiers
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, aq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := aq.withCustomers; query != nil {
		if err := aq.loadCustomers(ctx, query, nodes,
			func(n *Area) { n.Edges.Customers = []*Customer{} },
			func(n *Area, e *Customer) { n.Edges.Customers = append(n.Edges.Customers, e) }); err != nil {
			return nil, err
		}
	}
	if query := aq.withTenders; query != nil {
		if err := aq.loadTenders(ctx, query, nodes,
			func(n *Area) { n.Edges.Tenders = []*Tender{} },
			func(n *Area, e *Tender) { n.Edges.Tenders = append(n.Edges.Tenders, e) }); err != nil {
			return nil, err
		}
	}
	if query := aq.withUsers; query != nil {
		if err := aq.loadUsers(ctx, query, nodes,
			func(n *Area) { n.Edges.Users = []*User{} },
			func(n *Area, e *User) { n.Edges.Users = append(n.Edges.Users, e) }); err != nil {
			return nil, err
		}
	}
	if query := aq.withProvinces; query != nil {
		if err := aq.loadProvinces(ctx, query, nodes,
			func(n *Area) { n.Edges.Provinces = []*Province{} },
			func(n *Area, e *Province) { n.Edges.Provinces = append(n.Edges.Provinces, e) }); err != nil {
			return nil, err
		}
	}
	for name, query := range aq.withNamedCustomers {
		if err := aq.loadCustomers(ctx, query, nodes,
			func(n *Area) { n.appendNamedCustomers(name) },
			func(n *Area, e *Customer) { n.appendNamedCustomers(name, e) }); err != nil {
			return nil, err
		}
	}
	for name, query := range aq.withNamedTenders {
		if err := aq.loadTenders(ctx, query, nodes,
			func(n *Area) { n.appendNamedTenders(name) },
			func(n *Area, e *Tender) { n.appendNamedTenders(name, e) }); err != nil {
			return nil, err
		}
	}
	for name, query := range aq.withNamedUsers {
		if err := aq.loadUsers(ctx, query, nodes,
			func(n *Area) { n.appendNamedUsers(name) },
			func(n *Area, e *User) { n.appendNamedUsers(name, e) }); err != nil {
			return nil, err
		}
	}
	for name, query := range aq.withNamedProvinces {
		if err := aq.loadProvinces(ctx, query, nodes,
			func(n *Area) { n.appendNamedProvinces(name) },
			func(n *Area, e *Province) { n.appendNamedProvinces(name, e) }); err != nil {
			return nil, err
		}
	}
	for i := range aq.loadTotal {
		if err := aq.loadTotal[i](ctx, nodes); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (aq *AreaQuery) loadCustomers(ctx context.Context, query *CustomerQuery, nodes []*Area, init func(*Area), assign func(*Area, *Customer)) error {
	fks := make([]driver.Value, 0, len(nodes))
	nodeids := make(map[xid.ID]*Area)
	for i := range nodes {
		fks = append(fks, nodes[i].ID)
		nodeids[nodes[i].ID] = nodes[i]
		if init != nil {
			init(nodes[i])
		}
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(customer.FieldAreaID)
	}
	query.Where(predicate.Customer(func(s *sql.Selector) {
		s.Where(sql.InValues(s.C(area.CustomersColumn), fks...))
	}))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		fk := n.AreaID
		node, ok := nodeids[fk]
		if !ok {
			return fmt.Errorf(`unexpected referenced foreign-key "area_id" returned %v for node %v`, fk, n.ID)
		}
		assign(node, n)
	}
	return nil
}
func (aq *AreaQuery) loadTenders(ctx context.Context, query *TenderQuery, nodes []*Area, init func(*Area), assign func(*Area, *Tender)) error {
	fks := make([]driver.Value, 0, len(nodes))
	nodeids := make(map[xid.ID]*Area)
	for i := range nodes {
		fks = append(fks, nodes[i].ID)
		nodeids[nodes[i].ID] = nodes[i]
		if init != nil {
			init(nodes[i])
		}
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(tender.FieldAreaID)
	}
	query.Where(predicate.Tender(func(s *sql.Selector) {
		s.Where(sql.InValues(s.C(area.TendersColumn), fks...))
	}))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		fk := n.AreaID
		node, ok := nodeids[fk]
		if !ok {
			return fmt.Errorf(`unexpected referenced foreign-key "area_id" returned %v for node %v`, fk, n.ID)
		}
		assign(node, n)
	}
	return nil
}
func (aq *AreaQuery) loadUsers(ctx context.Context, query *UserQuery, nodes []*Area, init func(*Area), assign func(*Area, *User)) error {
	edgeIDs := make([]driver.Value, len(nodes))
	byID := make(map[xid.ID]*Area)
	nids := make(map[xid.ID]map[*Area]struct{})
	for i, node := range nodes {
		edgeIDs[i] = node.ID
		byID[node.ID] = node
		if init != nil {
			init(node)
		}
	}
	query.Where(func(s *sql.Selector) {
		joinT := sql.Table(area.UsersTable)
		s.Join(joinT).On(s.C(user.FieldID), joinT.C(area.UsersPrimaryKey[1]))
		s.Where(sql.InValues(joinT.C(area.UsersPrimaryKey[0]), edgeIDs...))
		columns := s.SelectedColumns()
		s.Select(joinT.C(area.UsersPrimaryKey[0]))
		s.AppendSelect(columns...)
		s.SetDistinct(false)
	})
	if err := query.prepareQuery(ctx); err != nil {
		return err
	}
	qr := QuerierFunc(func(ctx context.Context, q Query) (Value, error) {
		return query.sqlAll(ctx, func(_ context.Context, spec *sqlgraph.QuerySpec) {
			assign := spec.Assign
			values := spec.ScanValues
			spec.ScanValues = func(columns []string) ([]any, error) {
				values, err := values(columns[1:])
				if err != nil {
					return nil, err
				}
				return append([]any{new(xid.ID)}, values...), nil
			}
			spec.Assign = func(columns []string, values []any) error {
				outValue := *values[0].(*xid.ID)
				inValue := *values[1].(*xid.ID)
				if nids[inValue] == nil {
					nids[inValue] = map[*Area]struct{}{byID[outValue]: {}}
					return assign(columns[1:], values[1:])
				}
				nids[inValue][byID[outValue]] = struct{}{}
				return nil
			}
		})
	})
	neighbors, err := withInterceptors[[]*User](ctx, query, qr, query.inters)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected "users" node returned %v`, n.ID)
		}
		for kn := range nodes {
			assign(kn, n)
		}
	}
	return nil
}
func (aq *AreaQuery) loadProvinces(ctx context.Context, query *ProvinceQuery, nodes []*Area, init func(*Area), assign func(*Area, *Province)) error {
	fks := make([]driver.Value, 0, len(nodes))
	nodeids := make(map[xid.ID]*Area)
	for i := range nodes {
		fks = append(fks, nodes[i].ID)
		nodeids[nodes[i].ID] = nodes[i]
		if init != nil {
			init(nodes[i])
		}
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(province.FieldAreaID)
	}
	query.Where(predicate.Province(func(s *sql.Selector) {
		s.Where(sql.InValues(s.C(area.ProvincesColumn), fks...))
	}))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		fk := n.AreaID
		if fk == nil {
			return fmt.Errorf(`foreign-key "area_id" is nil for node %v`, n.ID)
		}
		node, ok := nodeids[*fk]
		if !ok {
			return fmt.Errorf(`unexpected referenced foreign-key "area_id" returned %v for node %v`, *fk, n.ID)
		}
		assign(node, n)
	}
	return nil
}

func (aq *AreaQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := aq.querySpec()
	if len(aq.modifiers) > 0 {
		_spec.Modifiers = aq.modifiers
	}
	_spec.Node.Columns = aq.ctx.Fields
	if len(aq.ctx.Fields) > 0 {
		_spec.Unique = aq.ctx.Unique != nil && *aq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, aq.driver, _spec)
}

func (aq *AreaQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(area.Table, area.Columns, sqlgraph.NewFieldSpec(area.FieldID, field.TypeString))
	_spec.From = aq.sql
	if unique := aq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if aq.path != nil {
		_spec.Unique = true
	}
	if fields := aq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, area.FieldID)
		for i := range fields {
			if fields[i] != area.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
	}
	if ps := aq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := aq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := aq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := aq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (aq *AreaQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(aq.driver.Dialect())
	t1 := builder.Table(area.Table)
	columns := aq.ctx.Fields
	if len(columns) == 0 {
		columns = area.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if aq.sql != nil {
		selector = aq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if aq.ctx.Unique != nil && *aq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range aq.predicates {
		p(selector)
	}
	for _, p := range aq.order {
		p(selector)
	}
	if offset := aq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := aq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// WithNamedCustomers tells the query-builder to eager-load the nodes that are connected to the "customers"
// edge with the given name. The optional arguments are used to configure the query builder of the edge.
func (aq *AreaQuery) WithNamedCustomers(name string, opts ...func(*CustomerQuery)) *AreaQuery {
	query := (&CustomerClient{config: aq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	if aq.withNamedCustomers == nil {
		aq.withNamedCustomers = make(map[string]*CustomerQuery)
	}
	aq.withNamedCustomers[name] = query
	return aq
}

// WithNamedTenders tells the query-builder to eager-load the nodes that are connected to the "tenders"
// edge with the given name. The optional arguments are used to configure the query builder of the edge.
func (aq *AreaQuery) WithNamedTenders(name string, opts ...func(*TenderQuery)) *AreaQuery {
	query := (&TenderClient{config: aq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	if aq.withNamedTenders == nil {
		aq.withNamedTenders = make(map[string]*TenderQuery)
	}
	aq.withNamedTenders[name] = query
	return aq
}

// WithNamedUsers tells the query-builder to eager-load the nodes that are connected to the "users"
// edge with the given name. The optional arguments are used to configure the query builder of the edge.
func (aq *AreaQuery) WithNamedUsers(name string, opts ...func(*UserQuery)) *AreaQuery {
	query := (&UserClient{config: aq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	if aq.withNamedUsers == nil {
		aq.withNamedUsers = make(map[string]*UserQuery)
	}
	aq.withNamedUsers[name] = query
	return aq
}

// WithNamedProvinces tells the query-builder to eager-load the nodes that are connected to the "provinces"
// edge with the given name. The optional arguments are used to configure the query builder of the edge.
func (aq *AreaQuery) WithNamedProvinces(name string, opts ...func(*ProvinceQuery)) *AreaQuery {
	query := (&ProvinceClient{config: aq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	if aq.withNamedProvinces == nil {
		aq.withNamedProvinces = make(map[string]*ProvinceQuery)
	}
	aq.withNamedProvinces[name] = query
	return aq
}

// AreaGroupBy is the group-by builder for Area entities.
type AreaGroupBy struct {
	selector
	build *AreaQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (agb *AreaGroupBy) Aggregate(fns ...AggregateFunc) *AreaGroupBy {
	agb.fns = append(agb.fns, fns...)
	return agb
}

// Scan applies the selector query and scans the result into the given value.
func (agb *AreaGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, agb.build.ctx, ent.OpQueryGroupBy)
	if err := agb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*AreaQuery, *AreaGroupBy](ctx, agb.build, agb, agb.build.inters, v)
}

func (agb *AreaGroupBy) sqlScan(ctx context.Context, root *AreaQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(agb.fns))
	for _, fn := range agb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*agb.flds)+len(agb.fns))
		for _, f := range *agb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*agb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := agb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// AreaSelect is the builder for selecting fields of Area entities.
type AreaSelect struct {
	*AreaQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (as *AreaSelect) Aggregate(fns ...AggregateFunc) *AreaSelect {
	as.fns = append(as.fns, fns...)
	return as
}

// Scan applies the selector query and scans the result into the given value.
func (as *AreaSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, as.ctx, ent.OpQuerySelect)
	if err := as.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*AreaQuery, *AreaSelect](ctx, as.AreaQuery, as, as.inters, v)
}

func (as *AreaSelect) sqlScan(ctx context.Context, root *AreaQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(as.fns))
	for _, fn := range as.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*as.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := as.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
