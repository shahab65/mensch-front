import { create } from "zustand";

interface BearState {
  bears: number;
  increasePopulation: (by: number) => void;
}

export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: (by) => set((state) => ({ bears: state.bears + by })),
}));
