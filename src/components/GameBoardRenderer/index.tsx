import React from "react";
import Circle from "components/Circle";
import { board } from "constants/board";

const GameBoardRenderer = () => {
  return (
    <div>
      {Object.keys(board).map((homeId) => {
        //@ts-ignore
        const home = board[homeId];
        return (
          <Circle
            key={homeId}
            row={home.row}
            column={home.column}
            color={home.color}
          />
        );
      })}
    </div>
  );
};
export default React.memo(GameBoardRenderer);
