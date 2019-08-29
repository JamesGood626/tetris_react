import { useDispatch } from "react-redux";
import { MOVE_BLOCK, moveBlock } from "../../store/actions/board";

export function useBoardActions() {
  const dispatch = useDispatch();

  const moveBlock = ({ direction = "" }) => {
    dispatch(
      moveBlock({
        payload: {
          direction
        }
      })
    );
  };

  return { moveBlock };
}
