import {
  MOVE_BLOCK,
  CHANGE_BLOCK_ORIENTATION,
  SET_BLOCK,
  GENERATE_BLOCKS,
  CLEAR_ROWS
} from "../actions/game";
import {
  generateBlockBag,
  initializeBoardArr,
  updateBlockCoords,
  setBlockStateUpdate
} from "../helpers";

// Okay, so according this this link: https://tetris.fandom.com/wiki/Random_Generator
// 7 tetrominos (one of each) are generated in a random permutation, as if they were drawn out of a bag.
// Giving 5,040 different permutations.
// How would you go about creating such an algorithm?
// I'll implement a naive solution for now to keep progress moving along...
const initialGameState = {
  level: 1,
  score: 0,
  board: initializeBoardArr(),
  currentBlock: generateBlockBag(1),
  nextBlocks: generateBlockBag(7),
  // Maintaining this array is necessary to facilitate
  // rendering the set blocks to the board.
  setBlocks: []
};

export function gameReducer(gameState = initialGameState, { type, payload }) {
  if (type === MOVE_BLOCK) {
    console.log("STATE BEING RETURNED FROM MOVE_BLOCK ACTION: ", gameState);
    return {
      ...gameState,
      currentBlock: payload.block // updateBlockCoords(gameState.board, payload)
    };
  }

  if (type === CHANGE_BLOCK_ORIENTATION) return { ...gameState };
  // SET_BLOCK <- this will trigger clear rows check
  // NOTE:
  // If the gameState.nextBlocks is equal to 1 before setBlockStateUpdate executes,
  // then it will dispatch a GENERATE_BLOCKS action.
  if (type === SET_BLOCK) {
    console.log("gameState.board before setBlockStateUpdate");
    console.log(gameState.board);
    return setBlockStateUpdate(gameState, payload);
  }
  if (type === GENERATE_BLOCKS) return { ...gameState };
  if (type === CLEAR_ROWS) return { ...gameState };
  return gameState;
}

// My first attempt at modeling the board:
// And on Aug 31st, 2019 After some reconsideration...
// this structure will work fine for detecting collision...
// and also to facilitate checking/clearing rows.
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
