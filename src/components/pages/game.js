import React, { useEffect } from "react";
import styled from "styled-components";
import {
  useGameOver,
  useBoard,
  useCurrentBlock,
  useSetBlocks
} from "../../hooks/queries";
import { useGameActions } from "../../hooks/commands/useGameActions";
import BoardBlock from "../game/boardBlock";

const BOARD_WIDTH = "250px";
const BOARD_HEIGHT = "500px";

const Board = styled.div`
  position: relative;
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
  border: 3px solid #222;

  canvas {
    width: ${BOARD_WIDTH};
    height: ${BOARD_HEIGHT};
  }
`;

function Game() {
  const gameOver = useGameOver();
  const board = useBoard();
  const setBlocks = useSetBlocks();
  const currentBlock = useCurrentBlock();
  const { moveBlock } = useGameActions();

  useEffect(() => {
    const interval = setInterval(function() {
      // console.log("the board in the setInterval function: ", board);
      moveBlock({
        board,
        block: currentBlock,
        direction: "DOWN"
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [board, currentBlock]);

  if (gameOver) {
    return <h1>Game Over!</h1>;
  }

  return (
    <Board>
      <>
        <BoardBlock block={currentBlock} />
        {/*
          TODO: Should create a separate functional component for this
          that way it can be memoized.
        */}
        <BoardBlock block={setBlocks} />
      </>
    </Board>
  );
}
// NOTE:
// Starting to think that the board should be represented as an object...
// Where `${row}_${col}` are the keys, so that when checking if a location is filled
// you can have O(1) access.
// The location will either be a 0 <- representing it's empty
// Or will be a 1.

// And then... to facilitate rendering the set BoardBlocks (since I know how to pass in the
// block (which is an array of objects)) to the BoardBlock component, I can maintain an array
// of the setBlocks, and then just map over them.

// When the block gets set, the board (which is an object w/ keys of `${row}_${col}`) will be
// updated to facilitate checking for non-collisions.

export default Game;
