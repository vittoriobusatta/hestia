import { create } from "zustand";

type HeaderState = {
  color: string;
  setColor: (color: string) => void;
};

export const useHeader = create<HeaderState>((set) => ({
  color: "light",
  setColor: (color) => set({ color }),
}));
