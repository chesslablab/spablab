import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Pgn from 'common/Pgn';
import Wording from 'common/Wording.js';
import * as playMode from 'features/mode/playModeSlice';

const WhiteTimer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [count, setCount] = useState(state.playMode.timer.w);
  const [intervalId, setIntervalId] = useState(0);

  const counter = useCallback(() => setInterval(() => {
    setCount(prevCount => prevCount - 1);
  }, 1000), [
    setCount,
  ]);

  useEffect(() => {
    if (state.board.turn === Pgn.symbol.WHITE) {
      setIntervalId(counter());
    }
  }, [
    state.board.turn,
    counter,
  ]);

  useEffect(() => {
    if (state.board.turn === Pgn.symbol.BLACK) {
      clearInterval(intervalId);
      setCount(prevCount => prevCount + state.playMode.play.jwt_decoded.increment);
    }
  }, [
    state.board.turn,
    intervalId,
    state.playMode.play.jwt_decoded.increment,
  ]);

  useEffect(() => {
    if (
      count <= 0 ||
      state.board.isMate ||
      state.board.isStalemate ||
      state.playMode.draw === Wording.verb.ACCEPT.toLowerCase() ||
      state.playMode.resign ||
      state.playMode.leave
    ) {
      clearInterval(intervalId);
      dispatch(playMode.timeOut());
    }
  }, [
    count,
    state.board.isMate,
    state.board.isStalemate,
    state.playMode.draw,
    state.playMode.resign,
    state.playMode.leave,
    state.playMode.play.jwt_decoded.min,
    intervalId,
    dispatch,
  ]);

  const h = Math.floor(count / (60 * 60)).toString().padStart(2, '0');
  const m = Math.floor(count / 60 % 60).toString().padStart(2, '0');
  const s = Math.floor(count % 60).toString().padStart(2, '0');

  return (
    <Box component="span" style={{ marginRight: 10 }}>
      { h > 0 ? `${h}:${m}:${s}` : `${m}:${s}` }
    </Box>
  );
}

export default WhiteTimer;
