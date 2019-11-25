import { useDispatch } from "react-redux";
import {
  spawnBlockAction,
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

  const spawnBlock = ({ board }) => {
    // console.log("got spawnBlock block: ", board);
    dispatch(spawnBlockAction({ board }));
  };

  const generateNextBlocks = () => {
    dispatch(generateNextBlocksAction());
  };

  return { spawnBlock, moveBlock, generateNextBlocks };
}
