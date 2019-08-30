import {
  MOVE_BLOCK,
  CHANGE_BLOCK_ORIENTATION,
  SET_BLOCK,
  GENERATE_BLOCKS,
  CLEAR_ROWS
} from "../actions/game";
import {
  generateBlockBag,
  initializeBoardObj,
  updateBlockCoords
} from "../helpers";

// Okay, so according this this link: https://tetris.fandom.com/wiki/Random_Generator
// 7 tetrominos (one of each) are generated in a random permutation, as if they were drawn out of a bag.
// Giving 5,040 different permutations.
// How would you go about creating such an algorithm?
// I'll implement a naive solution for now to keep progress moving along...
const initialGameState = {
  level: 1,
  score: 0,
  board: initializeBoardObj(),
  currentBlock: generateBlockBag(1), // TODO: create the randomly generated number thing for choosing next block.
  nextBlocks: generateBlockBag(7),
  // Maintaining this array is necessary to facilitate
  // rendering the set blocks to the board.
  setBlocks: []
};

export function gameReducer(gameState = initialGameState, { type, payload }) {
  if (type === MOVE_BLOCK)
    return {
      ...gameState,
      currentBlock: payload.block // updateBlockCoords(gameState.board, payload)
    };
  if (type === CHANGE_BLOCK_ORIENTATION) return { ...gameState };
  // SET_BLOCK <- this will trigger clear rows check
  if (type === SET_BLOCK) return setBlockStateUpdate(gameState, payload);
  if (type === GENERATE_BLOCKS) return { ...gameState };
  if (type === CLEAR_ROWS) return { ...gameState };
  return gameState;
}

function setBlockStateUpdate(gameState, { block }) {
  const nextBlock = gameState.nextBlocks.shift();
  const rowColKeys = block.map(
    ({ rowIndex, colIndex }) => `row-${rowIndex}_col-${colIndex}`
  );
  console.log("THE ROWCOLKEYS: ", rowColKeys);
  rowColKeys.forEach(key => {
    gameState.board[key] = 1;
    console.log("the key in rowColKeys: ", key);
    console.log("the gameState.board: ", gameState.board);
  });
  return {
    ...gameState,
    currentBlock: nextBlock,
    setBlocks: [...gameState.setBlocks, block]
  };
}

// My first attempt at modeling the board:
// const boardArr = Array(20).fill(Array(10).fill(0));
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
