import { useSelector } from "react-redux";

// But for moving a block, you should only return the updated block object (the
// object which contains it's board coords)
export function useGameOver() {
  return useSelector(state => state.game.gameOver);
}
