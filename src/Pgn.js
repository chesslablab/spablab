import Symbol from './global/Symbol.js';

// TODO Implement the Pgn class
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
      default:
        break;
    }

    return pgn;
  }
}
