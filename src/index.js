import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Symbol = {
    WHITE: 'w',
    BLACK: 'b',
    BISHOP: 'B',
    KING: 'K',
    KNIGHT: 'N',
    PAWN: 'P',
    QUEEN: 'Q',
    ROOK: 'R',
    CASTLING_SHORT: 'O-O',
    CASTLING_LONG: 'O-O-O'
}

class Square extends React.Component {
  renderPiece(square) {
    if (square in this.props.state.pieces) {
     return (
       this.props.state.pieces[square].piece.unicode
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
      move: {
        color: null,
        piece: null,
        symbol: null,
        square: {
          from: null,
          to: null
        }
      },
      pieces: {
        a1: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♖',
            symbol: Symbol.ROOK
          }
        },
        b1: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♘',
            symbol: Symbol.KNIGHT
          }
        },
        c1: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♗',
            symbol: Symbol.BISHOP
          }
        },
        d1: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♕',
            symbol: Symbol.QUEEN
          }
        },
        e1: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♔',
            symbol: Symbol.KING
          }
        },
        f1: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♗',
            symbol: Symbol.BISHOP
          }
        },
        g1: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♘',
            symbol: Symbol.KNIGHT
          }
        },
        h1: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♖',
            symbol: Symbol.ROOK
          }
        },
        a2: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♙',
            symbol: Symbol.PAWN
          }
        },
        b2: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♙',
            symbol: Symbol.PAWN
          }
        },
        c2: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♙',
            symbol: Symbol.PAWN
          }
        },
        d2: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♙',
            symbol: Symbol.PAWN
          }
        },
        e2: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♙',
            symbol: Symbol.PAWN
          }
        },
        f2: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♙',
            symbol: Symbol.PAWN
          }
        },
        g2: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♙',
            symbol: Symbol.PAWN
          }
        },
        h2: {
          color: Symbol.WHITE,
          piece: {
            unicode: '♙',
            symbol: Symbol.PAWN
          }
        },
        a8: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♜',
            symbol: Symbol.ROOK
          }
        },
        b8: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♞',
            symbol: Symbol.KNIGHT
          }
        },
        c8: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♝',
            symbol: Symbol.BISHOP
          }
        },
        d8: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♛',
            symbol: Symbol.QUEEN
          }
        },
        e8: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♚',
            symbol: Symbol.KING
          }
        },
        f8: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♝',
            symbol: Symbol.BISHOP
          }
        },
        g8: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♞',
            symbol: Symbol.KNIGHT
          }
        },
        h8: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♜',
            symbol: Symbol.ROOK
          }
        },
        a7: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♟',
            symbol: Symbol.PAWN
          }
        },
        b7: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♟',
            symbol: Symbol.PAWN
          }
        },
        c7: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♟',
            symbol: Symbol.PAWN
          }
        },
        d7: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♟',
            symbol: Symbol.PAWN
          }
        },
        e7: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♟',
            symbol: Symbol.PAWN
          }
        },
        f7: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♟',
            symbol: Symbol.PAWN
          }
        },
        g7: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♟',
            symbol: Symbol.PAWN
          }
        },
        h7: {
          color: Symbol.BLACK,
          piece: {
            unicode: '♟',
            symbol: Symbol.PAWN
          }
        }
      }
    };
  }

  switchColor(color) {
    if (color === Symbol.BLACK) {
      return Symbol.WHITE;
    } else {
      return Symbol.BLACK;
    }
  }

  renderRow(number) {
    let ascii = 96;
    let color;
    let row = [];

    if (number % 2 !== 0) {
      color = Symbol.BLACK;
    } else {
      color = Symbol.WHITE;
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
      <Board className="board"/>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('pgn-chess-game')
);
