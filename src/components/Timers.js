import React from 'react';
import { useSelector } from 'react-redux';
import TimerBlack from './TimerBlack';
import TimerWhite from './TimerWhite';
import Pgn from '../utils/Pgn';

const Timers = () => {
  const state = useSelector(state => state);

  if (state.mode.playfriend.accepted) {
    if (state.board.flip === Pgn.symbol.WHITE) {
      return (
        <div>
          <TimerBlack />
          <TimerWhite />
        </div>
      );
    } else {
      return (
        <div>
          <TimerWhite />
          <TimerBlack />
        </div>
      );
    }
  }

  return null;
}

export default Timers;
