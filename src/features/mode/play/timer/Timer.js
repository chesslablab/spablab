import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import BlackTimer from 'features/mode/play/timer/BlackTimer';
import WhiteTimer from 'features/mode/play/timer/WhiteTimer';

const Timer = () => {
  const state = useSelector(state => state);

  if (state.playMode.active) {
    if (state.playMode.play.accepted) {
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
