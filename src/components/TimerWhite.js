import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';

const TimerWhite = () => {
  const state = useSelector(state => state);

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(state.mode.playfriend.jwt_decoded.min) * 60);

  const {
    seconds,
    minutes,
    pause,
    resume,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    state.board.turn !== state.mode.playfriend.color ? pause() : resume();
  }, [state.board.turn]);

  return (
    <div className="timer">
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}

export default TimerWhite;
