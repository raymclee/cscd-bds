// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"cscd-bds/store/ent/customer"
	"cscd-bds/store/ent/predicate"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/tender"
	"cscd-bds/store/ent/user"
	"cscd-bds/store/ent/visitrecord"
	"database/sql/driver"
	"fmt"
	"math"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// VisitRecordQuery is the builder for querying VisitRecord entities.
type VisitRecordQuery struct {
	config
	ctx                  *QueryContext
	order                []visitrecord.OrderOption
	inters               []Interceptor
	predicates           []predicate.VisitRecord
	withTender           *TenderQuery
	withCustomer         *CustomerQuery
	withFollowUpBys      *UserQuery
	modifiers            []func(*sql.Selector)
	loadTotal            []func(context.Context, []*VisitRecord) error
	withNamedFollowUpBys map[string]*UserQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the VisitRecordQuery builder.
func (vrq *VisitRecordQuery) Where(ps ...predicate.VisitRecord) *VisitRecordQuery {
	vrq.predicates = append(vrq.predicates, ps...)
	return vrq
}

// Limit the number of records to be returned by this query.
func (vrq *VisitRecordQuery) Limit(limit int) *VisitRecordQuery {
	vrq.ctx.Limit = &limit
	return vrq
}

// Offset to start from.
func (vrq *VisitRecordQuery) Offset(offset int) *VisitRecordQuery {
	vrq.ctx.Offset = &offset
	return vrq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (vrq *VisitRecordQuery) Unique(unique bool) *VisitRecordQuery {
	vrq.ctx.Unique = &unique
	return vrq
}

// Order specifies how the records should be ordered.
func (vrq *VisitRecordQuery) Order(o ...visitrecord.OrderOption) *VisitRecordQuery {
	vrq.order = append(vrq.order, o...)
	return vrq
}

// QueryTender chains the current query on the "tender" edge.
func (vrq *VisitRecordQuery) QueryTender() *TenderQuery {
	query := (&TenderClient{config: vrq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := vrq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := vrq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(visitrecord.Table, visitrecord.FieldID, selector),
			sqlgraph.To(tender.Table, tender.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, visitrecord.TenderTable, visitrecord.TenderColumn),
		)
		fromU = sqlgraph.SetNeighbors(vrq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryCustomer chains the current query on the "customer" edge.
func (vrq *VisitRecordQuery) QueryCustomer() *CustomerQuery {
	query := (&CustomerClient{config: vrq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := vrq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := vrq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(visitrecord.Table, visitrecord.FieldID, selector),
			sqlgraph.To(customer.Table, customer.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, visitrecord.CustomerTable, visitrecord.CustomerColumn),
		)
		fromU = sqlgraph.SetNeighbors(vrq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryFollowUpBys chains the current query on the "followUpBys" edge.
func (vrq *VisitRecordQuery) QueryFollowUpBys() *UserQuery {
	query := (&UserClient{config: vrq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := vrq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := vrq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(visitrecord.Table, visitrecord.FieldID, selector),
			sqlgraph.To(user.Table, user.FieldID),
			sqlgraph.Edge(sqlgraph.M2M, true, visitrecord.FollowUpBysTable, visitrecord.FollowUpBysPrimaryKey...),
		)
		fromU = sqlgraph.SetNeighbors(vrq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first VisitRecord entity from the query.
// Returns a *NotFoundError when no VisitRecord was found.
func (vrq *VisitRecordQuery) First(ctx context.Context) (*VisitRecord, error) {
	nodes, err := vrq.Limit(1).All(setContextOp(ctx, vrq.ctx, ent.OpQueryFirst))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{visitrecord.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (vrq *VisitRecordQuery) FirstX(ctx context.Context) *VisitRecord {
	node, err := vrq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first VisitRecord ID from the query.
// Returns a *NotFoundError when no VisitRecord ID was found.
func (vrq *VisitRecordQuery) FirstID(ctx context.Context) (id xid.ID, err error) {
	var ids []xid.ID
	if ids, err = vrq.Limit(1).IDs(setContextOp(ctx, vrq.ctx, ent.OpQueryFirstID)); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{visitrecord.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (vrq *VisitRecordQuery) FirstIDX(ctx context.Context) xid.ID {
	id, err := vrq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single VisitRecord entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one VisitRecord entity is found.
// Returns a *NotFoundError when no VisitRecord entities are found.
func (vrq *VisitRecordQuery) Only(ctx context.Context) (*VisitRecord, error) {
	nodes, err := vrq.Limit(2).All(setContextOp(ctx, vrq.ctx, ent.OpQueryOnly))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{visitrecord.Label}
	default:
		return nil, &NotSingularError{visitrecord.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (vrq *VisitRecordQuery) OnlyX(ctx context.Context) *VisitRecord {
	node, err := vrq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only VisitRecord ID in the query.
// Returns a *NotSingularError when more than one VisitRecord ID is found.
// Returns a *NotFoundError when no entities are found.
func (vrq *VisitRecordQuery) OnlyID(ctx context.Context) (id xid.ID, err error) {
	var ids []xid.ID
	if ids, err = vrq.Limit(2).IDs(setContextOp(ctx, vrq.ctx, ent.OpQueryOnlyID)); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{visitrecord.Label}
	default:
		err = &NotSingularError{visitrecord.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (vrq *VisitRecordQuery) OnlyIDX(ctx context.Context) xid.ID {
	id, err := vrq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of VisitRecords.
func (vrq *VisitRecordQuery) All(ctx context.Context) ([]*VisitRecord, error) {
	ctx = setContextOp(ctx, vrq.ctx, ent.OpQueryAll)
	if err := vrq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*VisitRecord, *VisitRecordQuery]()
	return withInterceptors[[]*VisitRecord](ctx, vrq, qr, vrq.inters)
}

// AllX is like All, but panics if an error occurs.
func (vrq *VisitRecordQuery) AllX(ctx context.Context) []*VisitRecord {
	nodes, err := vrq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of VisitRecord IDs.
func (vrq *VisitRecordQuery) IDs(ctx context.Context) (ids []xid.ID, err error) {
	if vrq.ctx.Unique == nil && vrq.path != nil {
		vrq.Unique(true)
	}
	ctx = setContextOp(ctx, vrq.ctx, ent.OpQueryIDs)
	if err = vrq.Select(visitrecord.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (vrq *VisitRecordQuery) IDsX(ctx context.Context) []xid.ID {
	ids, err := vrq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (vrq *VisitRecordQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, vrq.ctx, ent.OpQueryCount)
	if err := vrq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, vrq, querierCount[*VisitRecordQuery](), vrq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (vrq *VisitRecordQuery) CountX(ctx context.Context) int {
	count, err := vrq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (vrq *VisitRecordQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, vrq.ctx, ent.OpQueryExist)
	switch _, err := vrq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (vrq *VisitRecordQuery) ExistX(ctx context.Context) bool {
	exist, err := vrq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the VisitRecordQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (vrq *VisitRecordQuery) Clone() *VisitRecordQuery {
	if vrq == nil {
		return nil
	}
	return &VisitRecordQuery{
		config:          vrq.config,
		ctx:             vrq.ctx.Clone(),
		order:           append([]visitrecord.OrderOption{}, vrq.order...),
		inters:          append([]Interceptor{}, vrq.inters...),
		predicates:      append([]predicate.VisitRecord{}, vrq.predicates...),
		withTender:      vrq.withTender.Clone(),
		withCustomer:    vrq.withCustomer.Clone(),
		withFollowUpBys: vrq.withFollowUpBys.Clone(),
		// clone intermediate query.
		sql:  vrq.sql.Clone(),
		path: vrq.path,
	}
}

// WithTender tells the query-builder to eager-load the nodes that are connected to
// the "tender" edge. The optional arguments are used to configure the query builder of the edge.
func (vrq *VisitRecordQuery) WithTender(opts ...func(*TenderQuery)) *VisitRecordQuery {
	query := (&TenderClient{config: vrq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	vrq.withTender = query
	return vrq
}

// WithCustomer tells the query-builder to eager-load the nodes that are connected to
// the "customer" edge. The optional arguments are used to configure the query builder of the edge.
func (vrq *VisitRecordQuery) WithCustomer(opts ...func(*CustomerQuery)) *VisitRecordQuery {
	query := (&CustomerClient{config: vrq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	vrq.withCustomer = query
	return vrq
}

// WithFollowUpBys tells the query-builder to eager-load the nodes that are connected to
// the "followUpBys" edge. The optional arguments are used to configure the query builder of the edge.
func (vrq *VisitRecordQuery) WithFollowUpBys(opts ...func(*UserQuery)) *VisitRecordQuery {
	query := (&UserClient{config: vrq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	vrq.withFollowUpBys = query
	return vrq
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
//	client.VisitRecord.Query().
//		GroupBy(visitrecord.FieldCreatedAt).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (vrq *VisitRecordQuery) GroupBy(field string, fields ...string) *VisitRecordGroupBy {
	vrq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &VisitRecordGroupBy{build: vrq}
	grbuild.flds = &vrq.ctx.Fields
	grbuild.label = visitrecord.Label
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
//	client.VisitRecord.Query().
//		Select(visitrecord.FieldCreatedAt).
//		Scan(ctx, &v)
func (vrq *VisitRecordQuery) Select(fields ...string) *VisitRecordSelect {
	vrq.ctx.Fields = append(vrq.ctx.Fields, fields...)
	sbuild := &VisitRecordSelect{VisitRecordQuery: vrq}
	sbuild.label = visitrecord.Label
	sbuild.flds, sbuild.scan = &vrq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a VisitRecordSelect configured with the given aggregations.
func (vrq *VisitRecordQuery) Aggregate(fns ...AggregateFunc) *VisitRecordSelect {
	return vrq.Select().Aggregate(fns...)
}

func (vrq *VisitRecordQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range vrq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, vrq); err != nil {
				return err
			}
		}
	}
	for _, f := range vrq.ctx.Fields {
		if !visitrecord.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if vrq.path != nil {
		prev, err := vrq.path(ctx)
		if err != nil {
			return err
		}
		vrq.sql = prev
	}
	return nil
}

func (vrq *VisitRecordQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*VisitRecord, error) {
	var (
		nodes       = []*VisitRecord{}
		_spec       = vrq.querySpec()
		loadedTypes = [3]bool{
			vrq.withTender != nil,
			vrq.withCustomer != nil,
			vrq.withFollowUpBys != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*VisitRecord).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &VisitRecord{config: vrq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	if len(vrq.modifiers) > 0 {
		_spec.Modifiers = vrq.modifiers
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, vrq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := vrq.withTender; query != nil {
		if err := vrq.loadTender(ctx, query, nodes, nil,
			func(n *VisitRecord, e *Tender) { n.Edges.Tender = e }); err != nil {
			return nil, err
		}
	}
	if query := vrq.withCustomer; query != nil {
		if err := vrq.loadCustomer(ctx, query, nodes, nil,
			func(n *VisitRecord, e *Customer) { n.Edges.Customer = e }); err != nil {
			return nil, err
		}
	}
	if query := vrq.withFollowUpBys; query != nil {
		if err := vrq.loadFollowUpBys(ctx, query, nodes,
			func(n *VisitRecord) { n.Edges.FollowUpBys = []*User{} },
			func(n *VisitRecord, e *User) { n.Edges.FollowUpBys = append(n.Edges.FollowUpBys, e) }); err != nil {
			return nil, err
		}
	}
	for name, query := range vrq.withNamedFollowUpBys {
		if err := vrq.loadFollowUpBys(ctx, query, nodes,
			func(n *VisitRecord) { n.appendNamedFollowUpBys(name) },
			func(n *VisitRecord, e *User) { n.appendNamedFollowUpBys(name, e) }); err != nil {
			return nil, err
		}
	}
	for i := range vrq.loadTotal {
		if err := vrq.loadTotal[i](ctx, nodes); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (vrq *VisitRecordQuery) loadTender(ctx context.Context, query *TenderQuery, nodes []*VisitRecord, init func(*VisitRecord), assign func(*VisitRecord, *Tender)) error {
	ids := make([]xid.ID, 0, len(nodes))
	nodeids := make(map[xid.ID][]*VisitRecord)
	for i := range nodes {
		if nodes[i].TenderID == nil {
			continue
		}
		fk := *nodes[i].TenderID
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(tender.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "tender_id" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}
func (vrq *VisitRecordQuery) loadCustomer(ctx context.Context, query *CustomerQuery, nodes []*VisitRecord, init func(*VisitRecord), assign func(*VisitRecord, *Customer)) error {
	ids := make([]xid.ID, 0, len(nodes))
	nodeids := make(map[xid.ID][]*VisitRecord)
	for i := range nodes {
		fk := nodes[i].CustomerID
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(customer.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "customer_id" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}
func (vrq *VisitRecordQuery) loadFollowUpBys(ctx context.Context, query *UserQuery, nodes []*VisitRecord, init func(*VisitRecord), assign func(*VisitRecord, *User)) error {
	edgeIDs := make([]driver.Value, len(nodes))
	byID := make(map[xid.ID]*VisitRecord)
	nids := make(map[xid.ID]map[*VisitRecord]struct{})
	for i, node := range nodes {
		edgeIDs[i] = node.ID
		byID[node.ID] = node
		if init != nil {
			init(node)
		}
	}
	query.Where(func(s *sql.Selector) {
		joinT := sql.Table(visitrecord.FollowUpBysTable)
		s.Join(joinT).On(s.C(user.FieldID), joinT.C(visitrecord.FollowUpBysPrimaryKey[0]))
		s.Where(sql.InValues(joinT.C(visitrecord.FollowUpBysPrimaryKey[1]), edgeIDs...))
		columns := s.SelectedColumns()
		s.Select(joinT.C(visitrecord.FollowUpBysPrimaryKey[1]))
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
					nids[inValue] = map[*VisitRecord]struct{}{byID[outValue]: {}}
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
			return fmt.Errorf(`unexpected "followUpBys" node returned %v`, n.ID)
		}
		for kn := range nodes {
			assign(kn, n)
		}
	}
	return nil
}

func (vrq *VisitRecordQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := vrq.querySpec()
	if len(vrq.modifiers) > 0 {
		_spec.Modifiers = vrq.modifiers
	}
	_spec.Node.Columns = vrq.ctx.Fields
	if len(vrq.ctx.Fields) > 0 {
		_spec.Unique = vrq.ctx.Unique != nil && *vrq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, vrq.driver, _spec)
}

func (vrq *VisitRecordQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(visitrecord.Table, visitrecord.Columns, sqlgraph.NewFieldSpec(visitrecord.FieldID, field.TypeString))
	_spec.From = vrq.sql
	if unique := vrq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if vrq.path != nil {
		_spec.Unique = true
	}
	if fields := vrq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, visitrecord.FieldID)
		for i := range fields {
			if fields[i] != visitrecord.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
		if vrq.withTender != nil {
			_spec.Node.AddColumnOnce(visitrecord.FieldTenderID)
		}
		if vrq.withCustomer != nil {
			_spec.Node.AddColumnOnce(visitrecord.FieldCustomerID)
		}
	}
	if ps := vrq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := vrq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := vrq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := vrq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (vrq *VisitRecordQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(vrq.driver.Dialect())
	t1 := builder.Table(visitrecord.Table)
	columns := vrq.ctx.Fields
	if len(columns) == 0 {
		columns = visitrecord.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if vrq.sql != nil {
		selector = vrq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if vrq.ctx.Unique != nil && *vrq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range vrq.predicates {
		p(selector)
	}
	for _, p := range vrq.order {
		p(selector)
	}
	if offset := vrq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := vrq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// WithNamedFollowUpBys tells the query-builder to eager-load the nodes that are connected to the "followUpBys"
// edge with the given name. The optional arguments are used to configure the query builder of the edge.
func (vrq *VisitRecordQuery) WithNamedFollowUpBys(name string, opts ...func(*UserQuery)) *VisitRecordQuery {
	query := (&UserClient{config: vrq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	if vrq.withNamedFollowUpBys == nil {
		vrq.withNamedFollowUpBys = make(map[string]*UserQuery)
	}
	vrq.withNamedFollowUpBys[name] = query
	return vrq
}

// VisitRecordGroupBy is the group-by builder for VisitRecord entities.
type VisitRecordGroupBy struct {
	selector
	build *VisitRecordQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (vrgb *VisitRecordGroupBy) Aggregate(fns ...AggregateFunc) *VisitRecordGroupBy {
	vrgb.fns = append(vrgb.fns, fns...)
	return vrgb
}

// Scan applies the selector query and scans the result into the given value.
func (vrgb *VisitRecordGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, vrgb.build.ctx, ent.OpQueryGroupBy)
	if err := vrgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*VisitRecordQuery, *VisitRecordGroupBy](ctx, vrgb.build, vrgb, vrgb.build.inters, v)
}

func (vrgb *VisitRecordGroupBy) sqlScan(ctx context.Context, root *VisitRecordQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(vrgb.fns))
	for _, fn := range vrgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*vrgb.flds)+len(vrgb.fns))
		for _, f := range *vrgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*vrgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := vrgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// VisitRecordSelect is the builder for selecting fields of VisitRecord entities.
type VisitRecordSelect struct {
	*VisitRecordQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (vrs *VisitRecordSelect) Aggregate(fns ...AggregateFunc) *VisitRecordSelect {
	vrs.fns = append(vrs.fns, fns...)
	return vrs
}

// Scan applies the selector query and scans the result into the given value.
func (vrs *VisitRecordSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, vrs.ctx, ent.OpQuerySelect)
	if err := vrs.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*VisitRecordQuery, *VisitRecordSelect](ctx, vrs.VisitRecordQuery, vrs, vrs.inters, v)
}

func (vrs *VisitRecordSelect) sqlScan(ctx context.Context, root *VisitRecordQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(vrs.fns))
	for _, fn := range vrs.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*vrs.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := vrs.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
