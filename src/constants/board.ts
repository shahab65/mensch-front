export type Home = {
  row: number; // make this valid
  column: number; // make this valid
  color: string; // white, blue, ...
  next: number; //1, 73?
};
// TODO: declare type for this
export const board = {
  0: {
    row: 10,
    column: 4,
    color: "yellow",
    next: 1,
  },
  1: {
    row: 9,
    column: 4,
    color: "white",
    next: 2,
  },
  2: {
    row: 8,
    column: 4,
    color: "white",
    next: 3,
  },
  3: {
    row: 7,
    column: 4,
    color: "white",
    next: 4,
  },
  4: {
    row: 6,
    column: 4,
    color: "white",
    next: 5,
  },
  5: {
    row: 6,
    column: 3,
    color: "white",
    next: 6,
  },
  6: {
    row: 6,
    column: 2,
    color: "white",
    next: 7,
  },
  7: {
    row: 6,
    column: 1,
    color: "white",
    next: 8,
  },
  8: {
    row: 6,
    column: 0,
    color: "white",
    next: 9,
  },
  9: {
    row: 5,
    column: 0,
    color: "white",
    next: 10,
  },
  10: {
    row: 4,
    column: 0,
    color: "red",
    next: 11,
  },
  11: {
    row: 4,
    column: 1,
    color: "white",
    next: 12,
  },
  12: {
    row: 4,
    column: 2,
    color: "white",
    next: 13,
  },
  13: {
    row: 4,
    column: 3,
    color: "white",
    next: 14,
  },
  14: {
    row: 4,
    column: 4,
    color: "white",
    next: 15,
  },
  15: {
    row: 3,
    column: 4,
    color: "white",
    next: 16,
  },
  16: {
    row: 2,
    column: 4,
    color: "white",
    next: 17,
  },
  17: {
    row: 1,
    column: 4,
    color: "white",
    next: 18,
  },
  18: {
    row: 0,
    column: 4,
    color: "white",
    next: 19,
  },
  19: {
    row: 0,
    column: 5,
    color: "white",
    next: 20,
  },
  20: {
    row: 0,
    column: 6,
    color: "blue",
    next: 21,
  },
  21: {
    row: 1,
    column: 6,
    color: "white",
    next: 22,
  },
  22: {
    row: 2,
    column: 6,
    color: "white",
    next: 23,
  },
  23: {
    row: 3,
    column: 6,
    color: "white",
    next: 24,
  },
  24: {
    row: 4,
    column: 6,
    color: "white",
    next: 25,
  },
  25: {
    row: 4,
    column: 7,
    color: "white",
    next: 26,
  },
  26: {
    row: 4,
    column: 8,
    color: "white",
    next: 27,
  },
  27: {
    row: 4,
    column: 9,
    color: "white",
    next: 28,
  },
  28: {
    row: 4,
    column: 10,
    color: "white",
    next: 29,
  },
  29: {
    row: 5,
    column: 10,
    color: "white",
    next: 30,
  },
  30: {
    row: 6,
    column: 10,
    color: "green",
    next: 31,
  },
  31: {
    row: 6,
    column: 9,
    color: "white",
    next: 32,
  },
  32: {
    row: 6,
    column: 8,
    color: "white",
    next: 33,
  },
  33: {
    row: 6,
    column: 7,
    color: "white",
    next: 34,
  },
  34: {
    row: 6,
    column: 6,
    color: "white",
    next: 35,
  },
  35: {
    row: 7,
    column: 6,
    color: "white",
    next: 36,
  },
  36: {
    row: 8,
    column: 6,
    color: "white",
    next: 37,
  },
  37: {
    row: 9,
    column: 6,
    color: "white",
    next: 38,
  },
  38: {
    row: 10,
    column: 6,
    color: "white",
    next: 39,
  },
  39: {
    row: 10,
    column: 5,
    color: "white",
    next: 0,
  },
  // yellow target houses
  40: {
    row: 9,
    column: 5,
    color: "yellow",
    next: 41,
  },
  41: {
    row: 8,
    column: 5,
    color: "yellow",
    next: 42,
  },
  42: {
    row: 7,
    column: 5,
    color: "yellow",
    next: 43,
  },
  43: {
    row: 6,
    column: 5,
    color: "yellow",
    next: null,
  },
  // red target houses
  44: {
    row: 5,
    column: 1,
    color: "red",
    next: 45,
  },
  45: {
    row: 5,
    column: 2,
    color: "red",
    next: 46,
  },
  46: {
    row: 5,
    column: 3,
    color: "red",
    next: 47,
  },
  47: {
    row: 5,
    column: 4,
    color: "red",
    next: null,
  },
  // blue houses
  48: {
    row: 1,
    column: 5,
    color: "blue",
    next: 49,
  },
  49: {
    row: 2,
    column: 5,
    color: "blue",
    next: 50,
  },
  50: {
    row: 3,
    column: 5,
    color: "blue",
    next: 51,
  },
  51: {
    row: 4,
    column: 5,
    color: "blue",
    next: null,
  },
  // green houses
  52: {
    row: 5,
    column: 9,
    color: "green",
    next: 53,
  },
  53: {
    row: 5,
    column: 8,
    color: "green",
    next: 54,
  },
  54: {
    row: 5,
    column: 7,
    color: "green",
    next: 55,
  },
  55: {
    row: 5,
    column: 6,
    color: "green",
    next: null,
  },
  // yellow start houses
  56: {
    row: 9,
    column: 0,
    color: "yellow",
    next: 0,
  },
  57: {
    row: 9,
    column: 1,
    color: "yellow",
    next: 0,
  },
  58: {
    row: 10,
    column: 0,
    color: "yellow",
    next: 0,
  },
  59: {
    row: 10,
    column: 1,
    color: "yellow",
    next: 0,
  },
  // red start houses
  60: {
    row: 0,
    column: 0,
    color: "red",
    next: 10,
  },
  61: {
    row: 0,
    column: 1,
    color: "red",
    next: 10,
  },
  62: {
    row: 1,
    column: 0,
    color: "red",
    next: 10,
  },
  63: {
    row: 1,
    column: 1,
    color: "red",
    next: 10,
  },
  // blue start houses
  64: {
    row: 0,
    column: 9,
    color: "blue",
    next: 20,
  },
  65: {
    row: 0,
    column: 10,
    color: "blue",
    next: 20,
  },
  66: {
    row: 1,
    column: 9,
    color: "blue",
    next: 20,
  },
  67: {
    row: 1,
    column: 10,
    color: "blue",
    next: 20,
  },
  // green start houses
  68: {
    row: 9,
    column: 9,
    color: "green",
    next: 30,
  },
  69: {
    row: 9,
    column: 10,
    color: "green",
    next: 30,
  },
  70: {
    row: 10,
    column: 9,
    color: "green",
    next: 30,
  },
  71: {
    row: 10,
    column: 10,
    color: "green",
    next: 30,
  },
};
