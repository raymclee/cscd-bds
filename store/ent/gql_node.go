// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"cscd-bds/store/ent/area"
	"cscd-bds/store/ent/city"
	"cscd-bds/store/ent/competitor"
	"cscd-bds/store/ent/country"
	"cscd-bds/store/ent/customer"
	"cscd-bds/store/ent/customerprofile"
	"cscd-bds/store/ent/district"
	"cscd-bds/store/ent/land"
	"cscd-bds/store/ent/operation"
	"cscd-bds/store/ent/plot"
	"cscd-bds/store/ent/potentialtender"
	"cscd-bds/store/ent/project"
	"cscd-bds/store/ent/province"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/tender"
	"cscd-bds/store/ent/tendercompetitor"
	"cscd-bds/store/ent/tenderprofile"
	"cscd-bds/store/ent/user"
	"cscd-bds/store/ent/visitrecord"
	"fmt"

	"entgo.io/contrib/entgql"
	"github.com/99designs/gqlgen/graphql"
	"github.com/hashicorp/go-multierror"
)

// Noder wraps the basic Node method.
type Noder interface {
	IsNode()
}

var areaImplementors = []string{"Area", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Area) IsNode() {}

var cityImplementors = []string{"City", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*City) IsNode() {}

var competitorImplementors = []string{"Competitor", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Competitor) IsNode() {}

var countryImplementors = []string{"Country", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Country) IsNode() {}

var customerImplementors = []string{"Customer", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Customer) IsNode() {}

var customerprofileImplementors = []string{"CustomerProfile", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*CustomerProfile) IsNode() {}

var districtImplementors = []string{"District", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*District) IsNode() {}

var landImplementors = []string{"Land", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Land) IsNode() {}

var operationImplementors = []string{"Operation", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Operation) IsNode() {}

var plotImplementors = []string{"Plot", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Plot) IsNode() {}

var potentialtenderImplementors = []string{"PotentialTender", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*PotentialTender) IsNode() {}

var projectImplementors = []string{"Project", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Project) IsNode() {}

var provinceImplementors = []string{"Province", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Province) IsNode() {}

var tenderImplementors = []string{"Tender", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Tender) IsNode() {}

var tendercompetitorImplementors = []string{"TenderCompetitor", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*TenderCompetitor) IsNode() {}

var tenderprofileImplementors = []string{"TenderProfile", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*TenderProfile) IsNode() {}

var userImplementors = []string{"User", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*User) IsNode() {}

var visitrecordImplementors = []string{"VisitRecord", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*VisitRecord) IsNode() {}

var errNodeInvalidID = &NotFoundError{"node"}

// NodeOption allows configuring the Noder execution using functional options.
type NodeOption func(*nodeOptions)

// WithNodeType sets the node Type resolver function (i.e. the table to query).
// If was not provided, the table will be derived from the universal-id
// configuration as described in: https://entgo.io/docs/migrate/#universal-ids.
func WithNodeType(f func(context.Context, xid.ID) (string, error)) NodeOption {
	return func(o *nodeOptions) {
		o.nodeType = f
	}
}

// WithFixedNodeType sets the Type of the node to a fixed value.
func WithFixedNodeType(t string) NodeOption {
	return WithNodeType(func(context.Context, xid.ID) (string, error) {
		return t, nil
	})
}

type nodeOptions struct {
	nodeType func(context.Context, xid.ID) (string, error)
}

func (c *Client) newNodeOpts(opts []NodeOption) *nodeOptions {
	nopts := &nodeOptions{}
	for _, opt := range opts {
		opt(nopts)
	}
	if nopts.nodeType == nil {
		nopts.nodeType = func(ctx context.Context, id xid.ID) (string, error) {
			return "", fmt.Errorf("cannot resolve noder (%v) without its type", id)
		}
	}
	return nopts
}

// Noder returns a Node by its id. If the NodeType was not provided, it will
// be derived from the id value according to the universal-id configuration.
//
//	c.Noder(ctx, id)
//	c.Noder(ctx, id, ent.WithNodeType(typeResolver))
func (c *Client) Noder(ctx context.Context, id xid.ID, opts ...NodeOption) (_ Noder, err error) {
	defer func() {
		if IsNotFound(err) {
			err = multierror.Append(err, entgql.ErrNodeNotFound(id))
		}
	}()
	table, err := c.newNodeOpts(opts).nodeType(ctx, id)
	if err != nil {
		return nil, err
	}
	return c.noder(ctx, table, id)
}

func (c *Client) noder(ctx context.Context, table string, id xid.ID) (Noder, error) {
	switch table {
	case area.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Area.Query().
			Where(area.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, areaImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case city.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.City.Query().
			Where(city.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, cityImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case competitor.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Competitor.Query().
			Where(competitor.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, competitorImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case country.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Country.Query().
			Where(country.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, countryImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case customer.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Customer.Query().
			Where(customer.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, customerImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case customerprofile.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.CustomerProfile.Query().
			Where(customerprofile.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, customerprofileImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case district.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.District.Query().
			Where(district.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, districtImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case land.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Land.Query().
			Where(land.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, landImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case operation.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Operation.Query().
			Where(operation.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, operationImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case plot.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Plot.Query().
			Where(plot.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, plotImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case potentialtender.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.PotentialTender.Query().
			Where(potentialtender.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, potentialtenderImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case project.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Project.Query().
			Where(project.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, projectImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case province.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Province.Query().
			Where(province.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, provinceImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case tender.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.Tender.Query().
			Where(tender.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, tenderImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case tendercompetitor.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.TenderCompetitor.Query().
			Where(tendercompetitor.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, tendercompetitorImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case tenderprofile.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.TenderProfile.Query().
			Where(tenderprofile.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, tenderprofileImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case user.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.User.Query().
			Where(user.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, userImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case visitrecord.Table:
		var uid xid.ID
		if err := uid.UnmarshalGQL(id); err != nil {
			return nil, err
		}
		query := c.VisitRecord.Query().
			Where(visitrecord.ID(uid))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, visitrecordImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	default:
		return nil, fmt.Errorf("cannot resolve noder from table %q: %w", table, errNodeInvalidID)
	}
}

func (c *Client) Noders(ctx context.Context, ids []xid.ID, opts ...NodeOption) ([]Noder, error) {
	switch len(ids) {
	case 1:
		noder, err := c.Noder(ctx, ids[0], opts...)
		if err != nil {
			return nil, err
		}
		return []Noder{noder}, nil
	case 0:
		return []Noder{}, nil
	}

	noders := make([]Noder, len(ids))
	errors := make([]error, len(ids))
	tables := make(map[string][]xid.ID)
	id2idx := make(map[xid.ID][]int, len(ids))
	nopts := c.newNodeOpts(opts)
	for i, id := range ids {
		table, err := nopts.nodeType(ctx, id)
		if err != nil {
			errors[i] = err
			continue
		}
		tables[table] = append(tables[table], id)
		id2idx[id] = append(id2idx[id], i)
	}

	for table, ids := range tables {
		nodes, err := c.noders(ctx, table, ids)
		if err != nil {
			for _, id := range ids {
				for _, idx := range id2idx[id] {
					errors[idx] = err
				}
			}
		} else {
			for i, id := range ids {
				for _, idx := range id2idx[id] {
					noders[idx] = nodes[i]
				}
			}
		}
	}

	for i, id := range ids {
		if errors[i] == nil {
			if noders[i] != nil {
				continue
			}
			errors[i] = entgql.ErrNodeNotFound(id)
		} else if IsNotFound(errors[i]) {
			errors[i] = multierror.Append(errors[i], entgql.ErrNodeNotFound(id))
		}
		ctx := graphql.WithPathContext(ctx,
			graphql.NewPathWithIndex(i),
		)
		graphql.AddError(ctx, errors[i])
	}
	return noders, nil
}

func (c *Client) noders(ctx context.Context, table string, ids []xid.ID) ([]Noder, error) {
	noders := make([]Noder, len(ids))
	idmap := make(map[xid.ID][]*Noder, len(ids))
	for i, id := range ids {
		idmap[id] = append(idmap[id], &noders[i])
	}
	switch table {
	case area.Table:
		query := c.Area.Query().
			Where(area.IDIn(ids...))
		query, err := query.CollectFields(ctx, areaImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case city.Table:
		query := c.City.Query().
			Where(city.IDIn(ids...))
		query, err := query.CollectFields(ctx, cityImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case competitor.Table:
		query := c.Competitor.Query().
			Where(competitor.IDIn(ids...))
		query, err := query.CollectFields(ctx, competitorImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case country.Table:
		query := c.Country.Query().
			Where(country.IDIn(ids...))
		query, err := query.CollectFields(ctx, countryImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case customer.Table:
		query := c.Customer.Query().
			Where(customer.IDIn(ids...))
		query, err := query.CollectFields(ctx, customerImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case customerprofile.Table:
		query := c.CustomerProfile.Query().
			Where(customerprofile.IDIn(ids...))
		query, err := query.CollectFields(ctx, customerprofileImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case district.Table:
		query := c.District.Query().
			Where(district.IDIn(ids...))
		query, err := query.CollectFields(ctx, districtImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case land.Table:
		query := c.Land.Query().
			Where(land.IDIn(ids...))
		query, err := query.CollectFields(ctx, landImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case operation.Table:
		query := c.Operation.Query().
			Where(operation.IDIn(ids...))
		query, err := query.CollectFields(ctx, operationImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case plot.Table:
		query := c.Plot.Query().
			Where(plot.IDIn(ids...))
		query, err := query.CollectFields(ctx, plotImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case potentialtender.Table:
		query := c.PotentialTender.Query().
			Where(potentialtender.IDIn(ids...))
		query, err := query.CollectFields(ctx, potentialtenderImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case project.Table:
		query := c.Project.Query().
			Where(project.IDIn(ids...))
		query, err := query.CollectFields(ctx, projectImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case province.Table:
		query := c.Province.Query().
			Where(province.IDIn(ids...))
		query, err := query.CollectFields(ctx, provinceImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case tender.Table:
		query := c.Tender.Query().
			Where(tender.IDIn(ids...))
		query, err := query.CollectFields(ctx, tenderImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case tendercompetitor.Table:
		query := c.TenderCompetitor.Query().
			Where(tendercompetitor.IDIn(ids...))
		query, err := query.CollectFields(ctx, tendercompetitorImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case tenderprofile.Table:
		query := c.TenderProfile.Query().
			Where(tenderprofile.IDIn(ids...))
		query, err := query.CollectFields(ctx, tenderprofileImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case user.Table:
		query := c.User.Query().
			Where(user.IDIn(ids...))
		query, err := query.CollectFields(ctx, userImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case visitrecord.Table:
		query := c.VisitRecord.Query().
			Where(visitrecord.IDIn(ids...))
		query, err := query.CollectFields(ctx, visitrecordImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	default:
		return nil, fmt.Errorf("cannot resolve noders from table %q: %w", table, errNodeInvalidID)
	}
	return noders, nil
}
