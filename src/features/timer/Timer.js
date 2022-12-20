import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import BlackTimer from './BlackTimer';
import WhiteTimer from './WhiteTimer';
import * as modeConst from '../../features/mode/modeConst';

const Timer = () => {
  const state = useSelector(state => state);

  if (state.mode.name === modeConst.PLAY) {
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
