import Symbol from './global/Symbol.js';

export default class Pgn {
  static convert(move, capture='') {
    let pgn;
    switch (move.piece.symbol) {
      case Symbol.ROOK:
        pgn = Symbol.ROOK + capture + move.to;
        break
      // ...
      default:
        break;
    }

    return pgn;
  }
}
