import Pgn from './Pgn.js';

import bArchbishop from '../assets/img/pieces/default/bArchbishop.svg';
import bBishop from '../assets/img/pieces/default/bBishop.svg';
import bChancellor from '../assets/img/pieces/default/bChancellor.svg';
import bKing from '../assets/img/pieces/default/bKing.svg';
import bKnight from '../assets/img/pieces/default/bKnight.svg';
import bPawn from '../assets/img/pieces/default/bPawn.svg';
import bQueen from '../assets/img/pieces/default/bQueen.svg';
import bRook from '../assets/img/pieces/default/bRook.svg';
import wArchbishop from '../assets/img/pieces/default/wArchbishop.svg';
import wBishop from '../assets/img/pieces/default/wBishop.svg';
import wChancellor from '../assets/img/pieces/default/wChancellor.svg';
import wKing from '../assets/img/pieces/default/wKing.svg';
import wKnight from '../assets/img/pieces/default/wKnight.svg';
import wPawn from '../assets/img/pieces/default/wPawn.svg';
import wQueen from '../assets/img/pieces/default/wQueen.svg';
import wRook from '../assets/img/pieces/default/wRook.svg';

export default class Piece {
  static unicode = {
    ' . ': {
      char: ''
    },
    ' a ': {
      char: bArchbishop
    },
    ' b ': {
      char: bBishop
    },
    ' c ': {
      char: bChancellor
    },
    ' k ': {
      char: bKing
    },
    ' n ': {
      char: bKnight
    },
    ' p ': {
      char: bPawn
    },
    ' q ': {
      char: bQueen
    },
    ' r ': {
      char: bRook
    },
    ' A ': {
      char: wArchbishop
    },
    ' B ': {
      char: wBishop
    },
    ' C ': {
      char: wChancellor
    },
    ' K ': {
      char: wKing
    },
    ' N ': {
      char: wKnight
    },
    ' P ': {
      char: wPawn
    },
    ' Q ': {
      char: wQueen
    },
    ' R ': {
      char: wRook
    }
  };

  static color = (piece) => {
    const pieces = {
      'w': [' A ', ' B ', ' C ', ' K ', ' N ', ' P ', ' Q ', ' R '],
      'b': [' a ', ' b ', ' c ', ' k ', ' n ', ' p ', ' q ', ' r ']
    };
    if (pieces[Pgn.symbol.WHITE].includes(piece)) {
      return Pgn.symbol.WHITE;
    } else if (pieces[Pgn.symbol.BLACK].includes(piece)) {
      return Pgn.symbol.BLACK;
    }

    return null;
  }
}
