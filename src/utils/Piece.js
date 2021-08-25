import Pgn from './Pgn.js';

import bBishop from '../assets/img/bBishop.svg';
import bKing from '../assets/img/bKing.svg';
import bKnight from '../assets/img/bKnight.svg';
import bPawn from '../assets/img/bPawn.svg';
import bQueen from '../assets/img/bQueen.svg';
import bRook from '../assets/img/bRook.svg';
import wBishop from '../assets/img/wBishop.svg';
import wKing from '../assets/img/wKing.svg';
import wKnight from '../assets/img/wKnight.svg';
import wPawn from '../assets/img/wPawn.svg';
import wQueen from '../assets/img/wQueen.svg';
import wRook from '../assets/img/wRook.svg';

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
