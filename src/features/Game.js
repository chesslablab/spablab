import React from 'react';
import { Grid } from '@mui/material';
import FinishedButtonsPlayMode from 'features/mode/play/FinishedButtonsPlayMode';
import FinishedDialogsPlayMode from 'features/mode/play/FinishedDialogsPlayMode';
import StartedButtonsPlayMode from 'features/mode/play/StartedButtonsPlayMode';
import StartedDialogsPlayMode from 'features/mode/play/StartedDialogsPlayMode';
import Timer from 'features/mode/play/timer/Timer';
import PgnTable from 'features/PgnTable';
import PgnTableButtons from 'features/PgnTableButtons';
import PgnTableDialogs from 'features/PgnTableDialogs';
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
      <PgnTableDialogs />
      <StartedDialogsPlayMode />
      <FinishedDialogsPlayMode />
    </Grid>
  );
};

export default Game;
