export const MOVE_BLOCK = "MOVE_BLOCK";
export const CHANGE_BLOCK_ORIENTATION = "CHANGE_BLOCK_ORIENTATION";
export const SET_BLOCK = "SET_BLOCK";
export const GENERATE_NEXT_BLOCKS = "GENERATE_NEXT_BLOCKS";
export const CLEAR_ROWS = "CLEAR_ROWS";
export const GAME_OVER = "GAME_OVER";

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

export function generateNextBlocksAction() {
  console.log("generateNextBlocksAction invoked");
  return {
    type: GENERATE_NEXT_BLOCKS,
    meta: {
      action: "Generates next blocks when gameState.nextBlocks is equal to 0."
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

export function setGameOver({ gameOver }) {
  return {
    type: GAME_OVER,
    payload: {
      gameOver
    },
    meta: {
      action: "gameOver boolean status to reset or end game."
    }
  };
}
