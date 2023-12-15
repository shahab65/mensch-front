export const boardWidth = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 600) return 600;
  return window.innerWidth;
};

const calculateCircleSize = () => {
  const boardSize = boardWidth();
  if (boardSize < 330) return 22;
  if (boardSize < 350) return 25;
  if (boardSize < 600) return 30;
  return 30;
};

const calculatePieceSize = () => {
  const boardSize = boardWidth();
  if (boardSize < 330) return 20;
  if (boardSize < 350) return 23;
  if (boardSize < 600) return 25;
  return 25;
};
export const circleSize = calculateCircleSize();
export const pieceSize = calculatePieceSize();
export const pieceSizeLeftMargin = circleSize - pieceSize;

const spaceBetweenHomeSteps = 5;
export const diceSize = window.innerWidth < 600 ? 31 : 51;
const deviceWidth = window.innerWidth < 600 ? window.innerWidth : 600;
const Square = circleSize + spaceBetweenHomeSteps;
export const gamePartSize = Square * 11;
// const setting = (deviceWidth - test * 11) / 2;
const setting = 0;

export const getPosition = (row: number, column: number) => {
  //TODO: this calculation can be moved to better place
  const top = row * Square + setting;
  const left = column * Square + setting;
  return { left, top };
};
