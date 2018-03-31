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
          color: 'w',
          piece: '♖',
          symbol: 'R'
        },
        b1: {
          color: 'w',
          piece: '♘',
          symbol: 'N'
        },
        c1: {
          color: 'w',
          piece: '♗',
          symbol: 'B'
        },
        d1: {
          color: 'w',
          piece: '♕',
          symbol: 'Q'
        },
        e1: {
          color: 'w',
          piece: '♔',
          symbol: 'K'
        },
        f1: {
          color: 'w',
          piece: '♗',
          symbol: 'B'
        },
        g1: {
          color: 'w',
          piece: '♘',
          symbol: 'N'
        },
        h1: {
          color: 'w',
          piece: '♖',
          symbol: 'R'
        },
        a2: {
          color: 'w',
          piece: '♙',
          symbol: 'P'
        },
        b2: {
          color: 'w',
          piece: '♙',
          symbol: 'P'
        },
        c2: {
          color: 'w',
          piece: '♙',
          symbol: 'P'
        },
        d2: {
          color: 'w',
          piece: '♙',
          symbol: 'P'
        },
        e2: {
          color: 'w',
          piece: '♙',
          symbol: 'P'
        },
        f2: {
          color: 'w',
          piece: '♙',
          symbol: 'P'
        },
        g2: {
          color: 'w',
          piece: '♙',
          symbol: 'P'
        },
        h2: {
          color: 'w',
          piece: '♙',
          symbol: 'P'
        },
        // black pieces
        a8: {
          color: 'b',
          piece: '♜',
          symbol: 'R'
        },
        b8: {
          color: 'b',
          piece: '♞',
          symbol: 'N'
        },
        c8: {
          color: 'b',
          piece: '♝',
          symbol: 'B'
        },
        d8: {
          color: 'b',
          piece: '♛',
          symbol: 'Q'
        },
        e8: {
          color: 'b',
          piece: '♚',
          symbol: 'K'
        },
        f8: {
          color: 'b',
          piece: '♝',
          symbol: 'B'
        },
        g8: {
          color: 'b',
          piece: '♞',
          symbol: 'N'
        },
        h8: {
          color: 'b',
          piece: '♜',
          symbol: 'R'
        },
        a7: {
          color: 'b',
          piece: '♟',
          symbol: 'P'
        },
        b7: {
          color: 'b',
          piece: '♟',
          symbol: 'P'
        },
        c7: {
          color: 'b',
          piece: '♟',
          symbol: 'P'
        },
        d7: {
          color: 'b',
          piece: '♟',
          symbol: 'P'
        },
        e7: {
          color: 'b',
          piece: '♟',
          symbol: 'P'
        },
        f7: {
          color: 'b',
          piece: '♟',
          symbol: 'P'
        },
        g7: {
          color: 'b',
          piece: '♟',
          symbol: 'P'
        },
        h7: {
          color: 'b',
          piece: '♟',
          symbol: 'P'
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

  /* movePiece(i) {
  } */

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
       row.push(<Square square={String.fromCharCode(ascii) + number} color={color} state={this.state} onClick={() => alert('foo')} />);
       color = this.switchColor(color);
    }

    return row;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderRow(8)}
        </div>
        <div className="board-row">
          {this.renderRow(7)}
        </div>
        <div className="board-row">
          {this.renderRow(6)}
        </div>
        <div className="board-row">
          {this.renderRow(5)}
        </div>
        <div className="board-row">
          {this.renderRow(4)}
        </div>
        <div className="board-row">
          {this.renderRow(3)}
        </div>
        <div className="board-row">
          {this.renderRow(2)}
        </div>
        <div className="board-row">
          {this.renderRow(1)}
        </div>
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
