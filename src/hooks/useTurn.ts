import { useState } from "react";
import { Player, PlayerStatus, Colors } from "../types/index";
import { usePlayers } from "../store/players";

export const turns = {
  yellow: "red",
  red: "blue",
  blue: "green",
  green: "yellow",
};

export const useTurn = () => {
  const players = usePlayers((state) => state.players);

  const [turn, setTurn] = useState<Colors>("yellow");

  const getNextTurn = (possibleNext: Colors): Colors => {
    const possibleNextPlayer = players.find(
      (p) => p.color === possibleNext
    ) as Player;
    if (possibleNextPlayer.status === PlayerStatus.Playing) return possibleNext;
    //@ts-ignore
    return getNextTurn(turns[possibleNext]);
  };
  const goNext = () => {
    //@ts-ignore
    const n = getNextTurn(turns[turn]);
    //@ts-ignore
    setTurn(n);
  };

  return {
    turn: players.find((p) => p.color === turn) as Player,
    goNext: goNext,
  };
};
