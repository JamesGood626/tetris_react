import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useBoard } from "../../hooks/queries/useBoard";
import { useCurrentBlock } from "../../hooks/queries/useCurrentBlock";
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
  const board = useBoard();
  const currentBlock = useCurrentBlock();
  const { moveBlock } = useGameActions();
  // const canvasRef = useRef(null);
  console.log("GOT BOARD: ", board);
  // if (canvasRef.current !== null) {
  //   drawGridLines(canvasRef.current);
  //
  useEffect(() => {
    console.log("the currentBlock: ", currentBlock);
    console.log("board in useEffect: ", board)
    const interval = setInterval(function() {
      moveBlock({ board, block: currentBlock, direction: "DOWN" });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentBlock]);

  return (
    <Board>
      {/* <canvas ref={canvasRef} /> */}
      <>
        <BoardBlock block={currentBlock} />
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

function drawGridLines(canvas) {
  console.log("got canvas: ", canvas);
  //Always check for properties and methods, to make sure your code doesn't break in other browsers.
  if (canvas.getContext) {
    var context = canvas.getContext("2d");
    context.strokeStyle = "#222222";
    context.lineWidth = 0.2;
    // Reset the current path
    context.beginPath();
    // Staring point
    context.moveTo(0, (canvas.height / 20) * 1);
    // End point
    context.lineTo(canvas.width, (canvas.height / 20) * 1);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(0, (canvas.height / 20) * 2);
    context.lineTo(canvas.width, (canvas.height / 20) * 2);
    context.closePath();
    // Make the line visible
    context.stroke();

    context.beginPath();
    context.moveTo(0, (canvas.height / 20) * 3);
    context.lineTo(canvas.width, (canvas.height / 20) * 3);
    context.closePath();
    context.stroke();
  }
}

export default Game;
