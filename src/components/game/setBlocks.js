import React from "react";
import BoardBlock from "./boardBlock";

function SetBlocks({ blocks }) {
  return <BoardBlock block={blocks} />;
}

export default React.memo(SetBlocks);
