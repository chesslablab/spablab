import React, { useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import modeActionTypes from '../../constants/modeActionTypes';
import Pgn from '../../utils/Pgn';

const BlackTimer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const expiryTimestamp = state.mode.playfriend.timer.expiry_timestamp;
  const timer = useTimer({
    expiryTimestamp,
    onExpire: () => {
      dispatch({
        type: modeActionTypes.TIMER_OVER,
        payload: {
          color: Pgn.symbol.BLACK
        }
      });
    }
  });
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      timer.pause();
      isInitialMount.current = false;
    } else {
      if (state.board.turn === Pgn.symbol.BLACK) {
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
    <Box component="span">
      {timer.minutes}:{timer.seconds}
    </Box>
  );
}

export default BlackTimer;
