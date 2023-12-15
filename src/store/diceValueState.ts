import { create } from "zustand";
import { getRandomNumber } from "../utils/getRandomNumber";
import { DiceNumbers } from "../types/index";

interface StateModel {
  diceValue: DiceNumbers;
  setDiceValue: (value: DiceNumbers) => void;
}

export const useDiceValueState = create<StateModel>((set) => ({
  diceValue: getRandomNumber(),
  setDiceValue: (diceValue) => set({ diceValue }),
}));
