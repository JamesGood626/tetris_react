import React from "react";
import styled from "styled-components";

const BLOCK_SIZE = "25px";
// colIndex bounded between 0-9
// rowIndex bounded between 0-19

const Block = styled.div`
  position: absolute;
  width: ${BLOCK_SIZE};
  height: ${BLOCK_SIZE};
  background: ${props => props.color};
  left: ${props => `${props.position.colIndex * 25}px`};
  top: ${props => `${props.position.rowIndex * 25}px`};
  box-shadow: inset 0px 0px 1px 1px #444;
`;

function blockColor(type) {
  if (type === "O") return "yellow";
  if (type === "I") return "#66cccc";
  if (type === "S") return "green";
  if (type === "Z") return "red";
  if (type === "L") return "orange";
  if (type === "J") return "blue";
  if (type === "T") return "purple";
}

function boardBlock({ block }) {
  return block.map(({ colIndex, rowIndex, type }) => (
    <Block position={{ colIndex, rowIndex }} color={blockColor(type)} />
  ));
}

export default boardBlock;
