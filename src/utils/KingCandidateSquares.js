export default function calculateKingCandidateSquares(action, state) {
  let candidates = [];
  const i = action.payload.i;
  const j = action.payload.j;
  const blackPiecesOrEmpty = "rnbkqp.";
  const whitePiecesOrEmpty = "RNBKQP.";
  const turn = state.turn;
  const actualBoard = state.history[state.history.length - 1];

  // White King
  if (
    turn === "w" &&
    i > 0 &&
    blackPiecesOrEmpty.includes(actualBoard[i - 1][j].trim())
  ) {
    candidates.push((i - 1) * 8 + j);
  }

  if (
    turn === "w" &&
    i > 0 &&
    j > 0 &&
    blackPiecesOrEmpty.includes(actualBoard[i - 1][j - 1].trim())
  ) {
    candidates.push((i - 1) * 8 + (j - 1));
  }

  if (
    turn === "w" &&
    i > 0 &&
    j < 7 &&
    blackPiecesOrEmpty.includes(actualBoard[i - 1][j + 1].trim())
  ) {
    candidates.push((i - 1) * 8 + (j + 1));
  }

  if (
    turn === "w" &&
    j > 0 &&
    blackPiecesOrEmpty.includes(actualBoard[i][j - 1].trim())
  ) {
    candidates.push(i * 8 + (j - 1));
  }

  if (
    turn === "w" &&
    j < 7 &&
    blackPiecesOrEmpty.includes(actualBoard[i][j + 1].trim())
  ) {
    candidates.push(i * 8 + (j + 1));
  }

  if (
    turn === "w" &&
    i < 7 &&
    blackPiecesOrEmpty.includes(actualBoard[i + 1][j].trim())
  ) {
    candidates.push((i + 1) * 8 + j);
  }

  if (
    turn === "w" &&
    i < 7 &&
    j > 0 &&
    blackPiecesOrEmpty.includes(actualBoard[i + 1][j - 1].trim())
  ) {
    candidates.push((i + 1) * 8 + (j - 1));
  }

  if (
    turn === "w" &&
    i < 7 &&
    j < 7 &&
    blackPiecesOrEmpty.includes(actualBoard[i + 1][j + 1].trim())
  ) {
    candidates.push((i + 1) * 8 + (j + 1));
  }

  // Black King
  if (
    turn === "b" &&
    i < 7 &&
    whitePiecesOrEmpty.includes(actualBoard[i + 1][j].trim())
  ) {
    candidates.push((i + 1) * 8 + j);
  }

  if (
    turn === "b" &&
    i < 7 &&
    j > 0 &&
    whitePiecesOrEmpty.includes(actualBoard[i + 1][j - 1].trim())
  ) {
    candidates.push((i + 1) * 8 + (j - 1));
  }

  if (
    turn === "b" &&
    i < 7 &&
    j < 7 &&
    whitePiecesOrEmpty.includes(actualBoard[i + 1][j + 1].trim())
  ) {
    candidates.push((i + 1) * 8 + (j + 1));
  }

  if (
    turn === "b" &&
    j > 0 &&
    whitePiecesOrEmpty.includes(actualBoard[i][j - 1].trim())
  ) {
    candidates.push(i * 8 + (j - 1));
  }

  if (
    turn === "b" &&
    j < 7 &&
    whitePiecesOrEmpty.includes(actualBoard[i][j + 1].trim())
  ) {
    candidates.push(i * 8 + (j + 1));
  }

  if (
    turn === "b" &&
    i > 0 &&
    whitePiecesOrEmpty.includes(actualBoard[i - 1][j].trim())
  ) {
    candidates.push((i - 1) * 8 + j);
  }

  if (
    turn === "b" &&
    i > 0 &&
    j > 0 &&
    whitePiecesOrEmpty.includes(actualBoard[i - 1][j - 1].trim())
  ) {
    candidates.push((i - 1) * 8 + (j - 1));
  }

  if (
    turn === "b" &&
    i > 0 &&
    j < 7 &&
    whitePiecesOrEmpty.includes(actualBoard[i - 1][j + 1].trim())
  ) {
    candidates.push((i - 1) * 8 + (j + 1));
  }

  // TODO - Add castle 

  return candidates;
}
