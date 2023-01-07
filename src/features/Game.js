import React from 'react';
import { Grid } from '@mui/material';
import Timer from './timer/Timer';
import FinishedButtonsPlayMode from './mode/play/FinishedButtonsPlayMode';
import FinishedDialogsPlayMode from './mode/play/FinishedDialogsPlayMode';
import StartedButtonsPlayMode from './mode/play/StartedButtonsPlayMode';
import StartedDialogsPlayMode from './mode/play/StartedDialogsPlayMode';
import MoveValidatorTable from './table/MoveValidatorTable';
import SecondaryButtons from './SecondaryButtons';
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
            <MoveValidatorTable />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={styles.buttons}>
          <SecondaryButtons props={props} />
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
