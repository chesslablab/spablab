import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import { Box } from '@mui/material';
import Pgn from 'common/Pgn';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as playMode from 'features/mode/playModeSlice';

const BlackTimer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const expiryTimestamp = state.playMode.play.timer.expiry_timestamp;
  const timer = useTimer({
    expiryTimestamp,
    onExpire: () => {
      dispatch(playMode.timeOver({ color: Pgn.symbol.BLACK }));
      dispatch(infoAlert.show({ mssg: 'White wins.' }));
    }
  });

  useEffect(() => {
    if (
      state.board.isMate ||
      state.board.isStalemate ||
      state.playMode.play.draw ||
      state.playMode.play.resign ||
      state.playMode.play.leave ||
      state.playMode.play.timer.over
    ) {
      timer.pause();
    } else if (state.board.turn === Pgn.symbol.BLACK) {
      timer.resume();
    } else {
      let now = new Date();
      let elapsedSeconds = timer.minutes * 60 + timer.seconds
      now.setSeconds(
        now.getSeconds() +
        elapsedSeconds +
        parseInt(state.playMode.play.jwt_decoded.increment)
      );
      timer.restart(now);
      timer.pause();
    }
  }, [
    state.board.turn,
    state.board.isMate,
    state.board.isStalemate,
    state.playMode.play.draw,
    state.playMode.play.resign,
    state.playMode.play.leave,
    state.playMode.play.timer.over
  ]);

  return (
    <Box component="span">
      {timer.minutes}:{timer.seconds}
    </Box>
  );
}

export default BlackTimer;
