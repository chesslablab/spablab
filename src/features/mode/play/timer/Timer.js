import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Dispatcher from 'common/Dispatcher';
import BlackTimer from 'features/mode/play/timer/BlackTimer';
import WhiteTimer from 'features/mode/play/timer/WhiteTimer';
import * as modeConst from 'features/mode/modeConst';

const Timer = () => {
  const state = useSelector(state => state);

  if (Dispatcher.activeMode() === modeConst.PLAY) {
    if (state.mode.play.accepted) {
      return (
        <Box sx={{ mt: 1.5 }}>
          <WhiteTimer /><BlackTimer />
        </Box>
      );
    }
  }

  return null;
}

export default Timer;
