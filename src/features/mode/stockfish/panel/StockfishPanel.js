import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/stockfish/panel/StartedButtons';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import MovesBrowser from 'features/panel/MovesBrowser';
import OpeningTable from 'features/panel/OpeningTable';
import styles from 'styles/panel';

const StockfishPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <MovesBrowser />
        <Buttons />
        <ButtonsDialogs />
      </Grid>
      <Grid item xs={12}>
        <StartedButtons />
        <OpeningTable />
      </Grid>
    </Grid>
  );
};

export default StockfishPanel;
