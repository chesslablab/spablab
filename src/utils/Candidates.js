import Pgn from "../utils/Pgn";

export default function getCandidates(action, state) {
  console.log(action, state);
  switch (action.payload.piece.trim().toUpperCase()) {
    case Pgn.symbol.BISHOP:
      return [1];
    case Pgn.symbol.KING:
      return [2];
    case Pgn.symbol.KNIGHT:
      return [3];
    case Pgn.symbol.PAWN:
      return [4];
    case Pgn.symbol.QUEEN:
      return [5];
    case Pgn.symbol.ROOK:
      return [6];
    case Pgn.symbol.ROOK:
      return [7];
    default:
      return [];
  }
}
