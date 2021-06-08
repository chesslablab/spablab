import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Board from './Board.js';
import '../index.css';

const Chess = ({props}) => {
  return (
    <Provider store={store}>
      <Board props={props} />
    </Provider>
  );
}

export default Chess;
