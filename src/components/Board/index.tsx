import Circle from "components/Circle";
import React, { useState } from "react";
import styles from "./style.module.css";
import blueImg from "assets/images/blue.png";
import { board } from "constants/board";
import Mohre from "components/Mohre";
import Pieces from "components/ShowPieces";
import PlayerStatus from "components/PlayersStatus";
import { boardWidth, gamePartSize } from "../../utils/getPosition";
import { Socket } from "socket.io-client";
import { GameType } from "../../store/GameState";
import GameBoardRenderer from "components/GameBoardRenderer";

type Props = {
  socket: Socket;
  game: GameType;
  isMyTurn: boolean;
  myColor: string;
  takeMeToNext: (game: GameType) => void;
  setGame: (game: GameType) => void;
};

const Board = ({
  socket,
  game,
  isMyTurn,
  myColor,
  takeMeToNext,
  setGame,
}: Props) => {
  return (
    <div
      style={{ width: boardWidth(), height: boardWidth() }}
      className={styles.board}
    >
      <div
        className="relative"
        style={{
          width: gamePartSize,
          height: gamePartSize,
        }}
      >
        <Pieces
          socket={socket}
          game={game}
          isMyTurn={isMyTurn}
          myColor={myColor}
          takeMeToNext={takeMeToNext}
          setGame={setGame}
        />
        <GameBoardRenderer />
      </div>
      <PlayerStatus />
    </div>
  );
};

export default Board;
