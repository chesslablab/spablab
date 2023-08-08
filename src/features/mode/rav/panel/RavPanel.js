import React from 'react';
import { Grid } from '@mui/material';
import GameMetadataTable from 'features/panel/GameMetadataTable';
import History from 'features/panel/History';
import RavButtons from 'features/mode/rav/panel/RavButtons';
import RavMovesTable from 'features/mode/rav/panel/RavMovesTable';
import styles from 'features/panel/styles';

const RavPanel = ({ props }) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <GameMetadataTable />
        <Grid item xs={12} sx={styles.moves}>
          <Grid item xs={12} sx={styles.buttons}>
            <History />
          </Grid>
          <Grid item xs={12}>
            <RavMovesTable />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={styles.buttons}>
          <RavButtons props={props} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RavPanel;
