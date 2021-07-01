import Pgn from "./Pgn";
import calculatePawnCandidateSquares from "./PawnCandidateSquares";

export default function getAllCandidatesSquares(action, state) {
  switch (action.payload.piece.trim().toUpperCase()) {
    case Pgn.symbol.BISHOP:
      return [];
    case Pgn.symbol.KING:
      return [];
    case Pgn.symbol.KNIGHT:
      return [];
    case Pgn.symbol.PAWN:
      return calculatePawnCandidateSquares(action, state);
    case Pgn.symbol.QUEEN:
      return [];
    case Pgn.symbol.ROOK:
      return [];
    default:
      return [];
  }
}
