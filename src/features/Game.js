import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GameClock from './gameClock/GameClock';
import FinishedButtonsPlayMode from './mode/play/FinishedButtonsPlayMode';
import FinishedDialogsPlayMode from './mode/play/FinishedDialogsPlayMode';
import StartedButtonsPlayMode from './mode/play/StartedButtonsPlayMode';
import StartedDialogsPlayMode from './mode/play/StartedDialogsPlayMode';
import MoveValidatorTable from './table/MoveValidatorTable';
import SecondaryButtons from './SecondaryButtons';
import SecondaryDialogs from './SecondaryDialogs';
import History from './History';

const useStyles = makeStyles({
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
  clock: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const Game = ({ props }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.gameBox}>
        <Grid item xs={12} className={classes.pgn}>
          <Grid item xs={12} className={classes.buttons}>
            <History />
          </Grid>
          <Grid item xs={12}>
            <MoveValidatorTable />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.buttons}>
          <SecondaryButtons props={props} />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.clock}>
        <GameClock />
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
