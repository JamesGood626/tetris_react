import { useDispatch } from "react-redux";
import { moveBlockAction } from "../../store/actions/game";

export function useGameActions() {
  const dispatch = useDispatch();

  const moveBlock = ({ board, block, direction = "" }) => {
    console.log("dispatching board: ", board);
    dispatch(
      moveBlockAction({
        board,
        block,
        direction
      })
    );
  };

  return { moveBlock };
}
