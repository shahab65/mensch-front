import React from "react";
import styles from "../Board/style.module.css";
import blueImg from "assets/images/blue.png";
import { board } from "constants/board";
import {
  getPosition,
  pieceSize,
  pieceSizeLeftMargin,
} from "../../utils/getPosition";
import Piece from "components/Piece";

type Props = {
  homeId: number;
  onClick: () => void;
  color: string;
};
const Mohre = (props: Props) => {
  const { homeId, onClick, color } = props;
  //@ts-ignore
  const home = board[homeId];
  const { left, top } = getPosition(home.row, home.column);

  return (
    <div>
      <Piece
        fill={color}
        className={styles.blue}
        style={{
          width: pieceSize,
          top: top - 10,
          left: left + pieceSizeLeftMargin,
        }}
        onClick={onClick}
      />
    </div>
  );
};

export default Mohre;
