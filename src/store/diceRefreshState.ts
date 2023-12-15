import { create } from "zustand";

interface StateModel {
  isDiceValueFresh: boolean;
  setIsDiceValueFresh: (bool: boolean) => void;
}

export const useDiceRefreshState = create<StateModel>((set) => ({
  isDiceValueFresh: false,
  setIsDiceValueFresh: (bool) => set({ isDiceValueFresh: bool }),
}));
