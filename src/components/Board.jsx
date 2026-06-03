import React from "react";
import Square from "./Square";

// Board is also a presentational component.
// It displays the 9 cells and forwards clicks to App.
function Board({ board, onSquareClick }) {
  return (
    <div className="board">
      {board.map((cellValue, index) => (
        <Square
          key={index}
          value={cellValue}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;
