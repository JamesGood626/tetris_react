import { useSelector } from "react-redux";

export function useBoard() {
  return useSelector(state => getTetrominoCoords(state));
}

function getTetrominoCoords({ board }) {
  return board.reduce((acc, row, rowIndex) => {
    row.forEach((block, colIndex) => {
      if (block !== 0) {
        // Mutation for now... will need to refactor it.
        acc.push({ block, rowIndex, colIndex });
      }
    });
    return acc;
  }, []);
}
