import React from "react";
import Game from "./pages/game";
import S from "../utils";

function App() {
  console.log("you've got S: ", S);
  return (
    <div>
      <h1>Hello Tetris</h1>
      <Game />
    </div>
  );
}

export default App;
