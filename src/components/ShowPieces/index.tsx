import React, { useEffect } from "react";
import ShowPieces from "components/ShowPieces/Pieces";
import { useState, useRef } from "react";
import Dice from "react-dice-roll";
import { getRandomNumber } from "../../utils/getRandomNumber";
import { useTurn } from "hooks";
import ShowDice from "components/ShowDice";
import {
  Colors,
  DiceNumbers,
  PlayerStatus,
  PieceName,
} from "../../types/index";
import { usePlayers } from "../../store/players";
import gameFinishSound from "../../assets/sounds/finished-game.wav";
import Timer from "components/Timer";
import { useGameState, GameType } from "../../store/GameState";
import { Socket } from "socket.io-client";
import { getPositions } from "../../utils/gameMap";
import { movePieceInGame } from "../../utils/movePieceInGame";
import { useDiceRefreshState } from "../../store/diceRefreshState";
import { useDiceValueState } from "../../store/diceValueState";

const defaultBlueMohrePlaces = {
  m1: 64,
  m2: 65,
  m3: 66,
  m4: 67,
};

const defaultGreenMohrePlaces = {
  m1: 68,
  m2: 69,
  m3: 70,
  m4: 71,
};
const defaultRedMohrePlaces = {
  m1: 60,
  m2: 61,
  m3: 62,
  m4: 63,
};
const defaultYellowMohrePlaces = {
  m1: 56,
  m2: 57,
  m3: 58,
  m4: 59,
};

type Props = {
  socket: Socket;
  game: GameType;
  isMyTurn: boolean;
  myColor: string;
  takeMeToNext: (game: GameType) => void;
  setGame: (game: GameType) => void;
};

const Pieces = (props: Props) => {
  const { socket, game, isMyTurn, myColor, takeMeToNext, setGame } = props;
  const turn = useGameState((state) => state.game.turn);

  const { blues, greens, yellows, reds } = getPositions(game);
  const { diceValue, setDiceValue } = useDiceValueState();
  const { isDiceValueFresh, setIsDiceValueFresh } = useDiceRefreshState();
  console.log("isDiceValueFresh", isDiceValueFresh);
  // const { goNext } = useTurn();
  const finish = usePlayers((state) => state.finish);
  const exit = usePlayers((state) => state.exit);
  const players = usePlayers((state) => state.players);

  const timeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => clearTimeout(timeout.current as NodeJS.Timeout);
  }, []);

  useEffect(() => {
    if (isMyTurn) {
      setIsDiceValueFresh(false);
    }
  }, [isMyTurn]);

  const onFinishGame = (color: Colors) => {
    const s = new Audio(gameFinishSound);
    s.play();
    finish(color);
  };

  const onNoPlaceToGoAfterRollingDice = () => {
    setTimeout(() => {
      setIsDiceValueFresh(false);
      if (diceValue !== 6) {
        takeMeToNext(game);

        socket.emit("go_next");
      }
    }, 1000);
  };

  const onMove = (mohreKey: PieceName, reservedPlace: number) => {
    setIsDiceValueFresh(false);
    const updatedGame = movePieceInGame(game, mohreKey, reservedPlace);
    if (diceValue !== 6) {
      takeMeToNext(updatedGame);
    } else {
      setGame(updatedGame);
    }
    // onGoNext();
  };
  const getReservedHouses = () => {
    const reserved: number[] = [];
    Object.keys(yellows).forEach((k) => {
      //@ts-ignore
      if (yellows[k] === 0) {
        reserved.push(0);
      }
    });
    Object.keys(reds).forEach((k) => {
      //@ts-ignore
      if (reds[k] === 10) {
        reserved.push(10);
      }
    });
    Object.keys(blues).forEach((k) => {
      //@ts-ignore
      if (blues[k] === 20) {
        reserved.push(20);
      }
    });
    Object.keys(greens).forEach((k) => {
      //@ts-ignore
      if (greens[k] === 30) {
        reserved.push(30);
      }
    });
    return reserved;
  };
  const reservedHouses = getReservedHouses();
  const onSetDiceValue = (value: DiceNumbers) => {
    socket.emit("dice_roll", value);
    setDiceValue(value);
  };
  const isGameFinished =
    players.filter((p) => p.status === PlayerStatus.Playing).length <= 1
      ? true
      : false;

  useEffect(() => {
    if (isGameFinished) {
      const remainedPlayer = players.find(
        (p) => p.status === PlayerStatus.Playing
      );
      if (remainedPlayer) {
        onFinishGame(remainedPlayer.color);
      }
    }
  }, [isGameFinished]);

  const isPlayerOutOfGame = (color: Colors) => {
    return game[color].status === "not_taken";
  };
  if (isGameFinished) return null;
  return (
    <div>
      <ShowDice
        diceValue={diceValue}
        onSetDiceValue={onSetDiceValue}
        turn={turn}
        setIsDiceValueFresh={setIsDiceValueFresh}
        isDiceValueFresh={isDiceValueFresh}
        game={game}
        isMyTurn={isMyTurn}
      />

      {!isPlayerOutOfGame("blue") && (
        <ShowPieces
          places={blues}
          defaultPlaces={defaultBlueMohrePlaces}
          color="blue"
          onMove={onMove}
          reservedHouses={reservedHouses}
          diceValue={diceValue}
          isMyTurn={isMyTurn}
          startHomeId={20}
          isDiceValueFresh={isDiceValueFresh}
          onNoPlaceToGoAfterRollingDice={onNoPlaceToGoAfterRollingDice}
          lastWhiteHomeId={19}
          firstTargetHomeId={48}
          socket={socket}
          myColor={myColor}
        />
      )}
      {!isPlayerOutOfGame("green") && (
        <ShowPieces
          defaultPlaces={defaultGreenMohrePlaces}
          places={greens}
          color="green"
          onMove={onMove}
          reservedHouses={reservedHouses}
          diceValue={diceValue}
          isMyTurn={isMyTurn}
          startHomeId={30}
          isDiceValueFresh={isDiceValueFresh}
          onNoPlaceToGoAfterRollingDice={onNoPlaceToGoAfterRollingDice}
          lastWhiteHomeId={29}
          firstTargetHomeId={52}
          socket={socket}
          myColor={myColor}
        />
      )}
      {!isPlayerOutOfGame("red") && (
        <ShowPieces
          defaultPlaces={defaultRedMohrePlaces}
          places={reds}
          color="red"
          onMove={onMove}
          reservedHouses={reservedHouses}
          diceValue={diceValue}
          isMyTurn={isMyTurn}
          startHomeId={10}
          isDiceValueFresh={isDiceValueFresh}
          onNoPlaceToGoAfterRollingDice={onNoPlaceToGoAfterRollingDice}
          lastWhiteHomeId={9}
          firstTargetHomeId={44}
          socket={socket}
          myColor={myColor}
        />
      )}
      {!isPlayerOutOfGame("yellow") && (
        <ShowPieces
          defaultPlaces={defaultYellowMohrePlaces}
          places={yellows}
          color="yellow"
          onMove={onMove}
          reservedHouses={reservedHouses}
          diceValue={diceValue}
          isMyTurn={isMyTurn}
          startHomeId={0}
          isDiceValueFresh={isDiceValueFresh}
          onNoPlaceToGoAfterRollingDice={onNoPlaceToGoAfterRollingDice}
          lastWhiteHomeId={39}
          firstTargetHomeId={40}
          socket={socket}
          myColor={myColor}
        />
      )}
    </div>
  );
};

export default Pieces;
