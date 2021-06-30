import Pgn from "../utils/Pgn";

export default function getCandidates(action, state) {
  switch (action.payload.piece.trim().toUpperCase()) {
    case Pgn.symbol.BISHOP:
      return [1];
    case Pgn.symbol.KING:
      return [2];
    case Pgn.symbol.KNIGHT:
      return [3];
    case Pgn.symbol.PAWN:
      const candidates = calculatePawnCandidates(action, state);
      return candidates;
    case Pgn.symbol.QUEEN:
      return [5];
    case Pgn.symbol.ROOK:
      return [6];
    default:
      return [];
  }
}

function calculatePawnCandidates(action, state) {
  let candidates = [];
  if (state.turn === "w" && action.payload.i === 6) {
    candidates.push((action.payload.i - 1) * 8 + action.payload.j);
    candidates.push((action.payload.i - 2) * 8 + action.payload.j);
    return candidates;
  } else if (state.turn === "w" && action.payload.i < 6) {
    candidates.push((action.payload.i - 1) * 8 + action.payload.j);
    return candidates;
  } else if (state.turn === "b" && action.payload.i === 1) {
    candidates.push((action.payload.i + 1) * 8 + action.payload.j);
    candidates.push((action.payload.i + 2) * 8 + action.payload.j);
    return candidates;
  } else if (state.turn === "b" && action.payload.i > 1) {
    candidates.push((action.payload.i + 1) * 8 + action.payload.j);
    return candidates;
  }
  return candidates;
}
