import { MOVE_BLOCK, SET_BLOCK, setBlockAction } from "../actions/game";
import { updateBlockCoords } from "../helpers";

const middleware = ({ dispatch }) => next => action => {
  console.log("the board in the middleware: ", action.payload.board);
  if (action.type === MOVE_BLOCK) {
    const { block, direction } = action.payload;
    console.log("the board in MOVE_BLOCK if statement: ", action.payload.board);
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
    console.log("the board after noCollision check: ", action.payload.board);
    if (noCollision) {
      action.payload.block = updatedBlock;
      console.log(
        "action.payload being passed to the next function: ",
        action.payload
      );
      return next(action);
    } else {
      console.log("Dispatching setBlockAction w/ block: ", block);
      return next(setBlockAction({ block }));
    }
  }

  if (action.type === SET_BLOCK) {
    return next(action);
  }
};

const withinBoardBounds = (row, col) =>
  row >= 0 && row <= 19 && (col >= 0 && col <= 9);

export default middleware;
