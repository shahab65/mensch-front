import React from "react";
import styles from "./circle.module.css";
import { getPosition, circleSize } from "../../utils/getPosition";

const Circle = (props: any) => {
  const { row, column, color = "white" } = props;
  const { left, top } = getPosition(row, column);
  return (
    <div
      className={styles.circle}
      style={{
        width: circleSize,
        height: circleSize,
        top: top,
        left: left,
        background: color,
      }}
    ></div>
  );
};

export default Circle;
