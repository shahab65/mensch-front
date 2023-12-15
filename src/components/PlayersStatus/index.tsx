import WinnerStatus from "components/WinnerStatus";
import ExitedStatus from "components/ExitedStatus";
import React from "react";
import { usePlayers } from "../../store/players";
import { PlayerStatus } from "../../types/index";

const ShowPlayerStatus = () => {
  const players = usePlayers((state) => state.players);
  const winners = usePlayers((state) => state.winners);
  return (
    <div>
      {winners.map((winner, index) => (
        <WinnerStatus key={winner} color={winner} rank={index + 1} />
      ))}
      {players
        .filter((p) => p.status === PlayerStatus.Exited)
        .map((player, index) => (
          <ExitedStatus key={index} color={player.color} />
        ))}
    </div>
  );
};

export default ShowPlayerStatus;
