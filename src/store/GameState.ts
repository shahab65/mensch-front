import { Colors, GameStatus } from "types";
import { create } from "zustand";
import { DiceNumbers, Player, PlayerStatus } from "../types/index";
import { turns } from "../hooks/useTurn";

export type Piece = {
  status: string;
  player: string;
  color: "blue" | "green" | "yellow" | "red";
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  user: {
    name: string;
    picture: string;
    sub: string;
  };
};

export type GameType = {
  turn: Colors;
  status: GameStatus;
  diceRoll: DiceNumbers | 0;
  blue: Piece;
  red: Piece;
  yellow: Piece;
  green: Piece;
};

interface GameState {
  game: GameType;
  setGame: (game: GameType) => void;
  takeMeToNext: (game: GameType) => void;
}

const findNextTurn = (
  game: GameType,
  possibleNextTurn: Colors
): Colors | null => {
  if (game.turn === possibleNextTurn) {
    return null;
  }
  if (game[possibleNextTurn].status === "playing") return possibleNextTurn;
  //@ts-ignore
  else return findNextTurn(game, turns[possibleNextTurn]);
};
export const useGameState = create<GameState>((set) => ({
  game: {
    turn: "yellow",
    status: "initial",
    diceRoll: 0,
    blue: {
      status: "not_taken",
      player: "",
      color: "blue",
      m1: 64,
      m2: 65,
      m3: 66,
      m4: 67,
      user: {
        name: "",
        picture: "",
        sub: "",
      },
    },
    green: {
      status: "not_taken",
      player: "",
      color: "green",

      m1: 68,
      m2: 69,
      m3: 70,
      m4: 71,
      user: {
        name: "",
        picture: "",
        sub: "",
      },
    },
    red: {
      status: "not_taken",
      player: "",
      color: "red",
      m1: 60,
      m2: 61,
      m3: 62,
      m4: 63,
      user: {
        name: "",
        picture: "",
        sub: "",
      },
    },
    yellow: {
      status: "not_taken",
      player: "",
      color: "yellow",

      m1: 56,
      m2: 57,
      m3: 58,
      m4: 59,
      user: {
        name: "",
        picture: "",
        sub: "",
      },
    },
  },
  setGame: (game) => set({ game }),
  takeMeToNext: (game) => {
    //@ts-ignore
    const nextTurn = findNextTurn(game, turns[game.turn]);
    if (nextTurn) {
      game.turn = nextTurn;
      set(() => ({ game }));
    } else {
      console.log("could not find next, game probably finished");
    }
  },
}));
