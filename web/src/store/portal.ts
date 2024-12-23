import { competitorsQuery$data } from "__generated__/competitorsQuery.graphql";
import { customerDetailFragment$data } from "__generated__/customerDetailFragment.graphql";
import { tenderDetailFragment$data } from "__generated__/tenderDetailFragment.graphql";
import { tenderListItemFragment$data } from "__generated__/tenderListItemFragment.graphql";
import { visitRecordItemFragment$data } from "__generated__/visitRecordItemFragment.graphql";
import { create } from "zustand";
import { Competitor } from "~/graphql/graphql";

type State = {
  sidebarCollapsed: boolean;
  tenderResultTender:
    | tenderListItemFragment$data
    | tenderDetailFragment$data
    | null;
  customerFormOpen: boolean;
  customerFormCustomer: customerDetailFragment$data | null;
  visitRecordFormOpen: boolean;
  visitRecordFormVisitRecord: visitRecordItemFragment$data | null;
  competitorFormOpen: boolean;
  competitorFormCompetitor: Competitor | null;
};

type Action = {};

export const usePortalStore = create<State & Action>()((set) => ({
  sidebarCollapsed: false,
  tenderResultTender: null,
  customerFormOpen: false,
  customerFormCustomer: null,
  visitRecordFormOpen: false,
  visitRecordFormVisitRecord: null,
  competitorFormOpen: false,
  competitorFormCompetitor: null,
}));
