import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/play/panel/StartedButtons';
import FinishedButtons from 'features/mode/play/panel/FinishedButtons';
import Timer from 'features/mode/play/panel/timer/Timer';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import MovesBrowser from 'features/panel/MovesBrowser';
import OpeningTable from 'features/panel/OpeningTable';
import styles from 'styles/panel';

const PlayPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <MovesBrowser />
        <Buttons />
        <ButtonsDialogs />
      </Grid>
      <Grid item xs={12}>
        <Timer />
        <StartedButtons />
        <FinishedButtons />
        <OpeningTable />
      </Grid>
    </Grid>
  );
};

export default PlayPanel;
