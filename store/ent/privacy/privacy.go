// Code generated by ent, DO NOT EDIT.

package privacy

import (
	"context"

	"cscd-bds/store/ent"

	"entgo.io/ent/entql"
	"entgo.io/ent/privacy"
)

var (
	// Allow may be returned by rules to indicate that the policy
	// evaluation should terminate with allow decision.
	Allow = privacy.Allow

	// Deny may be returned by rules to indicate that the policy
	// evaluation should terminate with deny decision.
	Deny = privacy.Deny

	// Skip may be returned by rules to indicate that the policy
	// evaluation should continue to the next rule.
	Skip = privacy.Skip
)

// Allowf returns a formatted wrapped Allow decision.
func Allowf(format string, a ...any) error {
	return privacy.Allowf(format, a...)
}

// Denyf returns a formatted wrapped Deny decision.
func Denyf(format string, a ...any) error {
	return privacy.Denyf(format, a...)
}

// Skipf returns a formatted wrapped Skip decision.
func Skipf(format string, a ...any) error {
	return privacy.Skipf(format, a...)
}

// DecisionContext creates a new context from the given parent context with
// a policy decision attach to it.
func DecisionContext(parent context.Context, decision error) context.Context {
	return privacy.DecisionContext(parent, decision)
}

// DecisionFromContext retrieves the policy decision from the context.
func DecisionFromContext(ctx context.Context) (error, bool) {
	return privacy.DecisionFromContext(ctx)
}

type (
	// Policy groups query and mutation policies.
	Policy = privacy.Policy

	// QueryRule defines the interface deciding whether a
	// query is allowed and optionally modify it.
	QueryRule = privacy.QueryRule
	// QueryPolicy combines multiple query rules into a single policy.
	QueryPolicy = privacy.QueryPolicy

	// MutationRule defines the interface which decides whether a
	// mutation is allowed and optionally modifies it.
	MutationRule = privacy.MutationRule
	// MutationPolicy combines multiple mutation rules into a single policy.
	MutationPolicy = privacy.MutationPolicy
	// MutationRuleFunc type is an adapter which allows the use of
	// ordinary functions as mutation rules.
	MutationRuleFunc = privacy.MutationRuleFunc

	// QueryMutationRule is an interface which groups query and mutation rules.
	QueryMutationRule = privacy.QueryMutationRule
)

// QueryRuleFunc type is an adapter to allow the use of
// ordinary functions as query rules.
type QueryRuleFunc func(context.Context, ent.Query) error

// Eval returns f(ctx, q).
func (f QueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	return f(ctx, q)
}

// AlwaysAllowRule returns a rule that returns an allow decision.
func AlwaysAllowRule() QueryMutationRule {
	return privacy.AlwaysAllowRule()
}

// AlwaysDenyRule returns a rule that returns a deny decision.
func AlwaysDenyRule() QueryMutationRule {
	return privacy.AlwaysDenyRule()
}

// ContextQueryMutationRule creates a query/mutation rule from a context eval func.
func ContextQueryMutationRule(eval func(context.Context) error) QueryMutationRule {
	return privacy.ContextQueryMutationRule(eval)
}

// OnMutationOperation evaluates the given rule only on a given mutation operation.
func OnMutationOperation(rule MutationRule, op ent.Op) MutationRule {
	return privacy.OnMutationOperation(rule, op)
}

// DenyMutationOperationRule returns a rule denying specified mutation operation.
func DenyMutationOperationRule(op ent.Op) MutationRule {
	rule := MutationRuleFunc(func(_ context.Context, m ent.Mutation) error {
		return Denyf("ent/privacy: operation %s is not allowed", m.Op())
	})
	return OnMutationOperation(rule, op)
}

// The AreaQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type AreaQueryRuleFunc func(context.Context, *ent.AreaQuery) error

// EvalQuery return f(ctx, q).
func (f AreaQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.AreaQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.AreaQuery", q)
}

// The AreaMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type AreaMutationRuleFunc func(context.Context, *ent.AreaMutation) error

// EvalMutation calls f(ctx, m).
func (f AreaMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.AreaMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.AreaMutation", m)
}

// The CityQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type CityQueryRuleFunc func(context.Context, *ent.CityQuery) error

// EvalQuery return f(ctx, q).
func (f CityQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.CityQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.CityQuery", q)
}

// The CityMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type CityMutationRuleFunc func(context.Context, *ent.CityMutation) error

// EvalMutation calls f(ctx, m).
func (f CityMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.CityMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.CityMutation", m)
}

// The CompetitorQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type CompetitorQueryRuleFunc func(context.Context, *ent.CompetitorQuery) error

// EvalQuery return f(ctx, q).
func (f CompetitorQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.CompetitorQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.CompetitorQuery", q)
}

// The CompetitorMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type CompetitorMutationRuleFunc func(context.Context, *ent.CompetitorMutation) error

// EvalMutation calls f(ctx, m).
func (f CompetitorMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.CompetitorMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.CompetitorMutation", m)
}

// The CountryQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type CountryQueryRuleFunc func(context.Context, *ent.CountryQuery) error

// EvalQuery return f(ctx, q).
func (f CountryQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.CountryQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.CountryQuery", q)
}

// The CountryMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type CountryMutationRuleFunc func(context.Context, *ent.CountryMutation) error

// EvalMutation calls f(ctx, m).
func (f CountryMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.CountryMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.CountryMutation", m)
}

// The CustomerQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type CustomerQueryRuleFunc func(context.Context, *ent.CustomerQuery) error

// EvalQuery return f(ctx, q).
func (f CustomerQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.CustomerQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.CustomerQuery", q)
}

// The CustomerMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type CustomerMutationRuleFunc func(context.Context, *ent.CustomerMutation) error

// EvalMutation calls f(ctx, m).
func (f CustomerMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.CustomerMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.CustomerMutation", m)
}

// The CustomerProfileQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type CustomerProfileQueryRuleFunc func(context.Context, *ent.CustomerProfileQuery) error

// EvalQuery return f(ctx, q).
func (f CustomerProfileQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.CustomerProfileQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.CustomerProfileQuery", q)
}

// The CustomerProfileMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type CustomerProfileMutationRuleFunc func(context.Context, *ent.CustomerProfileMutation) error

// EvalMutation calls f(ctx, m).
func (f CustomerProfileMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.CustomerProfileMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.CustomerProfileMutation", m)
}

// The DistrictQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type DistrictQueryRuleFunc func(context.Context, *ent.DistrictQuery) error

// EvalQuery return f(ctx, q).
func (f DistrictQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.DistrictQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.DistrictQuery", q)
}

// The DistrictMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type DistrictMutationRuleFunc func(context.Context, *ent.DistrictMutation) error

// EvalMutation calls f(ctx, m).
func (f DistrictMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.DistrictMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.DistrictMutation", m)
}

// The LandQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type LandQueryRuleFunc func(context.Context, *ent.LandQuery) error

// EvalQuery return f(ctx, q).
func (f LandQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.LandQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.LandQuery", q)
}

// The LandMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type LandMutationRuleFunc func(context.Context, *ent.LandMutation) error

// EvalMutation calls f(ctx, m).
func (f LandMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.LandMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.LandMutation", m)
}

// The OperationQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type OperationQueryRuleFunc func(context.Context, *ent.OperationQuery) error

// EvalQuery return f(ctx, q).
func (f OperationQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.OperationQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.OperationQuery", q)
}

// The OperationMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type OperationMutationRuleFunc func(context.Context, *ent.OperationMutation) error

// EvalMutation calls f(ctx, m).
func (f OperationMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.OperationMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.OperationMutation", m)
}

// The PlotQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type PlotQueryRuleFunc func(context.Context, *ent.PlotQuery) error

// EvalQuery return f(ctx, q).
func (f PlotQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.PlotQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.PlotQuery", q)
}

// The PlotMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type PlotMutationRuleFunc func(context.Context, *ent.PlotMutation) error

// EvalMutation calls f(ctx, m).
func (f PlotMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.PlotMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.PlotMutation", m)
}

// The PotentialTenderQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type PotentialTenderQueryRuleFunc func(context.Context, *ent.PotentialTenderQuery) error

// EvalQuery return f(ctx, q).
func (f PotentialTenderQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.PotentialTenderQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.PotentialTenderQuery", q)
}

// The PotentialTenderMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type PotentialTenderMutationRuleFunc func(context.Context, *ent.PotentialTenderMutation) error

// EvalMutation calls f(ctx, m).
func (f PotentialTenderMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.PotentialTenderMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.PotentialTenderMutation", m)
}

// The ProjectQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type ProjectQueryRuleFunc func(context.Context, *ent.ProjectQuery) error

// EvalQuery return f(ctx, q).
func (f ProjectQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.ProjectQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.ProjectQuery", q)
}

// The ProjectMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type ProjectMutationRuleFunc func(context.Context, *ent.ProjectMutation) error

// EvalMutation calls f(ctx, m).
func (f ProjectMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.ProjectMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.ProjectMutation", m)
}

// The ProvinceQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type ProvinceQueryRuleFunc func(context.Context, *ent.ProvinceQuery) error

// EvalQuery return f(ctx, q).
func (f ProvinceQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.ProvinceQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.ProvinceQuery", q)
}

// The ProvinceMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type ProvinceMutationRuleFunc func(context.Context, *ent.ProvinceMutation) error

// EvalMutation calls f(ctx, m).
func (f ProvinceMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.ProvinceMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.ProvinceMutation", m)
}

// The TenderQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type TenderQueryRuleFunc func(context.Context, *ent.TenderQuery) error

// EvalQuery return f(ctx, q).
func (f TenderQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.TenderQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.TenderQuery", q)
}

// The TenderMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type TenderMutationRuleFunc func(context.Context, *ent.TenderMutation) error

// EvalMutation calls f(ctx, m).
func (f TenderMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.TenderMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.TenderMutation", m)
}

// The TenderCompetitorQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type TenderCompetitorQueryRuleFunc func(context.Context, *ent.TenderCompetitorQuery) error

// EvalQuery return f(ctx, q).
func (f TenderCompetitorQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.TenderCompetitorQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.TenderCompetitorQuery", q)
}

// The TenderCompetitorMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type TenderCompetitorMutationRuleFunc func(context.Context, *ent.TenderCompetitorMutation) error

// EvalMutation calls f(ctx, m).
func (f TenderCompetitorMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.TenderCompetitorMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.TenderCompetitorMutation", m)
}

// The TenderProfileQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type TenderProfileQueryRuleFunc func(context.Context, *ent.TenderProfileQuery) error

// EvalQuery return f(ctx, q).
func (f TenderProfileQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.TenderProfileQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.TenderProfileQuery", q)
}

// The TenderProfileMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type TenderProfileMutationRuleFunc func(context.Context, *ent.TenderProfileMutation) error

// EvalMutation calls f(ctx, m).
func (f TenderProfileMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.TenderProfileMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.TenderProfileMutation", m)
}

// The UserQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type UserQueryRuleFunc func(context.Context, *ent.UserQuery) error

// EvalQuery return f(ctx, q).
func (f UserQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.UserQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.UserQuery", q)
}

// The UserMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type UserMutationRuleFunc func(context.Context, *ent.UserMutation) error

// EvalMutation calls f(ctx, m).
func (f UserMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.UserMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.UserMutation", m)
}

// The VisitRecordQueryRuleFunc type is an adapter to allow the use of ordinary
// functions as a query rule.
type VisitRecordQueryRuleFunc func(context.Context, *ent.VisitRecordQuery) error

// EvalQuery return f(ctx, q).
func (f VisitRecordQueryRuleFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	if q, ok := q.(*ent.VisitRecordQuery); ok {
		return f(ctx, q)
	}
	return Denyf("ent/privacy: unexpected query type %T, expect *ent.VisitRecordQuery", q)
}

// The VisitRecordMutationRuleFunc type is an adapter to allow the use of ordinary
// functions as a mutation rule.
type VisitRecordMutationRuleFunc func(context.Context, *ent.VisitRecordMutation) error

// EvalMutation calls f(ctx, m).
func (f VisitRecordMutationRuleFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	if m, ok := m.(*ent.VisitRecordMutation); ok {
		return f(ctx, m)
	}
	return Denyf("ent/privacy: unexpected mutation type %T, expect *ent.VisitRecordMutation", m)
}

type (
	// Filter is the interface that wraps the Where function
	// for filtering nodes in queries and mutations.
	Filter interface {
		// Where applies a filter on the executed query/mutation.
		Where(entql.P)
	}

	// The FilterFunc type is an adapter that allows the use of ordinary
	// functions as filters for query and mutation types.
	FilterFunc func(context.Context, Filter) error
)

// EvalQuery calls f(ctx, q) if the query implements the Filter interface, otherwise it is denied.
func (f FilterFunc) EvalQuery(ctx context.Context, q ent.Query) error {
	fr, err := queryFilter(q)
	if err != nil {
		return err
	}
	return f(ctx, fr)
}

// EvalMutation calls f(ctx, q) if the mutation implements the Filter interface, otherwise it is denied.
func (f FilterFunc) EvalMutation(ctx context.Context, m ent.Mutation) error {
	fr, err := mutationFilter(m)
	if err != nil {
		return err
	}
	return f(ctx, fr)
}

var _ QueryMutationRule = FilterFunc(nil)

func queryFilter(q ent.Query) (Filter, error) {
	switch q := q.(type) {
	case *ent.AreaQuery:
		return q.Filter(), nil
	case *ent.CityQuery:
		return q.Filter(), nil
	case *ent.CompetitorQuery:
		return q.Filter(), nil
	case *ent.CountryQuery:
		return q.Filter(), nil
	case *ent.CustomerQuery:
		return q.Filter(), nil
	case *ent.CustomerProfileQuery:
		return q.Filter(), nil
	case *ent.DistrictQuery:
		return q.Filter(), nil
	case *ent.LandQuery:
		return q.Filter(), nil
	case *ent.OperationQuery:
		return q.Filter(), nil
	case *ent.PlotQuery:
		return q.Filter(), nil
	case *ent.PotentialTenderQuery:
		return q.Filter(), nil
	case *ent.ProjectQuery:
		return q.Filter(), nil
	case *ent.ProvinceQuery:
		return q.Filter(), nil
	case *ent.TenderQuery:
		return q.Filter(), nil
	case *ent.TenderCompetitorQuery:
		return q.Filter(), nil
	case *ent.TenderProfileQuery:
		return q.Filter(), nil
	case *ent.UserQuery:
		return q.Filter(), nil
	case *ent.VisitRecordQuery:
		return q.Filter(), nil
	default:
		return nil, Denyf("ent/privacy: unexpected query type %T for query filter", q)
	}
}

func mutationFilter(m ent.Mutation) (Filter, error) {
	switch m := m.(type) {
	case *ent.AreaMutation:
		return m.Filter(), nil
	case *ent.CityMutation:
		return m.Filter(), nil
	case *ent.CompetitorMutation:
		return m.Filter(), nil
	case *ent.CountryMutation:
		return m.Filter(), nil
	case *ent.CustomerMutation:
		return m.Filter(), nil
	case *ent.CustomerProfileMutation:
		return m.Filter(), nil
	case *ent.DistrictMutation:
		return m.Filter(), nil
	case *ent.LandMutation:
		return m.Filter(), nil
	case *ent.OperationMutation:
		return m.Filter(), nil
	case *ent.PlotMutation:
		return m.Filter(), nil
	case *ent.PotentialTenderMutation:
		return m.Filter(), nil
	case *ent.ProjectMutation:
		return m.Filter(), nil
	case *ent.ProvinceMutation:
		return m.Filter(), nil
	case *ent.TenderMutation:
		return m.Filter(), nil
	case *ent.TenderCompetitorMutation:
		return m.Filter(), nil
	case *ent.TenderProfileMutation:
		return m.Filter(), nil
	case *ent.UserMutation:
		return m.Filter(), nil
	case *ent.VisitRecordMutation:
		return m.Filter(), nil
	default:
		return nil, Denyf("ent/privacy: unexpected mutation type %T for mutation filter", m)
	}
}
