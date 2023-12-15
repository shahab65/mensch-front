import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./style.module.css";
import { Colors } from "../../types/index";
import { timerDuration } from "../../constants/game";

interface Props {
  onNoMoveAndTimeFinished: () => void;
  resetKey: string;
}

const Timer = (props: Props) => {
  const { onNoMoveAndTimeFinished, resetKey } = props;

  return (
    <CountdownCircleTimer
      isPlaying={true}
      duration={timerDuration}
      colors={["#43B929", "#43B929", "#ff37a6", "#ff37a6"]}
      colorsTime={[7, 5, 2, 0]}
      size={50}
      strokeWidth={3}
      key={resetKey}
      onComplete={onNoMoveAndTimeFinished}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
};

export default Timer;
