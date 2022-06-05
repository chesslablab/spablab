import Pgn from './Pgn.js';

import bBishop from '../assets/img/pieces/default/bBishop.svg';
import bKing from '../assets/img/pieces/default/bKing.svg';
import bKnight from '../assets/img/pieces/default/bKnight.svg';
import bPawn from '../assets/img/pieces/default/bPawn.svg';
import bQueen from '../assets/img/pieces/default/bQueen.svg';
import bRook from '../assets/img/pieces/default/bRook.svg';
import wBishop from '../assets/img/pieces/default/wBishop.svg';
import wKing from '../assets/img/pieces/default/wKing.svg';
import wKnight from '../assets/img/pieces/default/wKnight.svg';
import wPawn from '../assets/img/pieces/default/wPawn.svg';
import wQueen from '../assets/img/pieces/default/wQueen.svg';
import wRook from '../assets/img/pieces/default/wRook.svg';

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
