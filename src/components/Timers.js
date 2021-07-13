import React from 'react';
import { useSelector } from 'react-redux';
import TimerBlack from './TimerBlack';
import TimerWhite from './TimerWhite';

const Timers = () => {
  const state = useSelector(state => state);

  if (state.mode.playfriend.accepted) {
    return (
      <div className="timers">
        <TimerWhite />
        <TimerBlack />
      </div>
    );
  }

  return null;
}

export default Timers;
