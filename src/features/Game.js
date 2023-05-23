import React from 'react';
import { Grid } from '@mui/material';
import Timer from 'features/timer/Timer';
import FinishedButtonsPlayMode from 'features/mode/play/FinishedButtonsPlayMode';
import FinishedDialogsPlayMode from 'features/mode/play/FinishedDialogsPlayMode';
import StartedButtonsPlayMode from 'features/mode/play/StartedButtonsPlayMode';
import StartedDialogsPlayMode from 'features/mode/play/StartedDialogsPlayMode';
import PgnTable from 'features/table/PgnTable';
import PgnTableButtons from './PgnTableButtons';
import SecondaryDialogs from './SecondaryDialogs';
import History from './History';

const styles = {
  gameBox: {
    background: '#f6f6f6',
  },
  pgn: {
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

const Game = ({ props }) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.gameBox}>
        <Grid item xs={12} sx={styles.pgn}>
          <Grid item xs={12} sx={styles.buttons}>
            <History />
          </Grid>
          <Grid item xs={12}>
            <PgnTable />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={styles.buttons}>
          <PgnTableButtons props={props} />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={styles.timer}>
        <Timer />
      </Grid>
      <Grid item xs={12}>
        <StartedButtonsPlayMode />
        <FinishedButtonsPlayMode />
      </Grid>
      <SecondaryDialogs />
      <StartedDialogsPlayMode />
      <FinishedDialogsPlayMode />
    </Grid>
  );
};

export default Game;
