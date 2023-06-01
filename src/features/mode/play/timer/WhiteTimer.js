import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Pgn from 'common/Pgn';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as playMode from 'features/mode/playModeSlice';

const WhiteTimer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [count, setCount] = useState(state.playMode.timer.w);

  useEffect(() => {
    if (state.board.turn === Pgn.symbol.WHITE && count > 0) {
      setTimeout(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
    } else {
      setCount(state.playMode.timer.w);
    }
  }, [
    state.board.turn,
    state.playMode.timer.w,
    count,
  ]);

  useEffect(() => {
    if (count <= 0) {
      dispatch(playMode.timeOut());
      dispatch(infoAlert.show({ mssg: 'Black wins.' }));
    }
  }, [
    count,
    dispatch
  ]);

  return (
    <Box component="span" style={{ marginRight: 10 }}>
      {Math.floor(count / (60 * 60))}:{Math.floor((count / 60) % 60)}:{Math.floor(count % 60)}
    </Box>
  );
}

export default WhiteTimer;
