import { Grid } from '@mui/material';
import GameMetadataTable from 'features/panel/GameMetadataTable';
import RavButtons from 'features/mode/rav/panel/RavButtons';
import RavMovesBrowser from 'features/mode/rav/panel/RavMovesBrowser';
import styles from 'styles/panel';

const RavPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <GameMetadataTable />
        <RavMovesBrowser />
        <RavButtons />
      </Grid>
    </Grid>
  );
};

export default RavPanel;
