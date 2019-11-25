import React, { useEffect } from "react";
import { useGameActions } from "../../hooks/commands/useGameActions";

const SPACE = "Space";
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";

const MULTIPLIER = 0.5;

// TODO:
// Use keyup to know when to change drop rate speed back to the default speed
// upon letting go of the down arrow.

// ARROW_UP rotates tetromino (rotates in a clockwise manner)
// ARROW_DOWN speeds up the drop rate (by what factor? think scalar)
const handleKeyDown = controls => e => controls[e.code]();
const handleKeyUp = updateDropRate => e => {
  if (e.code === "ArrowDown") {
    console.log("calling updateDropRate with UP");
    updateDropRate("UP");
  }
};

export default function Controls({ updateDropRate, moveLeft, moveRight }) {
  const gameActions = useGameActions();
  const controls = {
    Space: function() {
      console.log("running space action");
    },
    ArrowUp: function() {
      console.log("running arrow_up action");
    },
    ArrowDown: () => updateDropRate("DOWN", MULTIPLIER),
    ArrowLeft: moveLeft,
    ArrowRight: moveRight
  };

  const keyUpHandler = handleKeyUp(updateDropRate);
  const keyDownHandler = handleKeyDown(controls);

  useEffect(() => {
    window.addEventListener("keyup", keyUpHandler);
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keyup", keyUpHandler);
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [updateDropRate, moveLeft, moveRight]);

  return null;
}
