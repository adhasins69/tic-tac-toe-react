import React, { useState } from "react";
import Board from "./components/Board";

// Keep player symbols in constants so they are easy to change later.
const PLAYER_X = "X";
const PLAYER_O = "O";

function App() {
  // React component structure:
  // App (logic + state) -> Board (layout) -> Square (single cell).

  // useState stores the board as an array of 9 cells.
  // Each cell is either null, PLAYER_X, or PLAYER_O.
  const [board, setBoard] = useState(Array(9).fill(null));

  // Track whose turn it is.
  // true means X turn, false means O turn.
  const [isXTurn, setIsXTurn] = useState(true);

  // Winner check:
  // Returns PLAYER_X / PLAYER_O when there is a winning line, otherwise null.
  function getWinner(currentBoard) {
    const winningLines = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningLines) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  }

  const winner = getWinner(board);

  // Draw / tie detection:
  // A draw means all cells are filled and no winner exists.
  const isDraw = board.every((cell) => cell !== null) && !winner;

  // Clicking a square updates the board.
  function handleSquareClick(index) {
    // Prevent invalid moves:
    // 1) If this square is already filled
    // 2) If game already has a winner
    if (board[index] || winner) return;

    // Create a new array copy instead of mutating state directly.
    const nextBoard = [...board];

    // Place the current player's symbol in the clicked square.
    nextBoard[index] = isXTurn ? PLAYER_X : PLAYER_O;

    // Update state:
    // state -> user click -> update state -> check winner -> re-render UI.
    setBoard(nextBoard);
    setIsXTurn(!isXTurn);
  }

  // Reset game:
  // Put everything back to initial values.
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  // Decide what status text to show.
  let statusText = `Current turn: ${isXTurn ? PLAYER_X : PLAYER_O}`;
  if (winner) statusText = `Winner: ${winner}`;
  if (isDraw) statusText = "It's a draw!";

  // React re-renders this UI automatically whenever state changes.
  return (
    <main className="app">
      <h1>Tic Tac Toe</h1>
      <p className="status">{statusText}</p>

      <Board board={board} onSquareClick={handleSquareClick} />

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </main>
  );
}

export default App;
