import Symbol from './Symbol.js';

export default class Pgn {
  /**
   * Tests arbitrary strings against valid pgn moves.
   *
   */
  static move = {
    KING: 'K' + Symbol.SQUARE,
    KING_CASTLING_SHORT: Symbol.CASTLING_SHORT + Symbol.CHECK,
    KING_CASTLING_LONG: Symbol.CASTLING_LONG + Symbol.CHECK,
    KING_CAPTURES: 'Kx' + Symbol.SQUARE,
    PIECE: '[BRQ]{1}[a-h]{0,1}[1-8]{0,1}' + Symbol.SQUARE + Symbol.CHECK,
    PIECE_CAPTURES: '[BRQ]{1}[a-h]{0,1}[1-8]{0,1}x' + Symbol.SQUARE + Symbol.CHECK,
    KNIGHT: 'N[a-h]{0,1}[1-8]{0,1}' + Symbol.SQUARE + Symbol.CHECK,
    KNIGHT_CAPTURES: 'N[a-h]{0,1}[1-8]{0,1}x' + Symbol.SQUARE + Symbol.CHECK,
    PAWN: Symbol.SQUARE + Symbol.CHECK,
    PAWN_CAPTURES: '[a-h]{1}x' + Symbol.SQUARE + Symbol.CHECK,
    PAWN_PROMOTES: Symbol.SQUARE + '=[NBRQ]{1}' + Symbol.CHECK,
    PAWN_CAPTURES_AND_PROMOTES: '[a-h]{1}x' + Symbol.SQUARE + '=[NBRQ]{1}' + Symbol.CHECK
  };

  /**
   * Converts a move object into PGN notation.
   *
   * @param {object} move
   * @param {capture} string
   */
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
        // O-O, white king
        if (move.piece.color === Symbol.WHITE &&
            move.from === 'e1' &&
            move.to === 'g1') {
            pgn = 'O-O';
        }
        // O-O-O, white king
        else if (move.piece.color === Symbol.WHITE &&
            move.from === 'e1' &&
            move.to === 'c1') {
            pgn = 'O-O-O';
        }
        // O-O, black king
        else if (move.piece.color === Symbol.BLACK &&
            move.from === 'e8' &&
            move.to === 'g8') {
            pgn = 'O-O';
        }
        // O-O-O, black king
        else if (move.piece.color === Symbol.BLACK &&
            move.from === 'e8' &&
            move.to === 'c8') {
            pgn = 'O-O-O';
        }
        else {
            pgn = Symbol.KING + capture + move.to;
        }
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
