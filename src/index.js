import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const WHITE = 'w';
const BLACK = 'b';
const BISHOP = 'B';
const KING = 'K';
const KNIGHT = 'N';
const PAWN = 'P';
const QUEEN = 'Q';
const ROOK = 'R';
const CASTLING_SHORT = 'O-O';
const CASTLING_LONG = 'O-O-O';

class Square extends React.Component {
  renderPiece(square) {
    if (square in this.props.state.pieces) {
     return (
       this.props.state.pieces[square].piece
     );
    }
  }

  render() {
    return (
      <button className={['square', this.props.color].join(' ')} onClick={() => this.props.onClick()}>
        {this.renderPiece(this.props.square)}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pieces: {
        // white pieces
        a1: {
          color: WHITE,
          piece: '♖',
          symbol: ROOK
        },
        b1: {
          color: WHITE,
          piece: '♘',
          symbol: KNIGHT
        },
        c1: {
          color: WHITE,
          piece: '♗',
          symbol: BISHOP
        },
        d1: {
          color: WHITE,
          piece: '♕',
          symbol: QUEEN
        },
        e1: {
          color: WHITE,
          piece: '♔',
          symbol: KING
        },
        f1: {
          color: WHITE,
          piece: '♗',
          symbol: BISHOP
        },
        g1: {
          color: WHITE,
          piece: '♘',
          symbol: KNIGHT
        },
        h1: {
          color: WHITE,
          piece: '♖',
          symbol: ROOK
        },
        a2: {
          color: WHITE,
          piece: '♙',
          symbol: PAWN
        },
        b2: {
          color: WHITE,
          piece: '♙',
          symbol: PAWN
        },
        c2: {
          color: WHITE,
          piece: '♙',
          symbol: PAWN
        },
        d2: {
          color: WHITE,
          piece: '♙',
          symbol: PAWN
        },
        e2: {
          color: WHITE,
          piece: '♙',
          symbol: PAWN
        },
        f2: {
          color: WHITE,
          piece: '♙',
          symbol: PAWN
        },
        g2: {
          color: WHITE,
          piece: '♙',
          symbol: PAWN
        },
        h2: {
          color: WHITE,
          piece: '♙',
          symbol: PAWN
        },
        // black pieces
        a8: {
          color: BLACK,
          piece: '♜',
          symbol: ROOK
        },
        b8: {
          color: BLACK,
          piece: '♞',
          symbol: KNIGHT
        },
        c8: {
          color: BLACK,
          piece: '♝',
          symbol: BISHOP
        },
        d8: {
          color: BLACK,
          piece: '♛',
          symbol: QUEEN
        },
        e8: {
          color: BLACK,
          piece: '♚',
          symbol: KING
        },
        f8: {
          color: BLACK,
          piece: '♝',
          symbol: BISHOP
        },
        g8: {
          color: BLACK,
          piece: '♞',
          symbol: KNIGHT
        },
        h8: {
          color: BLACK,
          piece: '♜',
          symbol: ROOK
        },
        a7: {
          color: BLACK,
          piece: '♟',
          symbol: PAWN
        },
        b7: {
          color: BLACK,
          piece: '♟',
          symbol: PAWN
        },
        c7: {
          color: BLACK,
          piece: '♟',
          symbol: PAWN
        },
        d7: {
          color: BLACK,
          piece: '♟',
          symbol: PAWN
        },
        e7: {
          color: BLACK,
          piece: '♟',
          symbol: PAWN
        },
        f7: {
          color: BLACK,
          piece: '♟',
          symbol: PAWN
        },
        g7: {
          color: BLACK,
          piece: '♟',
          symbol: PAWN
        },
        h7: {
          color: BLACK,
          piece: '♟',
          symbol: PAWN
        }
      }
    };
  }

  switchColor(color) {
    if (color === BLACK) {
      return WHITE;
    } else {
      return BLACK;
    }
  }

  renderRow(number) {
    let ascii = 96;
    let color;
    let row = [];

    if (number % 2 !== 0) {
      color = BLACK;
    } else {
      color = WHITE;
    }

    for (let i=1; i<=8; i++) {
      ascii++;
      row.push(<Square
        square={String.fromCharCode(ascii) + number}
        color={color}
        state={this.state}
        onClick={() => alert('foo')} />
      );
      color = this.switchColor(color);
    }

    return row;
  }

  renderBoard() {
    let board = [];

    for (let i=8; i>=1; i--) {
      board.push(<div className="board-row">
        {this.renderRow(i)}
      </div>
      );
    }

    return board;
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <Board/>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
