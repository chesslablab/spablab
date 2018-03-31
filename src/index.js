import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
          piece: '♖',
          symbol: 'R'
        },
        b8: {
          color: 'b',
          piece: '♘',
          symbol: 'N'
        },
        c8: {
          color: 'b',
          piece: '♗',
          symbol: 'B'
        },
        d8: {
          color: 'b',
          piece: '♕',
          symbol: 'Q'
        },
        e8: {
          color: 'b',
          piece: '♔',
          symbol: 'K'
        },
        f8: {
          color: 'b',
          piece: '♗',
          symbol: 'B'
        },
        g8: {
          color: 'b',
          piece: '♘',
          symbol: 'N'
        },
        h8: {
          color: 'b',
          piece: '♖',
          symbol: 'R'
        },
        a7: {
          color: 'b',
          piece: '♙',
          symbol: 'P'
        },
        b7: {
          color: 'b',
          piece: '♙',
          symbol: 'P'
        },
        c7: {
          color: 'b',
          piece: '♙',
          symbol: 'P'
        },
        d7: {
          color: 'b',
          piece: '♙',
          symbol: 'P'
        },
        e7: {
          color: 'b',
          piece: '♙',
          symbol: 'P'
        },
        f7: {
          color: 'b',
          piece: '♙',
          symbol: 'P'
        },
        g7: {
          color: 'b',
          piece: '♙',
          symbol: 'P'
        },
        h7: {
          color: 'b',
          piece: '♙',
          symbol: 'P'
        }
      }
    };
  }

  /* movePiece(i) {
  } */

  render() {
    return (
      <div>
        <div className="board-row">
          <Square square='a3' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='b3' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='c3' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='d3' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='e3' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='f3' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='g3' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='h3' color='w' state={this.state} onClick={() => alert('foo')} />
        </div>
        <div className="board-row">
          <Square square='a2' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='b2' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='c2' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='d2' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='e2' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='f2' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='g2' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='h2' color='b' state={this.state} onClick={() => alert('foo')} />
        </div>
        <div className="board-row">
          <Square square='a1' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='b1' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='c1' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='d1' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='e1' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='f1' color='w' state={this.state} onClick={() => alert('foo')} />
          <Square square='g1' color='b' state={this.state} onClick={() => alert('foo')} />
          <Square square='h1' color='w' state={this.state} onClick={() => alert('foo')} />
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
