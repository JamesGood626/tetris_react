import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  useGameOver,
  useBoard,
  useCurrentBlock,
  useSetBlocks
} from "../../hooks/queries";
import { useGameActions } from "../../hooks/commands/useGameActions";
import Controls from "../game/controls";
import BoardBlock from "../game/boardBlock";
import SetBlocks from "../game/setBlocks";

// Fix styled components warning:
// backend.js:1 Over 200 classes were generated for component styled.div.
// Consider using the attrs method, together with a style object for frequently changed styles.
// Example:
//   const Component = styled.div.attrs({
//     style: ({ background }) => ({
//       background,
//     }),
//   })`width: 100%;`

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

const dropRates = {
  1: 500,
};

function Game() {
  const [level, setLevel] = useState(1);
  const [delay, setDelay] = useState(true);
  const [dropRate, setDropRate] = useState({
    default: dropRates[1],
    increased: null
  });
  const gameOver = useGameOver();
  const board = useBoard();
  const setBlocks = useSetBlocks();
  const currentBlock = useCurrentBlock();
  const { spawnBlock, moveBlock } = useGameActions();

  useEffect(() => {
    console.log("the dropRate: ", dropRate);
    const interval = setInterval(
      function() {
        // console.log("the board in the setInterval function: ", board);
        if (currentBlock) {
          // NOTE:
          // Delaying for one cycle upon a new tetromino being spawned is part of the tetris spec.
          if (delay) {
            setDelay(false);
          } else {
            moveBlock({
              board,
              block: currentBlock,
              direction: "DOWN"
            });
          }
        } else {
          spawnBlock({ board });
          setDelay(true);
        }
      },
      dropRate.increased ? dropRate.increased : dropRate.default
    );

    return () => {
      // if (dropRate.increased !== null) {
      //   moveBlock({
      //     board,
      //     block: currentBlock,
      //     direction: "DOWN"
      //   });
      // }
      clearInterval(interval);
    };
  }, [level, delay, dropRate, board, currentBlock]);

  const updateDropRate = dropRate => (keyStatus, multiplier = null) => {
    // if (dropRate.increased !== null && keyStatus !== "UP") {
    //   return;
    // }
    if (keyStatus === "UP") {
      console.log("resetting drop rate");
      setDropRate({ ...dropRate, increased: null });
    }
    if (keyStatus === "DOWN") {
      if (dropRate.increased !== null) {
        console.log("new DropRate: ", dropRate.increased * multiplier);
      }
      // console.log("multiplier result: ", dropRate.default * multiplier);
      setDropRate({
        ...dropRate,
        increased: dropRate.increased
          ? dropRate.increased * multiplier
          : dropRate.default * multiplier
      });
    }
  };

  const moveLeft = () => {
    moveBlock({
      board,
      block: currentBlock,
      direction: "LEFT"
    });
  };

  const moveRight = () => {
    moveBlock({
      board,
      block: currentBlock,
      direction: "RIGHT"
    });
  };

  if (gameOver) {
    return <h1>Game Over!</h1>;
  }

  return (
    <>
      <Controls
        updateDropRate={updateDropRate(dropRate)}
        moveLeft={moveLeft}
        moveRight={moveRight}
      />
      <Board>
        <>
          {currentBlock && <BoardBlock block={currentBlock} />}
          {/* SetBlocks is memoized to prevent unnecessary re-renders. */}
          <SetBlocks blocks={setBlocks} />
        </>
      </Board>
    </>
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
