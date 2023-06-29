import React from 'react';
import { Grid } from '@mui/material';
import History from 'features/panel/History';
import RavButtons from 'features/panel/rav/RavButtons';
import RavTable from 'features/panel/rav/RavTable';

const styles = {
  gameBox: {
    background: '#f6f6f6',
  },
  moves: {
    height: 397,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    background: '#f0f0f0'
  },
  timer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const RavPanel = ({ props }) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.gameBox}>
        <Grid item xs={12} sx={styles.moves}>
          <Grid item xs={12} sx={styles.buttons}>
            <History />
          </Grid>
          <Grid item xs={12}>
            <RavTable />
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
