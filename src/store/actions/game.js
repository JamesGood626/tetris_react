export const MOVE_BLOCK = "MOVE_BLOCK";
export const CHANGE_BLOCK_ORIENTATION = "CHANGE_BLOCK_ORIENTATION";

export function moveBlockAction({ block, direction }) {
  return {
    type: MOVE_BLOCK,
    payload: {
      block,
      direction
    },
    meta: {
      action: "Move tetromino down, left, or right on the board"
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
