export default function calculatePawnCandidateSquares(action, state) {
  let candidates = [];
  const i = action.payload.i;
  const j = action.payload.j;
  const blackPieces = "rnbkqp";
  const whitePieces = "RNBKQP";
  const turn = state.turn;
  const actualBoard = state.history[state.history.length - 1];

  // White pawn in the first row
  if (turn === "w" && i === 6 && actualBoard[i - 1][j].trim() === ".") {
    candidates.push((i - 1) * 8 + j);
    if (actualBoard[i - 2][j].trim() === ".") {
      candidates.push((i - 2) * 8 + j);
    }
  }

  // White pawn not in the first row
  if (turn === "w" && i > 0 && i < 6 && actualBoard[i - 1][j].trim() === ".") {
    candidates.push((i - 1) * 8 + j);
  }

  // Black pawn in the first row
  if (turn === "b" && i === 1 && actualBoard[i + 1][j].trim() === ".") {
    candidates.push((i + 1) * 8 + j);
    if (actualBoard[i + 2][j].trim() === ".") {
      candidates.push((i + 2) * 8 + j);
    }
  }

  // Black pawn not in the first row
  if (turn === "b" && i > 1 && i < 7 && actualBoard[i + 1][j].trim() === ".") {
    candidates.push((i + 1) * 8 + j);
  }

  // White pawn left diagonal capture
  if (
    turn === "w" &&
    i > 0 &&
    j > 0 &&
    blackPieces.includes(actualBoard[i - 1][j - 1].trim())
  ) {
    candidates.push((i - 1) * 8 + (j - 1));
  }

  // // White pawn right diagonal capture
  if (
    turn === "w" &&
    i > 0 &&
    j < 7 &&
    blackPieces.includes(actualBoard[i - 1][j + 1].trim())
  ) {
    candidates.push((i - 1) * 8 + (j + 1));
  }

  // Black pawn right diagonal capture
  if (
    turn === "b" &&
    i < 7 &&
    j > 0 &&
    whitePieces.includes(actualBoard[i + 1][j - 1].trim())
  ) {
    candidates.push((i + 1) * 8 + (j - 1));
  }

  // Black pawn left diagonal capture
  if (
    turn === "b" &&
    i < 7 &&
    j < 7 &&
    whitePieces.includes(actualBoard[i + 1][j + 1].trim())
  ) {
    candidates.push((i + 1) * 8 + (j + 1));
  }

  // TODO Add En-passant rule

  return candidates;
}
