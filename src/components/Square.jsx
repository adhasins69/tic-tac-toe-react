import React from "react";

// Square is a reusable presentational component.
// It only receives data and callbacks from parent components via props.
// isWinningSquare lets the UI add a special glowing style after a player wins.
function Square({ value, onClick, isWinningSquare }) {
  return (
    <button
      className={isWinningSquare ? "square winning-square" : "square"}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
