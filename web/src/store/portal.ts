import { customerDetailFragment$data } from "__generated__/customerDetailFragment.graphql";
import { tenderDetailFragment$data } from "__generated__/tenderDetailFragment.graphql";
import { tenderListItemFragment$data } from "__generated__/tenderListItemFragment.graphql";
import { create } from "zustand";

type State = {
  sidebarCollapsed: boolean;
  tenderResultTender:
    | tenderListItemFragment$data
    | tenderDetailFragment$data
    | null;
  customerFormOpen: boolean;
  customerFormCustomer: customerDetailFragment$data | null;
  visitRecordFormOpen: boolean;
};

type Action = {};

export const usePortalStore = create<State & Action>()((set) => ({
  sidebarCollapsed: false,
  tenderResultTender: null,
  customerFormOpen: false,
  customerFormCustomer: null,
  visitRecordFormOpen: false,
}));
