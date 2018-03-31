import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className={['square', this.props.color].join(' ')} onClick={() => this.props.onClick()}>
        {this.props.name}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [
        {
          piece: '♖',
          square: 'a1'
        },
        {
          piece: '♘',
          square: 'b1'
        },
        {
          piece: '♗',
          square: 'c1'
        },
        {
          piece: '♕',
          square: 'd1'
        },
        {
          piece: '♔',
          square: 'e1'
        },
        {
          piece: '♗',
          square: 'f1'
        },
        {
          piece: '♘',
          square: 'g1'
        },
        {
          piece: '♖',
          square: 'h1'
        },
        {
          piece: '♙',
          square: 'a2'
        },
        {
          piece: '♙',
          square: 'b2'
        },
        {
          piece: '♙',
          square: 'c2'
        },
        {
          piece: '♙',
          square: 'd2'
        },
        {
          piece: '♙',
          square: 'e2'
        },
        {
          piece: '♙',
          square: 'f2'
        },
        {
          piece: '♙',
          square: 'g2'
        },
        {
          piece: '♙',
          square: 'h2'
        },
        {
          piece: '♖',
          square: 'a8'
        },
        {
          piece: '♘',
          square: 'b8'
        },
        {
          piece: '♗',
          square: 'c8'
        },
        {
          piece: '♕',
          square: 'd8'
        },
        {
          piece: '♔',
          square: 'e8'
        },
        {
          piece: '♗',
          square: 'f8'
        },
        {
          piece: '♘',
          square: 'g8'
        },
        {
          piece: '♖',
          square: 'h8'
        },
        {
          piece: '♙',
          square: 'a7'
        },
        {
          piece: '♙',
          square: 'b7'
        },
        {
          piece: '♙',
          square: 'c7'
        },
        {
          piece: '♙',
          square: 'd7'
        },
        {
          piece: '♙',
          square: 'e7'
        },
        {
          piece: '♙',
          square: 'f7'
        },
        {
          piece: '♙',
          square: 'g7'
        },
        {
          piece: '♙',
          square: 'h7'
        }
      ]
    };
  }

  /* movePiece(i) {
  } */

  render() {
    return (
      <div>
        <div className="board-row">
          <Square name='a3' color='b' onClick={() => alert('foo')} />
          <Square name='b3' color='w' onClick={() => alert('foo')} />
          <Square name='c3' color='b' onClick={() => alert('foo')} />
          <Square name='d3' color='w' onClick={() => alert('foo')} />
          <Square name='e3' color='b' onClick={() => alert('foo')} />
          <Square name='f3' color='w' onClick={() => alert('foo')} />
          <Square name='g3' color='b' onClick={() => alert('foo')} />
          <Square name='h3' color='w' onClick={() => alert('foo')} />
        </div>
        <div className="board-row">
          <Square name='a2' color='w' onClick={() => alert('foo')} />
          <Square name='b2' color='b' onClick={() => alert('foo')} />
          <Square name='c2' color='w' onClick={() => alert('foo')} />
          <Square name='d2' color='b' onClick={() => alert('foo')} />
          <Square name='e2' color='w' onClick={() => alert('foo')} />
          <Square name='f2' color='b' onClick={() => alert('foo')} />
          <Square name='g2' color='w' onClick={() => alert('foo')} />
          <Square name='h2' color='b' onClick={() => alert('foo')} />
        </div>
        <div className="board-row">
          <Square name='a1' color='b' onClick={() => alert('foo')} />
          <Square name='b1' color='w' onClick={() => alert('foo')} />
          <Square name='c1' color='b' onClick={() => alert('foo')} />
          <Square name='d1' color='w' onClick={() => alert('foo')} />
          <Square name='e1' color='b' onClick={() => alert('foo')} />
          <Square name='f1' color='w' onClick={() => alert('foo')} />
          <Square name='g1' color='b' onClick={() => alert('foo')} />
          <Square name='h1' color='w' onClick={() => alert('foo')} />
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
