import { create } from "zustand";
import { Player, PlayerStatus, Colors } from "../types/index";

const players: Player[] = [
  {
    color: "yellow",
    status: PlayerStatus.Playing,
  },
  {
    color: "red",
    status: PlayerStatus.Playing,
  },
  {
    color: "blue",
    status: PlayerStatus.Playing,
  },
  {
    color: "green",
    status: PlayerStatus.Playing,
  },
];

interface PlayerState {
  players: Player[];
  finish: (color: Colors) => void;
  exit: (color: Colors) => void;
  winners: Colors[];
}

export const usePlayers = create<PlayerState>((set) => ({
  players: players,
  winners: [],
  finish: (color: Colors) =>
    set((state) => {
      const players = state.players.filter((p) => p.color !== color);
      players.push({ color: color, status: PlayerStatus.Finished });
      return { players: players, winners: [...state.winners, color] };
    }),
  exit: (color: Colors) =>
    set((state) => {
      const players = state.players.filter((p) => p.color !== color);
      players.push({ color: color, status: PlayerStatus.Exited });
      return { players: players };
    }),
}));
