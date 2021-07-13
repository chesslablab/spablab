import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';

const TimerBlack = () => {
  const state = useSelector(state => state);
  const expiryTimestamp = state.mode.playfriend.time;

  const {
    seconds,
    minutes,
    pause,
    resume,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    state.board.turn !== state.mode.playfriend.color ? resume() : pause();
  }, [state.board.turn]);

  return (
    <div className="timer">
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}

export default TimerBlack;
