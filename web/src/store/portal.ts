import { create } from "zustand";

type State = {
  sidebarCollapsed: boolean;
};

type Action = {};

export const usePortalStore = create<State & Action>()((set) => ({
  sidebarCollapsed: false,
}));
