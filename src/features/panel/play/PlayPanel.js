import React from 'react';
import { Grid } from '@mui/material';
import StartedButtons from 'features/panel/play/StartedButtons';
import StartedDialogs from 'features/panel/play/StartedDialogs';
import FinishedButtons from 'features/panel/play/FinishedButtons';
import FinishedDialogs from 'features/panel/play/FinishedDialogs';
import Timer from 'features/panel/play/timer/Timer';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import History from 'features/panel/History';
import MovesTable from 'features/panel/MovesTable';
import OpeningTable from 'features/panel/OpeningTable';
import styles from 'features/panel/styles';

const PlayPanel = ({ props }) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.gameBox}>
        <Grid item xs={12} sx={styles.moves}>
          <Grid item xs={12} sx={styles.buttons}>
            <History />
          </Grid>
          <Grid item xs={12}>
            <MovesTable />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={styles.buttons}>
          <Buttons props={props} />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={styles.timer}>
        <Timer />
      </Grid>
      <Grid item xs={12}>
        <StartedButtons />
        <FinishedButtons />
        <OpeningTable />
      </Grid>
      <ButtonsDialogs />
      <StartedDialogs />
      <FinishedDialogs />
    </Grid>
  );
};

export default PlayPanel;
