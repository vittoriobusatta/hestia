import { create } from "zustand";

type Store = {
  openMenu: boolean;
  setOpenMenu: (open: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  openMenu: false,
  setOpenMenu: (open) => set({ openMenu: open }),
}));

