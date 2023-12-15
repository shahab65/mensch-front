import { GameType, Piece } from "store/GameState";
import { PieceName } from "../types/index";
import { circularGame } from "./gameMap";
import { COLORS } from "../constants/colors";

const whichOfYourMohreIsHere = (piece: Piece, place: number) => {
  if (piece.m1 === place) return "m1";
  if (piece.m2 === place) return "m2";
  if (piece.m3 === place) return "m3";
  if (piece.m4 === place) return "m4";
  return null;
};

export const movePieceInGame = (
  game: GameType,
  mohreKey: PieceName,
  reservedPlace: number
) => {
  game[game.turn][mohreKey] = reservedPlace;

  const otherColors = circularGame(game).filter(
    (color) => color.color !== game.turn
  );
  otherColors.forEach((piece) => {
    const whichPiece = whichOfYourMohreIsHere(piece, reservedPlace);
    if (whichPiece) {
      game[piece.color][whichPiece] =
        COLORS[piece.color].initialPlaces[whichPiece];
    }
  });
  return game;
};
