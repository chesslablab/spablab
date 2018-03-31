import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className={['square', this.props.color].join(' ')} onClick={() => this.props.onClick()}>
        {this.props.state.pieces[this.props.name].piece}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: {
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
          <Square state={this.state} name='a2' color='w' onClick={() => alert('foo')} />
          <Square state={this.state} name='b2' color='b' onClick={() => alert('foo')} />
          <Square state={this.state} name='c2' color='w' onClick={() => alert('foo')} />
          <Square state={this.state} name='d2' color='b' onClick={() => alert('foo')} />
          <Square state={this.state} name='e2' color='w' onClick={() => alert('foo')} />
          <Square state={this.state} name='f2' color='b' onClick={() => alert('foo')} />
          <Square state={this.state} name='g2' color='w' onClick={() => alert('foo')} />
          <Square state={this.state} name='h2' color='b' onClick={() => alert('foo')} />
        </div>
        <div className="board-row">
          <Square state={this.state} name='a1' color='b' onClick={() => alert('foo')} />
          <Square state={this.state} name='b1' color='w' onClick={() => alert('foo')} />
          <Square state={this.state} name='c1' color='b' onClick={() => alert('foo')} />
          <Square state={this.state} name='d1' color='w' onClick={() => alert('foo')} />
          <Square state={this.state} name='e1' color='b' onClick={() => alert('foo')} />
          <Square state={this.state} name='f1' color='w' onClick={() => alert('foo')} />
          <Square state={this.state} name='g1' color='b' onClick={() => alert('foo')} />
          <Square state={this.state} name='h1' color='w' onClick={() => alert('foo')} />
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
