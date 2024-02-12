'use client'

import { Grid } from '@mui/material';
import RavButtons from 'features/mode/rav/panel/RavButtons';
import RavMovesBrowser from 'features/mode/rav/panel/RavMovesBrowser';
import styles from 'styles/panel';

const RavPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <RavMovesBrowser />
      </Grid>
      <Grid item xs={12}>
        <RavButtons />
      </Grid>
    </Grid>
  );
};

export default RavPanel;
