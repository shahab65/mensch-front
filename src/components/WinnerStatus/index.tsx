import React from "react";
import { Colors } from "types";
import styles from "./style.module.css";

interface Props {
  color: Colors;
  rank: number;
}

const WinnerStatus = (props: Props) => {
  const { color, rank } = props;
  let className = styles.yellow;
  if (color === "red") className = styles.red;
  if (color === "blue") className = styles.blue;
  if (color === "green") className = styles.green;
  return (
    <div
      style={{
        position: "absolute",
        background: "#122932",
        width: 50,
        height: 50,
        color: "white",
        borderRadius: "50%",
      }}
      className={"flex-c-c " + className}
    >
      {rank}
    </div>
  );
};

export default WinnerStatus;
