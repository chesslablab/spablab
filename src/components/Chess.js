import React from 'react';
import { Provider } from 'react-redux';
import CreateInviteCodeDialog from './CreateInviteCodeDialog';
import EnterInviteCodeDialog from './EnterInviteCodeDialog';
import Buttons from './Buttons.js';
import Board from './Board.js';
import '../index.css';
import store from '../store';

const Chess = ({props}) => {
  return (
    <Provider store={store}>
      <Buttons props={props} />
      <CreateInviteCodeDialog />
      <EnterInviteCodeDialog />
      <Board props={props} />
    </Provider>
  );
}

export default Chess;
