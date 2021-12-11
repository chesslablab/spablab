import React from 'react';
import { useSelector } from 'react-redux';
import BlackTimer from './BlackTimer';
import WhiteTimer from './WhiteTimer';

const GameClock = () => {
  const state = useSelector(state => state);

  if (!state.board.mate && state.mode.playfriend.accepted) {
    return (
      <div>
        <WhiteTimer /><BlackTimer />
      </div>
    );
  }

  return null;
}

export default GameClock;
