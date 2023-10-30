import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/play/panel/StartedButtons';
import FinishedButtons from 'features/mode/play/panel/FinishedButtons';
import Timer from 'features/mode/play/panel/timer/Timer';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import SanMovesBrowser from 'features/panel/SanMovesBrowser';
import styles from 'styles/panel';

const PlayPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <SanMovesBrowser />
      </Grid>
      <Grid item xs={12}>
        <Buttons />
        <ButtonsDialogs />
        <Timer />
        <StartedButtons />
        <FinishedButtons />
      </Grid>
    </Grid>
  );
};

export default PlayPanel;
