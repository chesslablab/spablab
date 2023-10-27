import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/san/panel/StartedButtons';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import GameMetadataTable from 'features/panel/GameMetadataTable';
import MovesBrowser from 'features/panel/MovesBrowser';
import OpeningTable from 'features/panel/OpeningTable';
import styles from 'styles/panel';

const SanPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <GameMetadataTable />
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

export default SanPanel;
