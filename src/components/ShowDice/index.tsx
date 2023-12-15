import React, { useEffect, useRef } from "react";
import Dice from "react-dice-roll";

import diceRollingSound from "../../assets/sounds/dice-roll-on-wood.mp3";
import { DiceNumbers, Colors } from "../../types/index";
import { diceSize, getPosition } from "../../utils/getPosition";
import { GameType } from "../../store/GameState";

type TDiceRef = {
  rollDice: (value: DiceNumbers) => void;
};

type Props = {
  diceValue: DiceNumbers;
  onSetDiceValue: (value: DiceNumbers) => void;
  turn: Colors;
  setIsDiceValueFresh: any;
  isDiceValueFresh: boolean;
  game: GameType;
  isMyTurn: boolean;
};

const getRowAndColumnForDice = (turn: Colors) => {
  if (turn === "yellow") return { row: 10, column: 2 };
  if (turn === "red") return { row: 2, column: 0 };
  if (turn === "blue") return { row: 0, column: 7 };
  return { row: 7, column: 10 };
};

const ShowDice = (props: Props) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const diceRef = React.useRef<TDiceRef>(null);
  useEffect(() => {
    return () => clearTimeout(timeout.current as NodeJS.Timeout);
  }, []);
  const {
    diceValue,
    onSetDiceValue,
    turn,
    setIsDiceValueFresh,
    isDiceValueFresh,
    game,
    isMyTurn,
  } = props;

  const place = getRowAndColumnForDice(turn);
  const { left, top } = getPosition(place.row, place.column);

  useEffect(() => {
    if (game.diceRoll && !isMyTurn) {
      diceRef.current?.rollDice(game.diceRoll);
    }
  }, [game.diceRoll]);
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
      }}
    >
      <Dice
        ref={diceRef}
        onRoll={(value) => {
          if (isMyTurn) {
            setIsDiceValueFresh(true);
            onSetDiceValue(value);
          }
        }}
        rollingTime={1000}
        defaultValue={diceValue}
        size={diceSize}
        sound={diceRollingSound}
        disabled={!isMyTurn || isDiceValueFresh}
        // cheatValue={6}
        // faces={["https://www.w3schools.com/html/pic_trulli.jpg"]}
      />
    </div>
  );
};

export default ShowDice;
