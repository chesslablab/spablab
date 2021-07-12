import React from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp }) => {
  const {
    seconds,
    minutes,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div className="timer">
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}

export default Timer;
