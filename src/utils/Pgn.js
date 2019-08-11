export default class Pgn {

  /**
   * PGN symbols.
   *
   */
  static symbol = {
      WHITE: 'w',
      BLACK: 'b',
      BISHOP: 'B',
      KING: 'K',
      KNIGHT: 'N',
      PAWN: 'P',
      QUEEN: 'Q',
      ROOK: 'R',
      CASTLING_SHORT: 'O-O',
      CASTLING_LONG: 'O-O-O',
      SQUARE: '[a-h]{1}[1-8]{1}',
      CHECK: '[+#]{0,1}'
  }

  /**
   * Tests arbitrary strings against valid pgn moves.
   *
   */
  static move = {
    KING: 'K' + Pgn.symbol.SQUARE,
    KING_CASTLING_SHORT: Pgn.symbol.CASTLING_SHORT + Pgn.symbol.CHECK,
    KING_CASTLING_LONG: Pgn.symbol.CASTLING_LONG + Pgn.symbol.CHECK,
    KING_CAPTURES: 'Kx' + Pgn.symbol.SQUARE,
    PIECE: '[BRQ]{1}[a-h]{0,1}[1-8]{0,1}' + Pgn.symbol.SQUARE + Pgn.symbol.CHECK,
    PIECE_CAPTURES: '[BRQ]{1}[a-h]{0,1}[1-8]{0,1}x' + Pgn.symbol.SQUARE + Pgn.symbol.CHECK,
    KNIGHT: 'N[a-h]{0,1}[1-8]{0,1}' + Pgn.symbol.SQUARE + Pgn.symbol.CHECK,
    KNIGHT_CAPTURES: 'N[a-h]{0,1}[1-8]{0,1}x' + Pgn.symbol.SQUARE + Pgn.symbol.CHECK,
    PAWN: Pgn.symbol.SQUARE + Pgn.symbol.CHECK,
    PAWN_CAPTURES: '[a-h]{1}x' + Pgn.symbol.SQUARE + Pgn.symbol.CHECK,
    PAWN_PROMOTES: Pgn.symbol.SQUARE + '=[NBRQ]{1}' + Pgn.symbol.CHECK,
    PAWN_CAPTURES_AND_PROMOTES: '[a-h]{1}x' + Pgn.symbol.SQUARE + '=[NBRQ]{1}' + Pgn.symbol.CHECK
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
      case Pgn.symbol.ROOK:
        pgn = Pgn.symbol.ROOK + capture + move.to;
        break;

      case Pgn.symbol.KNIGHT:
        pgn = Pgn.symbol.KNIGHT + capture + move.to;
        break;

      case Pgn.symbol.BISHOP:
        pgn = Pgn.symbol.BISHOP + capture + move.to;
        break;

      case Pgn.symbol.QUEEN:
        pgn = Pgn.symbol.QUEEN + capture + move.to;
        break;

      case Pgn.symbol.KING:
        // O-O, white king
        if (move.piece.color === Pgn.symbol.WHITE &&
            move.from === 'e1' &&
            move.to === 'g1') {
            pgn = 'O-O';
        }
        // O-O-O, white king
        else if (move.piece.color === Pgn.symbol.WHITE &&
            move.from === 'e1' &&
            move.to === 'c1') {
            pgn = 'O-O-O';
        }
        // O-O, black king
        else if (move.piece.color === Pgn.symbol.BLACK &&
            move.from === 'e8' &&
            move.to === 'g8') {
            pgn = 'O-O';
        }
        // O-O-O, black king
        else if (move.piece.color === Pgn.symbol.BLACK &&
            move.from === 'e8' &&
            move.to === 'c8') {
            pgn = 'O-O-O';
        }
        else {
            pgn = Pgn.symbol.KING + capture + move.to;
        }
        break;

      case Pgn.symbol.PAWN:
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
