import React from 'react';
import { Grid } from '@mui/material';
import GameMetadataTable from 'features/panel/GameMetadataTable';
import History from 'features/panel/History';
import RavButtons from 'features/mode/rav/panel/RavButtons';
import RavMovesTable from 'features/mode/rav/panel/RavMovesTable';
import styles from 'styles/panel/styles';

const RavPanel = ({ props }) => {
  return (
    <Grid item xs={12} sx={styles.panel}>
      <GameMetadataTable />
      <History />
      <Grid item xs={12} sx={styles.moves}>
        <RavMovesTable />
      </Grid>
      <RavButtons props={props} />
    </Grid>
  );
};

export default RavPanel;
