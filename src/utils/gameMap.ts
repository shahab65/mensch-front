import { GameType } from "store/GameState";
import { Colors } from "../types/index";

export const circularGame = function (game: GameType) {
  return [game.yellow, game.red, game.blue, game.green];
};

export const getPositions = (game: GameType) => {
  const blues = {
    m1: game.blue.m1,
    m2: game.blue.m2,
    m3: game.blue.m3,
    m4: game.blue.m4,
  };
  const greens = {
    m1: game.green.m1,
    m2: game.green.m2,
    m3: game.green.m3,
    m4: game.green.m4,
  };
  const yellows = {
    m1: game.yellow.m1,
    m2: game.yellow.m2,
    m3: game.yellow.m3,
    m4: game.yellow.m4,
  };
  const reds = {
    m1: game.red.m1,
    m2: game.red.m2,
    m3: game.red.m3,
    m4: game.red.m4,
  };
  return { blues, greens, yellows, reds };
};

function arraysEqual(array1: number[], array2: number[]) {
  if (array1.length !== array2.length) {
    return false;
  }

  const sortedArray1 = array1.sort();
  const sortedArray2 = array2.sort();

  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }

  return true;
}

export const destinationHouses = {
  blue: [48, 49, 50, 51],
  red: [44, 45, 46, 47],
  green: [52, 53, 54, 55],
  yellow: [40, 41, 42, 43],
};

export const hasColorFinished = (color: Colors, positions: number[]) => {
  return arraysEqual(destinationHouses[color], positions);
};
