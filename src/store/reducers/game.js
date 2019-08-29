import { MOVE_BLOCK } from "../actions/game";

// const boardArr = Array(20).fill(Array(10).fill(0));
const initialGameState = {
  board: initializeBoardObj(),
  currentBlock: null // TODO: create the randomly generated number thing for choosing next block.
};

function initializeBoardObj() {
  // 0 - 19 representative of 20
  const ROWS = 19;
  // 0 - 9 representative of 10
  const COLUMNS = 9;
  const board = {};
  for (let row = 0; row <= ROWS; row++) {
    for (let col = 0; col <= COLUMNS; col++) {
      board[`row-${row}_col-${col}`] = 0;
    }
  }
  return board;
}

export function gameReducer(gameState = initialGameState, { type, payload }) {
  if (type === MOVE_BLOCK)
    return {
      ...gameState,
      currentBlock: updateBlockCoords(gameState.board, payload)
    };
  // Future actions to add:
  // SET_BLOCK <- this will trigger clear rows check
  return gameState;
}

// const O_BLOCK = [
//   { colIndex: 4, rowIndex: 0, type: "O" },
//   { colIndex: 5, rowIndex: 0, type: "O", pivotPoint: true },
//   { colIndex: 4, rowIndex: 1, type: "O" },
//   { colIndex: 5, rowIndex: 1, type: "O" }
// ];
// When direction === "DOWN" -> Add 1 to each object in the array's rowIndex
// When direction === "LEFT" -> Subtract 1 to each object in the array's colIndex
// When direction === "RIGHT" -> Add 1 to each object in the array's colIndex
// (then check to ensure no collision before finalizing the state to be returned from the reducer)
function updateBlockCoords(board, { block, direction }) {
  const operation = generateShiftOperation(direction);
  return block.map(unit => operation(unit));
}

// NOTE:
// This should really be happening in middleware... because
// if it's not possible to move the block further down, then you'll want to
// not finish this action, but instead fire off the SET_BLOCK action.
// If it is valid, then and only then, should the updated block object reach the
// reducer to be returned as the newly updated state.
function generateShiftOperation(direction) {
  if (direction === "DOWN")
    return obj => ({ ...obj, rowIndex: obj.rowIndex + 1 });
  if (direction === "LEFT")
    return obj => ({ ...obj, colIndex: obj.colIndex - 1 });
  if (direction === "RIGHT")
    return obj => ({ ...obj, colIndex: obj.colIndex + 1 });
}

// My first attempt at modeling the board:
// const boardArr = [
//   [
//     0,
//     0,
//     0,
//     { type: "L" },
//     { type: "L" },
//     { type: "L" },
//     { type: "L" },
//     0,
//     0,
//     0
//   ],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];
