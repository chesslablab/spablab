import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/san/panel/StartedButtons';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import GameMetadataTable from 'features/panel/GameMetadataTable';
import SanMovesBrowser from 'features/panel/SanMovesBrowser';
import styles from 'styles/panel';

const SanPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <GameMetadataTable />
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

export default SanPanel;
