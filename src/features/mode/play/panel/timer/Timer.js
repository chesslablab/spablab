import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import BlackTimer from 'features/mode/play/panel/timer/BlackTimer';
import WhiteTimer from 'features/mode/play/panel/timer/WhiteTimer';
import styles from 'styles/panel';

const Timer = () => {
  const state = useSelector(state => state.playMode);

  if (state.active) {
    if (state.accepted) {
      return (
        <Box sx={styles.panel.timer}>
          <WhiteTimer key={`w${state.timer.w}`} />
          <BlackTimer key={`b${state.timer.w}`} />
        </Box>
      );
    }
  }

  return null;
}

export default Timer;
