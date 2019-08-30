import { MOVE_BLOCK, SET_BLOCK, setBlockAction } from "../actions/game";
import { updateBlockCoords } from "../helpers";

const middleware = ({ dispatch }) => next => action => {
  if (action.type === MOVE_BLOCK) {
    const { board, block, direction } = action.payload;
    const [coordKeys, updatedBlock] = updateBlockCoords({
      block,
      direction
    });
    // Still need to check that the move wouldn't cause the block
    // to be outside of board bounds.
    const noCollision = coordKeys.every(rowColKey => {
      if (board.hasOwnProperty(rowColKey)) {
        return board[rowColKey] === 0;
      } else {
        // This should cover the out of board's bounds check.
        return false;
      }
    });
    if (noCollision) {
      action.payload.block = updatedBlock;
      next(action);
    } else {
      console.log("Dispatching setBlockAction w/ block: ", block);
      dispatch(setBlockAction({ block }));
    }
  }

  if (action.type === SET_BLOCK) {
    next(action);
  }
};

export default middleware;
