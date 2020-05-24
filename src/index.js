import React from 'react';
import ReactDOM from 'react-dom';
import Board from 'components/Board.js';
import './index.css';

var BoardElement = React.createElement(Board);

ReactDOM.render(
  BoardElement,
  document.getElementById('chess-board')
);
