import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import PrimaryButtons from './PrimaryButtons.js';
import Board from './Board.js';
import History from './History';
import MoveValidator from './MoveValidator.js';
import '../index.css';

const Chess = ({props}) => {
  return (
    <Provider store={store}>
      <PrimaryButtons props={props} />
      <Board props={props} />
      <History />
      {props.server ? <MoveValidator /> : null}
    </Provider>
  );
}

export default Chess;
