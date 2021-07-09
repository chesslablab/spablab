import Pgn from './Pgn.js';

export default class Piece {
  static unicode = {
    ' R ': {
      char: '♖'
    },
    ' N ': {
      char: '♘'
    },
    ' B ': {
      char: '♗'
    },
    ' Q ': {
      char: '♕'
    },
    ' K ': {
      char: '♔'
    },
    ' P ': {
      char: '♙'
    },
    ' r ': {
      char: '♜'
    },
    ' n ': {
      char: '♞'
    },
    ' b ': {
      char: '♝'
    },
    ' q ': {
      char: '♛'
    },
    ' k ': {
      char: '♚'
    },
    ' p ': {
      char: '♟'
    },
    ' . ': {
      char: ''
    }
  };

  static color = (piece) => {
    const pieces = {
      'w': [' R ', ' N ', ' B ', ' Q ', ' K ', ' P '],
      'b': [' r ', ' n ', ' b ', ' q ', ' k ', ' p ']
    };
    if (pieces[Pgn.symbol.WHITE].includes(piece)) {
      return Pgn.symbol.WHITE;
    } else if (pieces[Pgn.symbol.BLACK].includes(piece)) {
      return Pgn.symbol.BLACK;
    }

    return null;
  }
}
