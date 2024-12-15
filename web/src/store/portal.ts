import { tenderListItemFragment$data } from "__generated__/tenderListItemFragment.graphql";
import { create } from "zustand";

type State = {
  sidebarCollapsed: boolean;
  tenderResultTender: tenderListItemFragment$data | null;
};

type Action = {};

export const usePortalStore = create<State & Action>()((set) => ({
  sidebarCollapsed: false,
  tenderResultTender: null,
}));
