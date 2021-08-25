import Pgn from './Pgn.js';

import bBishop from '../assets/img/pieces/bBishop.svg';
import bKing from '../assets/img/pieces/bKing.svg';
import bKnight from '../assets/img/pieces/bKnight.svg';
import bPawn from '../assets/img/pieces/bPawn.svg';
import bQueen from '../assets/img/pieces/bQueen.svg';
import bRook from '../assets/img/pieces/bRook.svg';
import wBishop from '../assets/img/pieces/wBishop.svg';
import wKing from '../assets/img/pieces/wKing.svg';
import wKnight from '../assets/img/pieces/wKnight.svg';
import wPawn from '../assets/img/pieces/wPawn.svg';
import wQueen from '../assets/img/pieces/wQueen.svg';
import wRook from '../assets/img/pieces/wRook.svg';

export default class Piece {
  static unicode = {
    ' R ': {
      char: wRook
    },
    ' N ': {
      char: wKnight
    },
    ' B ': {
      char: wBishop
    },
    ' Q ': {
      char: wQueen
    },
    ' K ': {
      char: wKing
    },
    ' P ': {
      char: wPawn
    },
    ' r ': {
      char: bRook
    },
    ' n ': {
      char: bKnight
    },
    ' b ': {
      char: bBishop
    },
    ' q ': {
      char: bQueen
    },
    ' k ': {
      char: bKing
    },
    ' p ': {
      char: bPawn
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
