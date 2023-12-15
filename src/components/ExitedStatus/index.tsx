import React from "react";
import { Colors } from "types";
import styles from "./style.module.css";

interface Props {
  color: Colors;
}

const ExitedStatus = (props: Props) => {
  const { color } = props;
  let className = styles.yellow;
  if (color === "red") className = styles.red;
  if (color === "blue") className = styles.blue;
  if (color === "green") className = styles.green;
  return (
    <div
      style={{
        position: "absolute",
        background: "#122932",
        width: 70,
        height: 70,
        color: "white",
        borderRadius: "50%",
        zIndex: 1,
      }}
      className={"flex-c-c " + className}
    >
      Exited
    </div>
  );
};

export default ExitedStatus;
