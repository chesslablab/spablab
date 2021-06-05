import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import Board from 'components/Board.js';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById('chess-board')
);
