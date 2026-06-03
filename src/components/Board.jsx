import React from "react";
import Square from "./Square";

// Board is also a presentational component.
// It displays the 9 cells and forwards clicks to App.
// The winningLine prop tells Board which cells should glow after a win.
function Board({ board, onSquareClick, winningLine }) {
  return (
    <div className="board">
      {board.map((cellValue, index) => (
        <Square
          key={index}
          value={cellValue}
          onClick={() => onSquareClick(index)}
          isWinningSquare={winningLine.includes(index)}
        />
      ))}
    </div>
  );
}

export default Board;
