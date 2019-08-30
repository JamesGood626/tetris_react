// NOTE:
// When sending MOVE_BLOCK actions to the reducer, transformations to the colIndex & rowIndex
// shall be performed on the data structures below.
// The board state will need to be checked against, in particular for these two cases:
// 1. If user is attempting to rotate/move the block left or right, then there should
//    be no collisions with previously set blocks.
// 2. If there's no potential for further downward movement, then an action to SET_BLOCK should
//    be fired off. (I think this will require middleware...)

// NOTE:
// blocks must initially spawn from the pivot point at -> (6, 0)
// (20 is the bottom of the board in my version).
// Since the range for the column is from 0-9, the above coords shall be adjusted to (5, 0)

// TODO:
// Create the functions which will encode the necessary addition/subtraction to change the block's orientation.
export const O_BLOCK = [
  { colIndex: 4, rowIndex: 0, type: "O" },
  { colIndex: 5, rowIndex: 0, type: "O", pivotPoint: true },
  { colIndex: 4, rowIndex: 1, type: "O" },
  { colIndex: 5, rowIndex: 1, type: "O" }
];

export const I_BLOCK = [
  { colIndex: 3, rowIndex: 0, type: "I" },
  { colIndex: 4, rowIndex: 0, type: "I" },
  { colIndex: 5, rowIndex: 0, type: "I", pivotPoint: true },
  { colIndex: 6, rowIndex: 0, type: "I" }
];

export const S_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "S", pivotPoint: true },
  { colIndex: 6, rowIndex: 0, type: "S" },
  { colIndex: 5, rowIndex: 1, type: "S" },
  { colIndex: 4, rowIndex: 1, type: "S" }
];

export const Z_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "Z", pivotPoint: true },
  { colIndex: 4, rowIndex: 0, type: "Z" },
  { colIndex: 5, rowIndex: 1, type: "Z" },
  { colIndex: 6, rowIndex: 1, type: "Z" }
];

export const L_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "L", pivotPoint: true },
  { colIndex: 6, rowIndex: 0, type: "L" },
  { colIndex: 4, rowIndex: 0, type: "L" },
  { colIndex: 4, rowIndex: 1, type: "L" }
];

export const J_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "J", pivotPoint: true },
  { colIndex: 4, rowIndex: 0, type: "J" },
  { colIndex: 6, rowIndex: 0, type: "J" },
  { colIndex: 6, rowIndex: 1, type: "J" }
];

export const T_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "T", pivotPoint: true },
  { colIndex: 4, rowIndex: 0, type: "T" },
  { colIndex: 6, rowIndex: 0, type: "T" },
  { colIndex: 5, rowIndex: 1, type: "T" }
];
