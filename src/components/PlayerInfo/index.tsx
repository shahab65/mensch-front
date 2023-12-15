import React from "react";
import Avatar from "react-avatar";

import styles from "./style.module.css";
import { Socket } from "socket.io-client";
import Timer from "components/Timer";
import { useDiceRefreshState } from "../../store/diceRefreshState";
import { useGameState } from "../../store/GameState";

type Props = {
  socket: Socket;
  isCurrentPlayer: boolean;
  name?: string;
  picture?: string;
};

const PlayerInfo = ({ socket, isCurrentPlayer, name, picture }: Props) => {
  const { isDiceValueFresh } = useDiceRefreshState();
  const { game, takeMeToNext } = useGameState();

  const OnExitGame = () => {
    socket.emit("player-timeout");
    takeMeToNext(game);
  };
  return (
    <div className={styles.playerInfo}>
      <div>
        <Avatar
          name={name}
          round={true}
          src={picture}
          size={"60"}
          className={"mb-4"}
        />
        <p className="white fs-12"> {name}</p>
      </div>
      {isCurrentPlayer && (
        <Timer
          resetKey={isDiceValueFresh ? "1" : "2"}
          onNoMoveAndTimeFinished={OnExitGame}
        />
      )}
    </div>
  );
};

export default PlayerInfo;
