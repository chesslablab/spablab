import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pgn } from '@chesslablab/reactblab';
import { Box } from '@mui/material';
import Wording from 'common/Wording.js';
import * as playMode from 'features/mode/playModeSlice';

const BlackTimer = () => {
  const stateBoard = useSelector(state => state.board);

  const statePlayMode = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const [count, setCount] = useState(statePlayMode.timer.b);

  const [intervalId, setIntervalId] = useState(0);

  const counter = useCallback(() => setInterval(() => {
    setCount(prevCount => prevCount - 1);
  }, 1000), [
    setCount,
  ]);

  useEffect(() => {
    setCount(prevCount => prevCount - statePlayMode.play.jwt_decoded.increment);
  }, [
    statePlayMode.play.jwt_decoded.increment,
  ]);

  useEffect(() => {
    if (stateBoard.turn === Pgn.symbol.BLACK) {
      setIntervalId(counter());
    }
  }, [
    stateBoard.turn,
    counter,
  ]);

  useEffect(() => {
    if (stateBoard.turn === Pgn.symbol.WHITE) {
      clearInterval(intervalId);
      setCount(prevCount => prevCount + statePlayMode.play.jwt_decoded.increment);
    }
  }, [
    stateBoard.turn,
    intervalId,
    statePlayMode.play.jwt_decoded.increment,
  ]);

  useEffect(() => {
    if (
      count <= 0 ||
      stateBoard.isMate ||
      stateBoard.isStalemate ||
      statePlayMode.draw === Wording.verb.ACCEPT.toLowerCase() ||
      statePlayMode.resign ||
      statePlayMode.leave
    ) {
      clearInterval(intervalId);
      dispatch(playMode.timeOut());
    }
  }, [
    count,
    stateBoard.isMate,
    stateBoard.isStalemate,
    statePlayMode.draw,
    statePlayMode.resign,
    statePlayMode.leave,
    statePlayMode.play.jwt_decoded.min,
    intervalId,
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
