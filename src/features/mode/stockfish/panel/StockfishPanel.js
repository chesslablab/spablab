import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/stockfish/panel/StartedButtons';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import SanMovesBrowser from 'features/panel/SanMovesBrowser';
import styles from 'styles/panel';

const StockfishPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={7} sx={styles.panel}>
        <SanMovesBrowser />
        <StartedButtons />
      </Grid>
      <Grid item xs={12} md={5}>
        <Buttons />
        <ButtonsDialogs />
      </Grid>
    </Grid>
  );
};

export default StockfishPanel;
