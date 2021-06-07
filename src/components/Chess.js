import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Board from './Board.js';
import '../index.css';

const Chess = () => {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}

export default Chess;
