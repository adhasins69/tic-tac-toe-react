import React, { useState } from "react";
import Board from "./components/Board";

// Keep symbol choices in one place so the UI is easy to update later.
// To add more shapes, add another string into this array.
const SYMBOL_OPTIONS = ["X", "O", "★", "◆", "●", "▲"];

// Default symbols used when the game first loads.
const DEFAULT_PLAYER_ONE_SYMBOL = "X";
const DEFAULT_PLAYER_TWO_SYMBOL = "O";

function App() {
  // React component structure:
  // App (logic + state) -> Board (layout) -> Square (single cell).

  // useState stores the board as an array of 9 cells.
  // Each cell is either null or one of the selected player symbols.
  const [board, setBoard] = useState(Array(9).fill(null));

  // Track whose turn it is.
  // true means Player 1 turn, false means Player 2 turn.
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);

  // These states store the symbols chosen by each player.
  // This makes the game more interactive because players can pick their shape.
  const [playerOneSymbol, setPlayerOneSymbol] = useState(DEFAULT_PLAYER_ONE_SYMBOL);
  const [playerTwoSymbol, setPlayerTwoSymbol] = useState(DEFAULT_PLAYER_TWO_SYMBOL);

  // Winner check:
  // Returns both the winner and the exact winning line.
  // The winning line is needed so the UI can highlight the winning squares.
  function getWinnerInfo(currentBoard) {
    const winningLines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6], // diagonal top-right to bottom-left
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;

      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return {
          winner: currentBoard[a],
          winningLine: line,
        };
      }
    }

    return {
      winner: null,
      winningLine: [],
    };
  }

  const { winner, winningLine } = getWinnerInfo(board);

  // Draw / tie detection:
  // A draw means all cells are filled and no winner exists.
  const isDraw = board.every((cell) => cell !== null) && !winner;

  // Work out which symbol should be placed on the next valid click.
  const currentSymbol = isPlayerOneTurn ? playerOneSymbol : playerTwoSymbol;

  // Decide what status text to show.
  let statusText = `Player ${isPlayerOneTurn ? "1" : "2"} turn: ${currentSymbol}`;
  if (winner) statusText = `Congratulations! ${winner} wins the game!`;
  if (isDraw) statusText = "It's a draw! Great battle!";

  // Clicking a square updates the board.
  function handleSquareClick(index) {
    // Prevent invalid moves:
    // 1) If this square is already filled
    // 2) If game already has a winner
    if (board[index] || winner) return;

    // Create a new array copy instead of mutating state directly.
    const nextBoard = [...board];

    // Place the current player's selected symbol in the clicked square.
    nextBoard[index] = currentSymbol;

    // Update state:
    // state -> user click -> update state -> check winner -> re-render UI.
    setBoard(nextBoard);
    setIsPlayerOneTurn(!isPlayerOneTurn);
  }

  // Reset game:
  // Put everything back to initial board values but keep the selected symbols.
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(true);
  }

  // Change the selected shape for Player 1 or Player 2.
  function handleSymbolChange(playerNumber, newSymbol) {
    // Prevent both players from using the same symbol.
    // If both were the same, the game would be hard to understand.
    if (playerNumber === 1 && newSymbol === playerTwoSymbol) return;
    if (playerNumber === 2 && newSymbol === playerOneSymbol) return;

    if (playerNumber === 1) {
      setPlayerOneSymbol(newSymbol);
    } else {
      setPlayerTwoSymbol(newSymbol);
    }

    // Reset the board after changing symbols so old and new shapes do not mix.
    resetGame();
  }

  // React re-renders this UI automatically whenever state changes.
  return (
    <main className="app">
      {/* These background shapes are decorative only. They make the UI feel more lively. */}
      <div className="background-shape shape-one" />
      <div className="background-shape shape-two" />
      <div className="background-shape shape-three" />

      <section className="game-card">
        <p className="eyebrow">React mini project</p>
        <h1>Tic Tac Toe Arena</h1>
        <p className="subtitle">
          Pick your shape, play the board, and celebrate the winner.
        </p>

        {/* Symbol picker UI. This is only for display/input; the actual game logic stays above. */}
        <div className="symbol-panel">
          <div className="symbol-picker">
            <p>Player 1</p>
            <div className="symbol-options">
              {SYMBOL_OPTIONS.map((symbol) => (
                <button
                  key={`player-one-${symbol}`}
                  className={symbol === playerOneSymbol ? "symbol-btn active" : "symbol-btn"}
                  onClick={() => handleSymbolChange(1, symbol)}
                  disabled={symbol === playerTwoSymbol}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          <div className="symbol-picker">
            <p>Player 2</p>
            <div className="symbol-options">
              {SYMBOL_OPTIONS.map((symbol) => (
                <button
                  key={`player-two-${symbol}`}
                  className={symbol === playerTwoSymbol ? "symbol-btn active" : "symbol-btn"}
                  onClick={() => handleSymbolChange(2, symbol)}
                  disabled={symbol === playerOneSymbol}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className={winner ? "status winner-status" : "status"}>{statusText}</p>

        <Board
          board={board}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
        />

        <button className="reset-btn" onClick={resetGame}>
          Restart Game
        </button>
      </section>
    </main>
  );
}

export default App;
