import { useSelector } from "react-redux";

// TODO:
// You'll only need to regrab all of the game state after a block has
// been set (because the board object will have been updated)
// But for moving a block, you should only return the updated block object (the
// object which contains it's board coords)
export function useBoard() {
  return useSelector(state => {
    // console.log("the board in the useBoard function: ", state.game.board);
    return state.game.board;
  });
}

// Was using for the array of arrays board setup... but w/ object this
// is no longer necessary
// function getTetrominoCoords({ board }) {
//   return board.reduce((acc, row, rowIndex) => {
//     row.forEach((block, colIndex) => {
//       if (block !== 0) {
//         // Mutation for now... will need to refactor it.
//         acc.push({ block, rowIndex, colIndex });
//       }
//     });
//     return acc;
//   }, []);
// }
