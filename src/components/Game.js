import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GameClock from '../features/gameClock/GameClock';
import StartedButtonsGrandmasterMode from '../features/grandmasterMode/StartedButtonsGrandmasterMode';
import FinishedButtonsPlayMode from '../features/playMode/FinishedButtonsPlayMode';
import FinishedDialogsPlayMode from '../features/playMode/FinishedDialogsPlayMode';
import StartedButtonsPlayMode from '../features/playMode/StartedButtonsPlayMode';
import StartedDialogsPlayMode from '../features/playMode/StartedDialogsPlayMode';
import MoveValidatorTable from '../features/table/MoveValidatorTable.js';
import SecondaryButtons from '../features/SecondaryButtons.js';
import SecondaryDialogs from './SecondaryDialogs';
import History from '../features/History';

const useStyles = makeStyles({
  gameBox: {
    background: '#f6f6f6',
  },
  pgn: {
    height: 205,
  },
  centered: {
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
          <Grid item xs={12} className={classes.centered}>
            <History />
          </Grid>
          <Grid item xs={12}>
            <MoveValidatorTable />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.centered}>
          <SecondaryButtons props={props} />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.centered}>
        <GameClock />
      </Grid>
      <Grid item xs={12}>
        <StartedButtonsGrandmasterMode />
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
