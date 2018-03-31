import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  render() {
    return (
      <div>
        <div className="board-row">
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>
          <Square/>
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
