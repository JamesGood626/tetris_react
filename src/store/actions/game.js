export const MOVE_BLOCK = "MOVE_BLOCK";
export const CHANGE_BLOCK_ORIENTATION = "CHANGE_BLOCK_ORIENTATION";
export const SET_BLOCK = "SET_BLOCK";
export const GENERATE_BLOCKS = "GENERATE_BLOCKS";
export const CLEAR_ROWS = "CLEAR_ROWS";

export function moveBlockAction({ board, block, direction }) {
  return {
    type: MOVE_BLOCK,
    payload: {
      board,
      block,
      direction
    },
    meta: {
      action: "Move tetromino down, left, or right on the board."
    }
  };
}

export function changeBlockOrientationAction({ block }) {
  return {
    type: CHANGE_BLOCK_ORIENTATION,
    payload: {
      block
    },
    meta: {
      action: `Change orientation of tetromino, so long as the orientation change doesn't cause the tetromino
               to go out of the board's bounds, or collide with previously set tetrominos.`
    }
  };
}

export function setBlockAction({ block }) {
  console.log("SET_BLOCK FIRED!");
  return {
    type: SET_BLOCK,
    payload: {
      block
    },
    meta: {
      action: `Set block when no further movement is possible for the user to execute.`
    }
  };
}
