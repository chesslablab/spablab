import BoardActions from '../actions/BoardActions.js';
import BoardStore from '../stores/BoardStore.js';
import HistoryStore from '../stores/HistoryStore.js';
import SquareStore from '../stores/SquareStore.js';
import ServerStore from '../stores/ServerStore.js';
import History from './History.js';
import Pgn from '../utils/Pgn.js';
import React from 'react';
import Square from './Square.js';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = BoardStore.getState();
  }

  componentDidMount() {
    ServerStore.connect();
    SquareStore.on("move", () => {
      this.setState(BoardStore.getState());
    });
    BoardStore.on("reset", () => {
      this.setState(BoardStore.getState());
    });
    HistoryStore.on("go_to_beginning", () => {
      this.setState(BoardStore.getState());
    });
    HistoryStore.on("go_back", () => {
      this.setState(BoardStore.getState());
    });
    HistoryStore.on("go_forward", () => {
      this.setState(BoardStore.getState());
    });
    HistoryStore.on("go_to_end", () => {
      this.setState(BoardStore.getState());
    });
  }

  reset() {
    BoardActions.reset();
  }

  renderRow(number) {
    let ascii = 96;
    let color;
    let row = [];
    number % 2 !== 0 ? color = Pgn.symbol.BLACK : color = Pgn.symbol.WHITE;
    for (let i=1; i<=8; i++) {
      ascii++;
      let square = String.fromCharCode(ascii) + number;
      row.push(<Square
        key={i}
        square={square}
        color={color} />
      );
      color = color === Pgn.symbol.BLACK ? Pgn.symbol.WHITE : Pgn.symbol.BLACK;
    }

    return row;
  }

  render() {
    let board = [];
    for (let i=8; i>=1; i--) {
      board.push(<div key={i} className="board-row">{this.renderRow(i)}</div>);
    }
    return (
      <div>
        <div className="game">
          <div className="options">
            <button onClick={() => this.reset()}>New game</button>
          </div>
          <div className={['board', HistoryStore.getState().back > 0 ? 'past' : 'present'].join(' ')}>
            {board}
          </div>
        </div>
        <History />
      </div>
    );
  }
}
