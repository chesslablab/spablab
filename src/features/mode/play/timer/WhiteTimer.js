import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Pgn from 'common/Pgn';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as playMode from 'features/mode/playModeSlice';

const WhiteTimer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const now = new Date();
  const [expiration] = useState(now.setSeconds(now.getSeconds() + state.playMode.timer.w));

  const calculateTimeLeft = () => {
    const diff = expiration - new Date();
    let timeLeft = {};

    if (diff > 0) {
      timeLeft = {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      if (state.board.turn === Pgn.symbol.WHITE) {
        setTimeLeft(calculateTimeLeft());
      }
    }, 1000);
  });

  return (
    <Box component="span" style={{ marginRight: 10 }}>
      {timeLeft.minutes}:{timeLeft.seconds}
    </Box>
  );
}

export default WhiteTimer;
