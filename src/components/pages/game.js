import React, { useRef } from "react";
import styled from "styled-components";
import { useBoard } from "../../hooks/queries/useBoard";
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
  // const canvasRef = useRef(null);
  console.log("GOT BOARD: ", board);
  // if (canvasRef.current !== null) {
  //   drawGridLines(canvasRef.current);
  // }
  return (
    <Board>
      {/* <canvas ref={canvasRef} /> */}
      <>
        <BoardBlock block={T_BLOCK} />
        {/* {board.map(({ block, colIndex, rowIndex }) => (
          <BoardBlock
            position={{ colIndex, rowIndex }}
            color={blockColor(block.type)}
          />
        ))} */}
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

// NOTE:
// When sending MOVE_BLOCK actions to the reducer, transformations to the colIndex & rowIndex
// shall be performed on the data structures below.
// The board state will need to be checked against, in particular for these two cases:
// 1. If user is attempting to rotate/move the block left or right, then there should
//    be no collisions with previously set blocks.
// 2. If there's no potential for further downward movement, then an action to SET_BLOCK should
//    be fired off. (I think this will require middleware...)

// NOTE:
// blocks must initially spawn from the pivot point at -> (6, 0)
// (20 is the bottom of the board in my version).
// Since the range for the column is from 0-9, the above coords shall be adjusted to (5, 0)

// TODO:
// Create the functions which will encode the necessary addition/subtraction to change the block's orientation.
const O_BLOCK = [
  { colIndex: 4, rowIndex: 0, type: "O" },
  { colIndex: 5, rowIndex: 0, type: "O", pivotPoint: true },
  { colIndex: 4, rowIndex: 1, type: "O" },
  { colIndex: 5, rowIndex: 1, type: "O" }
];

const I_BLOCK = [
  { colIndex: 3, rowIndex: 0, type: "I" },
  { colIndex: 4, rowIndex: 0, type: "I" },
  { colIndex: 5, rowIndex: 0, type: "I", pivotPoint: true },
  { colIndex: 6, rowIndex: 0, type: "I" }
];

const S_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "S", pivotPoint: true },
  { colIndex: 6, rowIndex: 0, type: "S" },
  { colIndex: 5, rowIndex: 1, type: "S" },
  { colIndex: 4, rowIndex: 1, type: "S" }
];

const Z_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "Z", pivotPoint: true },
  { colIndex: 4, rowIndex: 0, type: "Z" },
  { colIndex: 5, rowIndex: 1, type: "Z" },
  { colIndex: 6, rowIndex: 1, type: "Z" }
];

const L_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "L", pivotPoint: true },
  { colIndex: 6, rowIndex: 0, type: "L" },
  { colIndex: 4, rowIndex: 0, type: "L" },
  { colIndex: 4, rowIndex: 1, type: "L" }
];

const J_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "J", pivotPoint: true },
  { colIndex: 4, rowIndex: 0, type: "J" },
  { colIndex: 6, rowIndex: 0, type: "J" },
  { colIndex: 6, rowIndex: 1, type: "J" }
];

const T_BLOCK = [
  { colIndex: 5, rowIndex: 0, type: "T", pivotPoint: true },
  { colIndex: 4, rowIndex: 0, type: "T" },
  { colIndex: 6, rowIndex: 0, type: "T" },
  { colIndex: 5, rowIndex: 1, type: "T" }
];
