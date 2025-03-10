// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"cscd-bds/store/ent/potentialtender"
	"cscd-bds/store/ent/predicate"
	"cscd-bds/store/ent/schema/xid"
	"fmt"
	"math"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// PotentialTenderQuery is the builder for querying PotentialTender entities.
type PotentialTenderQuery struct {
	config
	ctx        *QueryContext
	order      []potentialtender.OrderOption
	inters     []Interceptor
	predicates []predicate.PotentialTender
	modifiers  []func(*sql.Selector)
	loadTotal  []func(context.Context, []*PotentialTender) error
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the PotentialTenderQuery builder.
func (ptq *PotentialTenderQuery) Where(ps ...predicate.PotentialTender) *PotentialTenderQuery {
	ptq.predicates = append(ptq.predicates, ps...)
	return ptq
}

// Limit the number of records to be returned by this query.
func (ptq *PotentialTenderQuery) Limit(limit int) *PotentialTenderQuery {
	ptq.ctx.Limit = &limit
	return ptq
}

// Offset to start from.
func (ptq *PotentialTenderQuery) Offset(offset int) *PotentialTenderQuery {
	ptq.ctx.Offset = &offset
	return ptq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (ptq *PotentialTenderQuery) Unique(unique bool) *PotentialTenderQuery {
	ptq.ctx.Unique = &unique
	return ptq
}

// Order specifies how the records should be ordered.
func (ptq *PotentialTenderQuery) Order(o ...potentialtender.OrderOption) *PotentialTenderQuery {
	ptq.order = append(ptq.order, o...)
	return ptq
}

// First returns the first PotentialTender entity from the query.
// Returns a *NotFoundError when no PotentialTender was found.
func (ptq *PotentialTenderQuery) First(ctx context.Context) (*PotentialTender, error) {
	nodes, err := ptq.Limit(1).All(setContextOp(ctx, ptq.ctx, ent.OpQueryFirst))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{potentialtender.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (ptq *PotentialTenderQuery) FirstX(ctx context.Context) *PotentialTender {
	node, err := ptq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first PotentialTender ID from the query.
// Returns a *NotFoundError when no PotentialTender ID was found.
func (ptq *PotentialTenderQuery) FirstID(ctx context.Context) (id xid.ID, err error) {
	var ids []xid.ID
	if ids, err = ptq.Limit(1).IDs(setContextOp(ctx, ptq.ctx, ent.OpQueryFirstID)); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{potentialtender.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (ptq *PotentialTenderQuery) FirstIDX(ctx context.Context) xid.ID {
	id, err := ptq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single PotentialTender entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one PotentialTender entity is found.
// Returns a *NotFoundError when no PotentialTender entities are found.
func (ptq *PotentialTenderQuery) Only(ctx context.Context) (*PotentialTender, error) {
	nodes, err := ptq.Limit(2).All(setContextOp(ctx, ptq.ctx, ent.OpQueryOnly))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{potentialtender.Label}
	default:
		return nil, &NotSingularError{potentialtender.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (ptq *PotentialTenderQuery) OnlyX(ctx context.Context) *PotentialTender {
	node, err := ptq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only PotentialTender ID in the query.
// Returns a *NotSingularError when more than one PotentialTender ID is found.
// Returns a *NotFoundError when no entities are found.
func (ptq *PotentialTenderQuery) OnlyID(ctx context.Context) (id xid.ID, err error) {
	var ids []xid.ID
	if ids, err = ptq.Limit(2).IDs(setContextOp(ctx, ptq.ctx, ent.OpQueryOnlyID)); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{potentialtender.Label}
	default:
		err = &NotSingularError{potentialtender.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (ptq *PotentialTenderQuery) OnlyIDX(ctx context.Context) xid.ID {
	id, err := ptq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of PotentialTenders.
func (ptq *PotentialTenderQuery) All(ctx context.Context) ([]*PotentialTender, error) {
	ctx = setContextOp(ctx, ptq.ctx, ent.OpQueryAll)
	if err := ptq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*PotentialTender, *PotentialTenderQuery]()
	return withInterceptors[[]*PotentialTender](ctx, ptq, qr, ptq.inters)
}

// AllX is like All, but panics if an error occurs.
func (ptq *PotentialTenderQuery) AllX(ctx context.Context) []*PotentialTender {
	nodes, err := ptq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of PotentialTender IDs.
func (ptq *PotentialTenderQuery) IDs(ctx context.Context) (ids []xid.ID, err error) {
	if ptq.ctx.Unique == nil && ptq.path != nil {
		ptq.Unique(true)
	}
	ctx = setContextOp(ctx, ptq.ctx, ent.OpQueryIDs)
	if err = ptq.Select(potentialtender.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (ptq *PotentialTenderQuery) IDsX(ctx context.Context) []xid.ID {
	ids, err := ptq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (ptq *PotentialTenderQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, ptq.ctx, ent.OpQueryCount)
	if err := ptq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, ptq, querierCount[*PotentialTenderQuery](), ptq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (ptq *PotentialTenderQuery) CountX(ctx context.Context) int {
	count, err := ptq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (ptq *PotentialTenderQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, ptq.ctx, ent.OpQueryExist)
	switch _, err := ptq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (ptq *PotentialTenderQuery) ExistX(ctx context.Context) bool {
	exist, err := ptq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the PotentialTenderQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (ptq *PotentialTenderQuery) Clone() *PotentialTenderQuery {
	if ptq == nil {
		return nil
	}
	return &PotentialTenderQuery{
		config:     ptq.config,
		ctx:        ptq.ctx.Clone(),
		order:      append([]potentialtender.OrderOption{}, ptq.order...),
		inters:     append([]Interceptor{}, ptq.inters...),
		predicates: append([]predicate.PotentialTender{}, ptq.predicates...),
		// clone intermediate query.
		sql:  ptq.sql.Clone(),
		path: ptq.path,
	}
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
//	client.PotentialTender.Query().
//		GroupBy(potentialtender.FieldCreatedAt).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (ptq *PotentialTenderQuery) GroupBy(field string, fields ...string) *PotentialTenderGroupBy {
	ptq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &PotentialTenderGroupBy{build: ptq}
	grbuild.flds = &ptq.ctx.Fields
	grbuild.label = potentialtender.Label
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
//	client.PotentialTender.Query().
//		Select(potentialtender.FieldCreatedAt).
//		Scan(ctx, &v)
func (ptq *PotentialTenderQuery) Select(fields ...string) *PotentialTenderSelect {
	ptq.ctx.Fields = append(ptq.ctx.Fields, fields...)
	sbuild := &PotentialTenderSelect{PotentialTenderQuery: ptq}
	sbuild.label = potentialtender.Label
	sbuild.flds, sbuild.scan = &ptq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a PotentialTenderSelect configured with the given aggregations.
func (ptq *PotentialTenderQuery) Aggregate(fns ...AggregateFunc) *PotentialTenderSelect {
	return ptq.Select().Aggregate(fns...)
}

func (ptq *PotentialTenderQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range ptq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, ptq); err != nil {
				return err
			}
		}
	}
	for _, f := range ptq.ctx.Fields {
		if !potentialtender.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if ptq.path != nil {
		prev, err := ptq.path(ctx)
		if err != nil {
			return err
		}
		ptq.sql = prev
	}
	return nil
}

func (ptq *PotentialTenderQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*PotentialTender, error) {
	var (
		nodes = []*PotentialTender{}
		_spec = ptq.querySpec()
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*PotentialTender).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &PotentialTender{config: ptq.config}
		nodes = append(nodes, node)
		return node.assignValues(columns, values)
	}
	if len(ptq.modifiers) > 0 {
		_spec.Modifiers = ptq.modifiers
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, ptq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	for i := range ptq.loadTotal {
		if err := ptq.loadTotal[i](ctx, nodes); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (ptq *PotentialTenderQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := ptq.querySpec()
	if len(ptq.modifiers) > 0 {
		_spec.Modifiers = ptq.modifiers
	}
	_spec.Node.Columns = ptq.ctx.Fields
	if len(ptq.ctx.Fields) > 0 {
		_spec.Unique = ptq.ctx.Unique != nil && *ptq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, ptq.driver, _spec)
}

func (ptq *PotentialTenderQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(potentialtender.Table, potentialtender.Columns, sqlgraph.NewFieldSpec(potentialtender.FieldID, field.TypeString))
	_spec.From = ptq.sql
	if unique := ptq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if ptq.path != nil {
		_spec.Unique = true
	}
	if fields := ptq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, potentialtender.FieldID)
		for i := range fields {
			if fields[i] != potentialtender.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
	}
	if ps := ptq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := ptq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := ptq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := ptq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (ptq *PotentialTenderQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(ptq.driver.Dialect())
	t1 := builder.Table(potentialtender.Table)
	columns := ptq.ctx.Fields
	if len(columns) == 0 {
		columns = potentialtender.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if ptq.sql != nil {
		selector = ptq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if ptq.ctx.Unique != nil && *ptq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range ptq.predicates {
		p(selector)
	}
	for _, p := range ptq.order {
		p(selector)
	}
	if offset := ptq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := ptq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// PotentialTenderGroupBy is the group-by builder for PotentialTender entities.
type PotentialTenderGroupBy struct {
	selector
	build *PotentialTenderQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (ptgb *PotentialTenderGroupBy) Aggregate(fns ...AggregateFunc) *PotentialTenderGroupBy {
	ptgb.fns = append(ptgb.fns, fns...)
	return ptgb
}

// Scan applies the selector query and scans the result into the given value.
func (ptgb *PotentialTenderGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, ptgb.build.ctx, ent.OpQueryGroupBy)
	if err := ptgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*PotentialTenderQuery, *PotentialTenderGroupBy](ctx, ptgb.build, ptgb, ptgb.build.inters, v)
}

func (ptgb *PotentialTenderGroupBy) sqlScan(ctx context.Context, root *PotentialTenderQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(ptgb.fns))
	for _, fn := range ptgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*ptgb.flds)+len(ptgb.fns))
		for _, f := range *ptgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*ptgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ptgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// PotentialTenderSelect is the builder for selecting fields of PotentialTender entities.
type PotentialTenderSelect struct {
	*PotentialTenderQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (pts *PotentialTenderSelect) Aggregate(fns ...AggregateFunc) *PotentialTenderSelect {
	pts.fns = append(pts.fns, fns...)
	return pts
}

// Scan applies the selector query and scans the result into the given value.
func (pts *PotentialTenderSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, pts.ctx, ent.OpQuerySelect)
	if err := pts.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*PotentialTenderQuery, *PotentialTenderSelect](ctx, pts.PotentialTenderQuery, pts, pts.inters, v)
}

func (pts *PotentialTenderSelect) sqlScan(ctx context.Context, root *PotentialTenderQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(pts.fns))
	for _, fn := range pts.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*pts.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := pts.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
