import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useGameState } from "../store/GameState";
import { useUser } from "../store/user";
import Board from "components/Board";
import PlayerInfo from "../components/PlayerInfo";
import { circularGame } from "../utils/gameMap";
import { joinAgora, mute } from "utils/joinAgora";
import Axios from "api/Axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Link } from "react-router-dom";
import UnMute from "components/Icons/UnMute";
import Mute from "components/Icons/Mute";
import Phone from "components/Icons/Phone";
import { share } from "../utils/share";
import { Trans } from "react-i18next";
import { useLocation } from "react-router-dom";

type Props = {
  socket: Socket;
  gameId: string;
};

function GameSocket(props: Props) {
  const { socket, gameId } = props;
  const { game, setGame, takeMeToNext } = useGameState();
  const [username, setUsername] = useState("");
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [isMuteAudio, setIsMuteAudio] = useState(false);
  const location = useLocation();
  console.log({ location });
  const gameAddress = window.location.href + location.pathname;

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {});
      socket.on("game", (game) => {
        setGame(game);
        setUsername(socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server.");
      });
    }
  }, [socket]);
  if (game.status === "initial")
    return (
      <div className="flex-c-c" style={{ flexDirection: "column" }}>
        <h4 className="mb-8">
          <Trans i18nKey="waitingMessage" />
        </h4>
        <PacmanLoader color="#6bd3e0" />
        <p className="p-8">
          <Trans i18nKey="shareLinkInvitation" />
        </p>
        <button className="button mb-8" onClick={() => share(gameAddress)}>
          <Trans i18nKey="share" />
        </button>
      </div>
    );
  if (game.status === "finished")
    return (
      <div>
        <p>بازی به پایان رسیده است</p>
        <Link to="/"> بازگشت به خانه</Link>
      </div>
    );

  const getMyColor = () => {
    const myPiece = circularGame(game).find(
      (color) => color.player === username
    );
    if (myPiece) {
      return myPiece.color;
    }
    return "";
  };
  const myColor = getMyColor();
  const isMyTurn = game.turn === myColor;

  const getAgoraId = () => {
    if (myColor === "yellow") return 1;
    if (myColor === "red") return 2;
    if (myColor === "blue") return 3;
    if (myColor === "green") return 4;
    return Math.floor(Math.random() * 10000) + 1;
  };

  const onJoinAgora = async () => {
    const fakeUid = getAgoraId();
    const res = await Axios.post("/agora", { gameId, userId: fakeUid });
    joinAgora(res.data.token, gameId, fakeUid).then(() => {
      setHasJoinedRoom(true);
    });
  };

  const onMute = () => {
    mute(isMuteAudio);
    setIsMuteAudio((prev) => !prev);
  };

  return (
    <div>
      {hasJoinedRoom ? (
        <button className="button" onClick={onMute}>
          {isMuteAudio ? <Mute /> : <UnMute />}
        </button>
      ) : (
        <button className="button" onClick={onJoinAgora}>
          <Phone />
        </button>
      )}
      {game.status === "active" && (
        <div className="flex-c-c p-8">
          <div className="max-w-600">
            <div className="flex gap-4 mb-4">
              <PlayerInfo
                socket={socket}
                isCurrentPlayer={game.turn === "red"}
                picture={game.red.user.picture}
                name={game.red.user.name}
              />
              <PlayerInfo
                socket={socket}
                isCurrentPlayer={game.turn === "blue"}
                picture={game.blue.user.picture}
                name={game.blue.user.name}
              />
            </div>
            <Board
              socket={socket}
              game={game}
              isMyTurn={isMyTurn}
              myColor={myColor}
              takeMeToNext={takeMeToNext}
              setGame={setGame}
            />
            <div className="flex gap-4 mb-4">
              <PlayerInfo
                socket={socket}
                isCurrentPlayer={game.turn === "yellow"}
                picture={game.yellow.user.picture}
                name={game.yellow.user.name}
              />
              <PlayerInfo
                socket={socket}
                isCurrentPlayer={game.turn === "green"}
                picture={game.green.user.picture}
                name={game.green.user.name}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameSocket;
