import {
  MOVE_BLOCK,
  SET_BLOCK,
  GENERATE_NEXT_BLOCKS,
  setBlockAction,
  generateNextBlocksAction
} from "../actions/game";
import { updateBlockCoords } from "../helpers";

// uvloop
// TODO:
// Need to handle collision logic for checking gameOver
const middleware = ({ dispatch, getState }) => next => action => {
  if (action.type === MOVE_BLOCK) {
    const { block, direction } = action.payload;
    const [coordKeys, updatedBlock] = updateBlockCoords({
      block,
      direction
    });
    // Still need to check that the move wouldn't cause the block
    // to be outside of board bounds.
    const noCollision = coordKeys.every(({ rowIndex, colIndex }) => {
      if (withinBoardBounds(rowIndex, colIndex)) {
        return action.payload.board[rowIndex][colIndex] === 0;
      } else {
        // This should cover the out of board's bounds check.
        return false;
      }
    });

    if (noCollision) {
      action.payload.block = updatedBlock;
      return next(action);
    } else {
      return dispatch(setBlockAction({ block }));
    }
  }

  if (action.type === SET_BLOCK) {
    const {
      game: { nextBlocks }
    } = getState();
    if (nextBlocks.length === 0) {
      dispatch(generateNextBlocksAction());
    }
    return next(action);
  }

  if (action.type === GENERATE_NEXT_BLOCKS) {
    return next(action);
  }
};

const withinBoardBounds = (row, col) =>
  row >= 0 && row <= 19 && (col >= 0 && col <= 9);

export default middleware;
