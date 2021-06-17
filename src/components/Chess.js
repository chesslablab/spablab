import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Board from './Board.js';
import MoveValidator from './MoveValidator.js';
import '../index.css';

const Chess = ({props}) => {
  return (
    <Provider store={store}>
      <Board props={props} />
      <MoveValidator />
    </Provider>
  );
}

export default Chess;
