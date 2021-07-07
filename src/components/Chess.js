import React from 'react';
import { Provider } from 'react-redux';
import CreateInvitationDialog from './CreateInvitationDialog';
import EnterCodeDialog from './EnterCodeDialog';
import Buttons from './Buttons.js';
import Board from './Board.js';
import History from './History';
import MoveValidator from './MoveValidator.js';
import '../index.css';
import store from '../store';

const Chess = ({props}) => {
  return (
    <Provider store={store}>
      <Buttons props={props} />
      <CreateInvitationDialog />
      <EnterCodeDialog />
      <Board props={props} />
      <History />
      <MoveValidator />
    </Provider>
  );
}

export default Chess;
