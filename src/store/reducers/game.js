import {
  MOVE_BLOCK,
  CHANGE_BLOCK_ORIENTATION,
  SET_BLOCK,
  GENERATE_NEXT_BLOCKS,
  CLEAR_ROWS,
  GAME_OVER
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
  setBlocks: [],
  gameOver: false
};

export function gameReducer(gameState = initialGameState, { type, payload }) {
  if (type === MOVE_BLOCK) {
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
    return setBlockStateUpdate(gameState, payload);
  }
  if (type === GENERATE_NEXT_BLOCKS)
    return { ...gameState, nextBlocks: generateBlockBag(7) };
  if (type === CLEAR_ROWS) return { ...gameState };
  if (type === GAME_OVER) return { ...gameState, gameOver: payload.gameOver };
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
