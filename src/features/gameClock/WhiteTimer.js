import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import { Box } from '@mui/material';
import Pgn from '../../common/Pgn';
import * as infoAlert from '../../features/alert/infoAlertSlice';
import * as mode from '../../features/mode/modeSlice';

const WhiteTimer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const expiryTimestamp = state.mode.play.timer.expiry_timestamp;
  const timer = useTimer({
    expiryTimestamp,
    onExpire: () => {
      dispatch(mode.timeOver({ color: Pgn.symbol.WHITE }));
      dispatch(infoAlert.show({ info: 'Black wins.' }));
    }
  });
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.name) {
      isInitialMount.name = false;
    } else {
      if (
        state.board.isMate ||
        state.mode.play.draw ||
        state.mode.play.resign ||
        state.mode.play.leave ||
        state.mode.play.timer.over
      ) {
        timer.pause();
      } else if (state.board.turn === Pgn.symbol.WHITE) {
        timer.resume();
      } else {
        let now = new Date();
        let elapsedSeconds = timer.minutes * 60 + timer.seconds
        now.setSeconds(
          now.getSeconds() +
          elapsedSeconds +
          parseInt(state.mode.play.jwt_decoded.increment)
        );
        timer.restart(now);
        timer.pause();
      }
    }
  }, [
    state.board.turn,
    state.board.isMate,
    state.mode.play.draw,
    state.mode.play.resign,
    state.mode.play.leave,
    state.mode.play.timer.over
  ]);

  return (
    <Box component="span" style={{ marginRight: 10 }}>
      {timer.minutes}:{timer.seconds}
    </Box>
  );
}

export default WhiteTimer;
