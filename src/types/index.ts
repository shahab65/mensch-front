export type DiceNumbers = 1 | 2 | 3 | 4 | 5 | 6;
export type Colors = "yellow" | "red" | "blue" | "green";

//player
// type PlayerStatus = "playing" | "exited" | "finished";
export enum PlayerStatus {
  Playing = "playing",
  Exited = "exited",
  Finished = "finished",
}
export type Player = { color: Colors; status: PlayerStatus };

export type GameStatus = "initial" | "active" | "finished";

export type PieceName = "m1" | "m2" | "m3" | "m4";
