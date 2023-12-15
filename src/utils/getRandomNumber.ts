import { DiceNumbers } from "../types/index";

export const getRandomNumber = (
  min: number = 1,
  max: number = 6
): DiceNumbers => {
  return (Math.floor(Math.random() * (max - min + 1)) + min) as DiceNumbers;
};
