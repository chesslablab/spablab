import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/fen/panel/StartedButtons';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import SanMovesBrowser from 'features/panel/SanMovesBrowser';
import Heuristics from 'features/Heuristics';
import StockfishEval from 'features/StockfishEval';
import TutorFen from 'features/TutorFen';
import styles from 'styles/panel';

const FenPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={7} sx={styles.panel}>
        <Buttons />
        <ButtonsDialogs />
        <SanMovesBrowser />
        <StartedButtons />
      </Grid>
      <Grid item xs={12} md={5} sx={styles.info}>
        <StockfishEval />
        <TutorFen />
        <Heuristics />
      </Grid>
    </Grid>
  );
};

export default FenPanel;
