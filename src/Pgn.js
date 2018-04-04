import Symbol from './Symbol.js';

// TODO
// Implement O-O and O-O-O
// ...
export default class Pgn {
  static convert(move, capture='') {
    let pgn;
    switch (move.piece.symbol) {
      case Symbol.ROOK:
        pgn = Symbol.ROOK + capture + move.to;
        break;
      case Symbol.KNIGHT:
        pgn = Symbol.KNIGHT + capture + move.to;
        break;
      case Symbol.BISHOP:
        pgn = Symbol.BISHOP + capture + move.to;
        break;
      case Symbol.QUEEN:
        pgn = Symbol.QUEEN + capture + move.to;
        break;
      case Symbol.KING:
        // TODO Implement O-O and O-O-O
        pgn = Symbol.KING + capture + move.to;
        break;
      case Symbol.PAWN:
        if (move.from.charAt(0) === move.to.charAt(0)) {
          pgn = move.to;
        } else {
          pgn = move.from.charAt(0) + 'x' + move.to;
        }
        break;
      default:
        break;
    }

    return pgn;
  }
}
