import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import alertInfoActionTypes from '../../constants/alert/alertInfoActionTypes';
import modeActionTypes from '../../constants/modeActionTypes';
import Pgn from '../../utils/Pgn';

const WhiteTimer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const expiryTimestamp = state.mode.playfriend.timer.expiry_timestamp;
  const timer = useTimer({
    expiryTimestamp,
    onExpire: () => {
      dispatch({
        type: modeActionTypes.TIMER_OVER,
        payload: {
          color: Pgn.symbol.WHITE
        }
      });
      dispatch({
        type: alertInfoActionTypes.DISPLAY_INFO_ALERT,
        payload: {
          info: 'Black wins.'
        }
      });
    }
  });
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
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
