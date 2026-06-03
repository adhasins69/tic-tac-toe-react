import React from "react";

// Square is a reusable presentational component.
// It only receives data and callbacks from parent components via props.
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
