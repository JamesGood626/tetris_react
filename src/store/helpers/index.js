import {
  O_BLOCK,
  T_BLOCK,
  S_BLOCK,
  Z_BLOCK,
  L_BLOCK,
  J_BLOCK,
  I_BLOCK
} from "./blocks";

// deprecated for now...
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

export function initializeBoardArr() {
  // 0 - 9 representative of 10 columns
  // 0 - 19 representative of 20 rows
  return Array(20).fill(Array(10).fill(0));
}

export function generateBlockBag(amount) {
  if (amount === 1) return L_BLOCK;
  return [O_BLOCK, T_BLOCK, S_BLOCK, L_BLOCK, I_BLOCK, Z_BLOCK, J_BLOCK];
}

// (then check to ensure no collision before finalizing the state to be returned from the reducer)
export function updateBlockCoords({ block, direction }) {
  const operation = generateShiftOperation(direction);
  return block.reduce(
    (acc, unit) => {
      const updatedCoords = operation(unit);
      acc[0] = [
        ...acc[0],
        { rowIndex: updatedCoords.rowIndex, colIndex: updatedCoords.colIndex }
      ];
      acc[1] = [...acc[1], updatedCoords];
      return acc;
    },
    [[], []]
  );
}

// TODO: Should I fire off the CHECK_ROWS here?...
//       or do it right after the dispatch of SET_BLOCK that occurs
//       in the middleware?... How would I trigger the flash disappear animation
//       if I really cared about such a detail...?
export function setBlockStateUpdate(gameState, { block }) {
  console.log("SET BLOCK STATE UPDATE CALLED");
  const nextBlock = gameState.nextBlocks.shift();
  // BUG:
  // block.forEach(({ rowIndex, colIndex }) => {
  //   console.log(`rowIndex: ${rowIndex} && colIndex: ${colIndex}`);
  //   This line is the problem. You can modify the row, but attempting
  //   to update the column value in this manner causes the really strange
  //   bug... where the board is mutated before this function is ever invoked...
  //   gameState.board[rowIndex][colIndex] = 1;
  // });

  // If gameState.nextBlocks === 0
  // dispatch GENERATE_BLOCKS...
  // Really, handling this inside of middleware would've been the ideal solution... but
  // this is the best that can be done for now.

  return {
    ...gameState,
    board: updateBoard(gameState.board, block),
    currentBlock: nextBlock,
    setBlocks: [...gameState.setBlocks, ...block]
  };
}

function updateBoard(board, block) {
  const newBoard = [...board];
  block.forEach(({ rowIndex, colIndex }) => {
    // This has fixed the bug above. See comment annotated w/ BUG
    newBoard[rowIndex] = [
      ...newBoard[rowIndex].slice(0, colIndex),
      1,
      ...newBoard[rowIndex].slice(colIndex + 1)
    ];
  });
  return newBoard;
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
