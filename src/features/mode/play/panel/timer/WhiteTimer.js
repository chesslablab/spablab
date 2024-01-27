import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pgn } from '@chesslablab/reactblab';
import { Box } from '@mui/material';
import * as actionConst from 'features/mode/actionConst';
import * as playMode from 'features/mode/playModeSlice';

const WhiteTimer = () => {
  const stateBoard = useSelector(state => state.board);

  const statePlayMode = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const [count, setCount] = useState(statePlayMode.timer.w);

  const [intervalId, setIntervalId] = useState(0);

  const counter = useCallback(() => setInterval(() => {
    setCount(prevCount => prevCount - 1);
  }, 1000), [
    setCount,
  ]);

  useEffect(() => {
    if (stateBoard.turn === Pgn.symbol.WHITE) {
      setIntervalId(counter());
    }
  }, [
    stateBoard.turn,
    counter,
  ]);

  useEffect(() => {
    if (stateBoard.turn === Pgn.symbol.BLACK) {
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
      statePlayMode.draw === actionConst.ACCEPT ||
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
    <Box component="span" style={{ marginRight: 10 }}>
      { h > 0 ? `${h}:${m}:${s}` : `${m}:${s}` }
    </Box>
  );
}

export default WhiteTimer;
