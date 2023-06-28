import React from 'react';
import { Grid } from '@mui/material';
import GameTableSanMode from 'features/mode/san/table/GameTableSanMode';
import History from 'features/panel/History';
import OpeningTable from 'features/panel/OpeningTable';
import SanTable from 'features/panel/SanTable';
import SanButtons from 'features/panel/SanButtons';
import SanButtonsDialogs from 'features/panel/SanButtonsDialogs';
import StartedButtons from 'features/panel/san/StartedButtons';

const styles = {
  gameBox: {
    background: '#f6f6f6',
  },
  moves: {
    height: 225,
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

const SanPanel = ({ props }) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.gameBox}>
        <Grid item xs={12} sx={styles.moves}>
          <Grid item xs={12} sx={styles.buttons}>
            <History />
          </Grid>
          <Grid item xs={12}>
            <SanTable />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={styles.buttons}>
          <SanButtons props={props} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <GameTableSanMode />
        <StartedButtons />
        <OpeningTable />
      </Grid>
      <SanButtonsDialogs />
    </Grid>
  );
};

export default SanPanel;
