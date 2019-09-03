import { useDispatch } from "react-redux";
import {
  moveBlockAction,
  generateNextBlocksAction
} from "../../store/actions/game";

export function useGameActions() {
  const dispatch = useDispatch();

  const moveBlock = ({ board, block, direction = "" }) => {
    dispatch(
      moveBlockAction({
        board,
        block,
        direction
      })
    );
  };

  const generateNextBlocks = () => {
    dispatch(generateNextBlocksAction());
  };

  return { moveBlock, generateNextBlocks };
}
