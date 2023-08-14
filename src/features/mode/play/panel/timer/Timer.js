import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import BlackTimer from 'features/mode/play/panel/timer/BlackTimer';
import WhiteTimer from 'features/mode/play/panel/timer/WhiteTimer';
import styles from 'styles/panel';

const Timer = () => {
  const state = useSelector(state => state);

  if (state.playMode.active) {
    if (state.playMode.accepted) {
      return (
        <Box sx={styles.panel.timer}>
          <WhiteTimer key={`w${state.playMode.timer.w}`} />
          <BlackTimer key={`b${state.playMode.timer.w}`} />
        </Box>
      );
    }
  }

  return null;
}

export default Timer;
