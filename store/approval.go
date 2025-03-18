package store

import (
	"context"
	"cscd-bds/store/ent"
	"cscd-bds/store/ent/customer"
	"cscd-bds/store/ent/schema/xid"
)

func (s *Store) ApproveCustomerUpdate(ctx context.Context, id xid.ID, approverId xid.ID) (*ent.Customer, error) {
	cus, err := s.Customer.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	q := cus.Update().
		SetApprovalStatus(2).
		SetApproverID(approverId).
		ClearDraft()

	if cus.Draft != nil {
		q.SetNillableName(cus.Draft.Name).
			SetNillableOwnerType(cus.Draft.OwnerType).
			SetNillableIndustry(cus.Draft.Industry).
			SetNillableSize(cus.Draft.Size).
			SetNillableContactPerson(cus.Draft.ContactPerson).
			SetNillableContactPersonPosition(cus.Draft.ContactPersonPosition).
			SetNillableContactPersonPhone(cus.Draft.ContactPersonPhone).
			SetNillableContactPersonEmail(cus.Draft.ContactPersonEmail)

		if cus.Draft.AreaID != nil {
			id := xid.ID(*cus.Draft.AreaID)
			q.SetAreaID(id)
		}

		if cus.Draft.SalesID != nil {
			id := xid.ID(*cus.Draft.SalesID)
			q.SetSalesID(id)
		}
	}

	if err := q.Exec(ctx); err != nil {
		return nil, err
	}

	return s.Customer.Query().
		Where(customer.ID(id)).
		WithArea().
		WithCreatedBy().
		WithUpdatedBy().
		WithApprover().
		WithSales().
		Only(ctx)
}
