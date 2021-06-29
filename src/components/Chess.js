import React from 'react';
import { Provider } from 'react-redux';
import PrimaryButtons from './PrimaryButtons.js';
import InviteFriendDialog from './InviteFriendDialog';
import Settings from './Settings.js';
import Board from './Board.js';
import History from './History';
import MoveValidator from './MoveValidator.js';
import '../index.css';
import store from '../store';

const Chess = ({props}) => {
  return (
    <Provider store={store}>
      <Settings props={props} />
      <PrimaryButtons props={props} />
      <InviteFriendDialog />
      <Board props={props} />
      <History />
      {props.server ? <MoveValidator /> : null}
    </Provider>
  );
}

export default Chess;
