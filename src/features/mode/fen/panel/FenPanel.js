import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/fen/panel/StartedButtons';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import SanMovesBrowser from 'features/panel/SanMovesBrowser';
import styles from 'styles/panel';

const FenPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <SanMovesBrowser />
      </Grid>
      <Grid item xs={12}>
        <Buttons />
        <ButtonsDialogs />
        <StartedButtons />
      </Grid>
    </Grid>
  );
};

export default FenPanel;
