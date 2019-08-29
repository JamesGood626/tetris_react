export const MOVE_BLOCK = "MOVE_BLOCK";

export function moveBlock({ payload = {} }) {
  return {
    type: MOVE_BLOCK,
    payload,
    meta: {
      action: "Move tetromino down, left, or right on the board"
    }
  };
}
