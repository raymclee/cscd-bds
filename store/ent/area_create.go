// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"cscd-bds/store/ent/area"
	"cscd-bds/store/ent/customer"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/schema/zht"
	"cscd-bds/store/ent/tender"
	"errors"
	"fmt"
	"time"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// AreaCreate is the builder for creating a Area entity.
type AreaCreate struct {
	config
	mutation *AreaMutation
	hooks    []Hook
	conflict []sql.ConflictOption
}

// SetCreatedAt sets the "created_at" field.
func (ac *AreaCreate) SetCreatedAt(t time.Time) *AreaCreate {
	ac.mutation.SetCreatedAt(t)
	return ac
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (ac *AreaCreate) SetNillableCreatedAt(t *time.Time) *AreaCreate {
	if t != nil {
		ac.SetCreatedAt(*t)
	}
	return ac
}

// SetUpdatedAt sets the "updated_at" field.
func (ac *AreaCreate) SetUpdatedAt(t time.Time) *AreaCreate {
	ac.mutation.SetUpdatedAt(t)
	return ac
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (ac *AreaCreate) SetNillableUpdatedAt(t *time.Time) *AreaCreate {
	if t != nil {
		ac.SetUpdatedAt(*t)
	}
	return ac
}

// SetName sets the "name" field.
func (ac *AreaCreate) SetName(s string) *AreaCreate {
	ac.mutation.SetName(s)
	return ac
}

// SetCode sets the "code" field.
func (ac *AreaCreate) SetCode(s string) *AreaCreate {
	ac.mutation.SetCode(s)
	return ac
}

// SetSalesTeamMembers sets the "sales_team_members" field.
func (ac *AreaCreate) SetSalesTeamMembers(z []zht.User) *AreaCreate {
	ac.mutation.SetSalesTeamMembers(z)
	return ac
}

// SetID sets the "id" field.
func (ac *AreaCreate) SetID(x xid.ID) *AreaCreate {
	ac.mutation.SetID(x)
	return ac
}

// SetNillableID sets the "id" field if the given value is not nil.
func (ac *AreaCreate) SetNillableID(x *xid.ID) *AreaCreate {
	if x != nil {
		ac.SetID(*x)
	}
	return ac
}

// AddCustomerIDs adds the "customers" edge to the Customer entity by IDs.
func (ac *AreaCreate) AddCustomerIDs(ids ...xid.ID) *AreaCreate {
	ac.mutation.AddCustomerIDs(ids...)
	return ac
}

// AddCustomers adds the "customers" edges to the Customer entity.
func (ac *AreaCreate) AddCustomers(c ...*Customer) *AreaCreate {
	ids := make([]xid.ID, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return ac.AddCustomerIDs(ids...)
}

// AddTenderIDs adds the "tenders" edge to the Tender entity by IDs.
func (ac *AreaCreate) AddTenderIDs(ids ...xid.ID) *AreaCreate {
	ac.mutation.AddTenderIDs(ids...)
	return ac
}

// AddTenders adds the "tenders" edges to the Tender entity.
func (ac *AreaCreate) AddTenders(t ...*Tender) *AreaCreate {
	ids := make([]xid.ID, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return ac.AddTenderIDs(ids...)
}

// Mutation returns the AreaMutation object of the builder.
func (ac *AreaCreate) Mutation() *AreaMutation {
	return ac.mutation
}

// Save creates the Area in the database.
func (ac *AreaCreate) Save(ctx context.Context) (*Area, error) {
	ac.defaults()
	return withHooks(ctx, ac.sqlSave, ac.mutation, ac.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (ac *AreaCreate) SaveX(ctx context.Context) *Area {
	v, err := ac.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ac *AreaCreate) Exec(ctx context.Context) error {
	_, err := ac.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ac *AreaCreate) ExecX(ctx context.Context) {
	if err := ac.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ac *AreaCreate) defaults() {
	if _, ok := ac.mutation.CreatedAt(); !ok {
		v := area.DefaultCreatedAt()
		ac.mutation.SetCreatedAt(v)
	}
	if _, ok := ac.mutation.UpdatedAt(); !ok {
		v := area.DefaultUpdatedAt()
		ac.mutation.SetUpdatedAt(v)
	}
	if _, ok := ac.mutation.ID(); !ok {
		v := area.DefaultID()
		ac.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ac *AreaCreate) check() error {
	if _, ok := ac.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "Area.created_at"`)}
	}
	if _, ok := ac.mutation.UpdatedAt(); !ok {
		return &ValidationError{Name: "updated_at", err: errors.New(`ent: missing required field "Area.updated_at"`)}
	}
	if _, ok := ac.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New(`ent: missing required field "Area.name"`)}
	}
	if _, ok := ac.mutation.Code(); !ok {
		return &ValidationError{Name: "code", err: errors.New(`ent: missing required field "Area.code"`)}
	}
	if _, ok := ac.mutation.SalesTeamMembers(); !ok {
		return &ValidationError{Name: "sales_team_members", err: errors.New(`ent: missing required field "Area.sales_team_members"`)}
	}
	return nil
}

func (ac *AreaCreate) sqlSave(ctx context.Context) (*Area, error) {
	if err := ac.check(); err != nil {
		return nil, err
	}
	_node, _spec := ac.createSpec()
	if err := sqlgraph.CreateNode(ctx, ac.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(*xid.ID); ok {
			_node.ID = *id
		} else if err := _node.ID.Scan(_spec.ID.Value); err != nil {
			return nil, err
		}
	}
	ac.mutation.id = &_node.ID
	ac.mutation.done = true
	return _node, nil
}

func (ac *AreaCreate) createSpec() (*Area, *sqlgraph.CreateSpec) {
	var (
		_node = &Area{config: ac.config}
		_spec = sqlgraph.NewCreateSpec(area.Table, sqlgraph.NewFieldSpec(area.FieldID, field.TypeString))
	)
	_spec.OnConflict = ac.conflict
	if id, ok := ac.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := ac.mutation.CreatedAt(); ok {
		_spec.SetField(area.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if value, ok := ac.mutation.UpdatedAt(); ok {
		_spec.SetField(area.FieldUpdatedAt, field.TypeTime, value)
		_node.UpdatedAt = value
	}
	if value, ok := ac.mutation.Name(); ok {
		_spec.SetField(area.FieldName, field.TypeString, value)
		_node.Name = value
	}
	if value, ok := ac.mutation.Code(); ok {
		_spec.SetField(area.FieldCode, field.TypeString, value)
		_node.Code = value
	}
	if value, ok := ac.mutation.SalesTeamMembers(); ok {
		_spec.SetField(area.FieldSalesTeamMembers, field.TypeJSON, value)
		_node.SalesTeamMembers = value
	}
	if nodes := ac.mutation.CustomersIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   area.CustomersTable,
			Columns: []string{area.CustomersColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(customer.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ac.mutation.TendersIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   area.TendersTable,
			Columns: []string{area.TendersColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(tender.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Area.Create().
//		SetCreatedAt(v).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.AreaUpsert) {
//			SetCreatedAt(v+v).
//		}).
//		Exec(ctx)
func (ac *AreaCreate) OnConflict(opts ...sql.ConflictOption) *AreaUpsertOne {
	ac.conflict = opts
	return &AreaUpsertOne{
		create: ac,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Area.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
func (ac *AreaCreate) OnConflictColumns(columns ...string) *AreaUpsertOne {
	ac.conflict = append(ac.conflict, sql.ConflictColumns(columns...))
	return &AreaUpsertOne{
		create: ac,
	}
}

type (
	// AreaUpsertOne is the builder for "upsert"-ing
	//  one Area node.
	AreaUpsertOne struct {
		create *AreaCreate
	}

	// AreaUpsert is the "OnConflict" setter.
	AreaUpsert struct {
		*sql.UpdateSet
	}
)

// SetUpdatedAt sets the "updated_at" field.
func (u *AreaUpsert) SetUpdatedAt(v time.Time) *AreaUpsert {
	u.Set(area.FieldUpdatedAt, v)
	return u
}

// UpdateUpdatedAt sets the "updated_at" field to the value that was provided on create.
func (u *AreaUpsert) UpdateUpdatedAt() *AreaUpsert {
	u.SetExcluded(area.FieldUpdatedAt)
	return u
}

// SetName sets the "name" field.
func (u *AreaUpsert) SetName(v string) *AreaUpsert {
	u.Set(area.FieldName, v)
	return u
}

// UpdateName sets the "name" field to the value that was provided on create.
func (u *AreaUpsert) UpdateName() *AreaUpsert {
	u.SetExcluded(area.FieldName)
	return u
}

// SetCode sets the "code" field.
func (u *AreaUpsert) SetCode(v string) *AreaUpsert {
	u.Set(area.FieldCode, v)
	return u
}

// UpdateCode sets the "code" field to the value that was provided on create.
func (u *AreaUpsert) UpdateCode() *AreaUpsert {
	u.SetExcluded(area.FieldCode)
	return u
}

// SetSalesTeamMembers sets the "sales_team_members" field.
func (u *AreaUpsert) SetSalesTeamMembers(v []zht.User) *AreaUpsert {
	u.Set(area.FieldSalesTeamMembers, v)
	return u
}

// UpdateSalesTeamMembers sets the "sales_team_members" field to the value that was provided on create.
func (u *AreaUpsert) UpdateSalesTeamMembers() *AreaUpsert {
	u.SetExcluded(area.FieldSalesTeamMembers)
	return u
}

// UpdateNewValues updates the mutable fields using the new values that were set on create except the ID field.
// Using this option is equivalent to using:
//
//	client.Area.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(area.FieldID)
//			}),
//		).
//		Exec(ctx)
func (u *AreaUpsertOne) UpdateNewValues() *AreaUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		if _, exists := u.create.mutation.ID(); exists {
			s.SetIgnore(area.FieldID)
		}
		if _, exists := u.create.mutation.CreatedAt(); exists {
			s.SetIgnore(area.FieldCreatedAt)
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.Area.Create().
//	    OnConflict(sql.ResolveWithIgnore()).
//	    Exec(ctx)
func (u *AreaUpsertOne) Ignore() *AreaUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *AreaUpsertOne) DoNothing() *AreaUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the AreaCreate.OnConflict
// documentation for more info.
func (u *AreaUpsertOne) Update(set func(*AreaUpsert)) *AreaUpsertOne {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&AreaUpsert{UpdateSet: update})
	}))
	return u
}

// SetUpdatedAt sets the "updated_at" field.
func (u *AreaUpsertOne) SetUpdatedAt(v time.Time) *AreaUpsertOne {
	return u.Update(func(s *AreaUpsert) {
		s.SetUpdatedAt(v)
	})
}

// UpdateUpdatedAt sets the "updated_at" field to the value that was provided on create.
func (u *AreaUpsertOne) UpdateUpdatedAt() *AreaUpsertOne {
	return u.Update(func(s *AreaUpsert) {
		s.UpdateUpdatedAt()
	})
}

// SetName sets the "name" field.
func (u *AreaUpsertOne) SetName(v string) *AreaUpsertOne {
	return u.Update(func(s *AreaUpsert) {
		s.SetName(v)
	})
}

// UpdateName sets the "name" field to the value that was provided on create.
func (u *AreaUpsertOne) UpdateName() *AreaUpsertOne {
	return u.Update(func(s *AreaUpsert) {
		s.UpdateName()
	})
}

// SetCode sets the "code" field.
func (u *AreaUpsertOne) SetCode(v string) *AreaUpsertOne {
	return u.Update(func(s *AreaUpsert) {
		s.SetCode(v)
	})
}

// UpdateCode sets the "code" field to the value that was provided on create.
func (u *AreaUpsertOne) UpdateCode() *AreaUpsertOne {
	return u.Update(func(s *AreaUpsert) {
		s.UpdateCode()
	})
}

// SetSalesTeamMembers sets the "sales_team_members" field.
func (u *AreaUpsertOne) SetSalesTeamMembers(v []zht.User) *AreaUpsertOne {
	return u.Update(func(s *AreaUpsert) {
		s.SetSalesTeamMembers(v)
	})
}

// UpdateSalesTeamMembers sets the "sales_team_members" field to the value that was provided on create.
func (u *AreaUpsertOne) UpdateSalesTeamMembers() *AreaUpsertOne {
	return u.Update(func(s *AreaUpsert) {
		s.UpdateSalesTeamMembers()
	})
}

// Exec executes the query.
func (u *AreaUpsertOne) Exec(ctx context.Context) error {
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for AreaCreate.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *AreaUpsertOne) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}

// Exec executes the UPSERT query and returns the inserted/updated ID.
func (u *AreaUpsertOne) ID(ctx context.Context) (id xid.ID, err error) {
	if u.create.driver.Dialect() == dialect.MySQL {
		// In case of "ON CONFLICT", there is no way to get back non-numeric ID
		// fields from the database since MySQL does not support the RETURNING clause.
		return id, errors.New("ent: AreaUpsertOne.ID is not supported by MySQL driver. Use AreaUpsertOne.Exec instead")
	}
	node, err := u.create.Save(ctx)
	if err != nil {
		return id, err
	}
	return node.ID, nil
}

// IDX is like ID, but panics if an error occurs.
func (u *AreaUpsertOne) IDX(ctx context.Context) xid.ID {
	id, err := u.ID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// AreaCreateBulk is the builder for creating many Area entities in bulk.
type AreaCreateBulk struct {
	config
	err      error
	builders []*AreaCreate
	conflict []sql.ConflictOption
}

// Save creates the Area entities in the database.
func (acb *AreaCreateBulk) Save(ctx context.Context) ([]*Area, error) {
	if acb.err != nil {
		return nil, acb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(acb.builders))
	nodes := make([]*Area, len(acb.builders))
	mutators := make([]Mutator, len(acb.builders))
	for i := range acb.builders {
		func(i int, root context.Context) {
			builder := acb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*AreaMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, acb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					spec.OnConflict = acb.conflict
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, acb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, acb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (acb *AreaCreateBulk) SaveX(ctx context.Context) []*Area {
	v, err := acb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (acb *AreaCreateBulk) Exec(ctx context.Context) error {
	_, err := acb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (acb *AreaCreateBulk) ExecX(ctx context.Context) {
	if err := acb.Exec(ctx); err != nil {
		panic(err)
	}
}

// OnConflict allows configuring the `ON CONFLICT` / `ON DUPLICATE KEY` clause
// of the `INSERT` statement. For example:
//
//	client.Area.CreateBulk(builders...).
//		OnConflict(
//			// Update the row with the new values
//			// the was proposed for insertion.
//			sql.ResolveWithNewValues(),
//		).
//		// Override some of the fields with custom
//		// update values.
//		Update(func(u *ent.AreaUpsert) {
//			SetCreatedAt(v+v).
//		}).
//		Exec(ctx)
func (acb *AreaCreateBulk) OnConflict(opts ...sql.ConflictOption) *AreaUpsertBulk {
	acb.conflict = opts
	return &AreaUpsertBulk{
		create: acb,
	}
}

// OnConflictColumns calls `OnConflict` and configures the columns
// as conflict target. Using this option is equivalent to using:
//
//	client.Area.Create().
//		OnConflict(sql.ConflictColumns(columns...)).
//		Exec(ctx)
func (acb *AreaCreateBulk) OnConflictColumns(columns ...string) *AreaUpsertBulk {
	acb.conflict = append(acb.conflict, sql.ConflictColumns(columns...))
	return &AreaUpsertBulk{
		create: acb,
	}
}

// AreaUpsertBulk is the builder for "upsert"-ing
// a bulk of Area nodes.
type AreaUpsertBulk struct {
	create *AreaCreateBulk
}

// UpdateNewValues updates the mutable fields using the new values that
// were set on create. Using this option is equivalent to using:
//
//	client.Area.Create().
//		OnConflict(
//			sql.ResolveWithNewValues(),
//			sql.ResolveWith(func(u *sql.UpdateSet) {
//				u.SetIgnore(area.FieldID)
//			}),
//		).
//		Exec(ctx)
func (u *AreaUpsertBulk) UpdateNewValues() *AreaUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithNewValues())
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(s *sql.UpdateSet) {
		for _, b := range u.create.builders {
			if _, exists := b.mutation.ID(); exists {
				s.SetIgnore(area.FieldID)
			}
			if _, exists := b.mutation.CreatedAt(); exists {
				s.SetIgnore(area.FieldCreatedAt)
			}
		}
	}))
	return u
}

// Ignore sets each column to itself in case of conflict.
// Using this option is equivalent to using:
//
//	client.Area.Create().
//		OnConflict(sql.ResolveWithIgnore()).
//		Exec(ctx)
func (u *AreaUpsertBulk) Ignore() *AreaUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWithIgnore())
	return u
}

// DoNothing configures the conflict_action to `DO NOTHING`.
// Supported only by SQLite and PostgreSQL.
func (u *AreaUpsertBulk) DoNothing() *AreaUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.DoNothing())
	return u
}

// Update allows overriding fields `UPDATE` values. See the AreaCreateBulk.OnConflict
// documentation for more info.
func (u *AreaUpsertBulk) Update(set func(*AreaUpsert)) *AreaUpsertBulk {
	u.create.conflict = append(u.create.conflict, sql.ResolveWith(func(update *sql.UpdateSet) {
		set(&AreaUpsert{UpdateSet: update})
	}))
	return u
}

// SetUpdatedAt sets the "updated_at" field.
func (u *AreaUpsertBulk) SetUpdatedAt(v time.Time) *AreaUpsertBulk {
	return u.Update(func(s *AreaUpsert) {
		s.SetUpdatedAt(v)
	})
}

// UpdateUpdatedAt sets the "updated_at" field to the value that was provided on create.
func (u *AreaUpsertBulk) UpdateUpdatedAt() *AreaUpsertBulk {
	return u.Update(func(s *AreaUpsert) {
		s.UpdateUpdatedAt()
	})
}

// SetName sets the "name" field.
func (u *AreaUpsertBulk) SetName(v string) *AreaUpsertBulk {
	return u.Update(func(s *AreaUpsert) {
		s.SetName(v)
	})
}

// UpdateName sets the "name" field to the value that was provided on create.
func (u *AreaUpsertBulk) UpdateName() *AreaUpsertBulk {
	return u.Update(func(s *AreaUpsert) {
		s.UpdateName()
	})
}

// SetCode sets the "code" field.
func (u *AreaUpsertBulk) SetCode(v string) *AreaUpsertBulk {
	return u.Update(func(s *AreaUpsert) {
		s.SetCode(v)
	})
}

// UpdateCode sets the "code" field to the value that was provided on create.
func (u *AreaUpsertBulk) UpdateCode() *AreaUpsertBulk {
	return u.Update(func(s *AreaUpsert) {
		s.UpdateCode()
	})
}

// SetSalesTeamMembers sets the "sales_team_members" field.
func (u *AreaUpsertBulk) SetSalesTeamMembers(v []zht.User) *AreaUpsertBulk {
	return u.Update(func(s *AreaUpsert) {
		s.SetSalesTeamMembers(v)
	})
}

// UpdateSalesTeamMembers sets the "sales_team_members" field to the value that was provided on create.
func (u *AreaUpsertBulk) UpdateSalesTeamMembers() *AreaUpsertBulk {
	return u.Update(func(s *AreaUpsert) {
		s.UpdateSalesTeamMembers()
	})
}

// Exec executes the query.
func (u *AreaUpsertBulk) Exec(ctx context.Context) error {
	if u.create.err != nil {
		return u.create.err
	}
	for i, b := range u.create.builders {
		if len(b.conflict) != 0 {
			return fmt.Errorf("ent: OnConflict was set for builder %d. Set it on the AreaCreateBulk instead", i)
		}
	}
	if len(u.create.conflict) == 0 {
		return errors.New("ent: missing options for AreaCreateBulk.OnConflict")
	}
	return u.create.Exec(ctx)
}

// ExecX is like Exec, but panics if an error occurs.
func (u *AreaUpsertBulk) ExecX(ctx context.Context) {
	if err := u.create.Exec(ctx); err != nil {
		panic(err)
	}
}