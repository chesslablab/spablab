import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';

const TimerBlack = ({ expiryTimestamp }) => {
  const state = useSelector(state => state);

  const {
    seconds,
    minutes,
    pause,
    start,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    state.board.turn !== state.mode.playfriend.color ? pause() : start();
  }, [state.board.turn]);

  return (
    <div className="timer">
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}

export default TimerBlack;
