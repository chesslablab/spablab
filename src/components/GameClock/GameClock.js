import React from 'react';
import { useSelector } from 'react-redux';
import BlackTimer from './BlackTimer';
import WhiteTimer from './WhiteTimer';

const GameClock = () => {
  const state = useSelector(state => state);

  if (state.mode.playfriend.accepted) {
    if (!state.board.mate &&
      !state.mode.playfriend.draw &&
      !state.mode.playfriend.resign &&
      !state.mode.playfriend.timer.over
    ) {
      return (
        <div>
          <WhiteTimer /><BlackTimer />
        </div>
      );
    }
  }

  return null;
}

export default GameClock;
