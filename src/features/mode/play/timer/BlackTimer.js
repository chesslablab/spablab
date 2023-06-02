import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Pgn from 'common/Pgn';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as playMode from 'features/mode/playModeSlice';

const BlackTimer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [count, setCount] = useState(state.playMode.timer.b);
  const [intervalId, setIntervalId] = useState(0);

  const counter = useCallback(() => setInterval(() => {
    setCount(prevCount => prevCount - 1);
  }, 1000), [
    setCount,
  ]);

  useEffect(() => {
    setCount(prevCount => prevCount - state.playMode.play.jwt_decoded.increment);
  }, [
    state.playMode.play.jwt_decoded.increment,
  ]);

  useEffect(() => {
    if (state.board.turn === Pgn.symbol.BLACK) {
      setIntervalId(counter());
    }
  }, [
    state.board.turn,
    counter,
  ]);

  useEffect(() => {
    if (state.board.turn === Pgn.symbol.WHITE) {
      clearInterval(intervalId);
      setCount(prevCount => prevCount + state.playMode.play.jwt_decoded.increment);
    }
  }, [
    state.board.turn,
    intervalId,
    state.playMode.play.jwt_decoded.increment,
  ]);

  useEffect(() => {
    if (count <= 0) {
      dispatch(playMode.timeOut());
      dispatch(infoAlert.show({ mssg: 'White wins.' }));
    }
  }, [
    count,
    dispatch,
  ]);

  const h = Math.floor(count / (60 * 60)).toString().padStart(2, '0');
  const m = Math.floor(count / 60 % 60).toString().padStart(2, '0');
  const s = Math.floor(count % 60).toString().padStart(2, '0');

  return (
    <Box component="span">
      { h > 0 ? `${h}:${m}:${s}` : `${m}:${s}` }
    </Box>
  );
}

export default BlackTimer;
