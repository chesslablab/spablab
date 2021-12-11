import React, { useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import { useSelector } from "react-redux";
import { useTimer } from 'react-timer-hook';
import modeActionTypes from '../../constants/modeActionTypes';
import Pgn from '../../utils/Pgn';

const WhiteTimer = () => {
  const state = useSelector(state => state);
  const expiryTimestamp = state.mode.playfriend.timer.expiry_timestamp;
  const timer = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      // do nothing ...
      isInitialMount.current = false;
    } else {
      if (state.board.turn === Pgn.symbol.WHITE) {
        timer.resume();
      } else {
        let now = new Date();
        let elapsedSeconds = timer.minutes * 60 + timer.seconds
        now.setSeconds(
          now.getSeconds() +
          elapsedSeconds +
          parseInt(state.mode.playfriend.jwt_decoded.increment)
        );
        timer.restart(now);
        timer.pause();
      }
    }
  }, [state.board.turn]);

  return (
    <Box component="span" style={{ marginRight: 10 }}>
      {timer.minutes}:{timer.seconds}
    </Box>
  );
}

export default WhiteTimer;
