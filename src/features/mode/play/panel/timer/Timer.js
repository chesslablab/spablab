import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import BlackTimer from 'features/mode/play/panel/timer/BlackTimer';
import WhiteTimer from 'features/mode/play/panel/timer/WhiteTimer';

const Timer = () => {
  const state = useSelector(state => state);

  if (state.playMode.active) {
    if (state.playMode.accepted) {
      return (
        <Box sx={{ mt: 1.5 }}>
          <WhiteTimer key={`w${state.playMode.timer.w}`} />
          <BlackTimer key={`b${state.playMode.timer.w}`} />
        </Box>
      );
    }
  }

  return null;
}

export default Timer;
