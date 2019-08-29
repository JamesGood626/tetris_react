import { useDispatch } from "react-redux";
import { moveBlockAction } from "../../store/actions/game";

export function useGameActions() {
  const dispatch = useDispatch();

  const moveBlock = ({ block, direction = "" }) => {
    dispatch(
      moveBlockAction({
        block,
        direction
      })
    );
  };

  return { moveBlock };
}
