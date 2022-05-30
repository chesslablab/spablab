import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GameClock from './GameClock/GameClock';
import FinishedButtonsPlayMode from './PlayMode/FinishedButtonsPlayMode';
import FinishedDialogsPlayMode from './PlayMode/FinishedDialogsPlayMode';
import InvitedButtonsPlayMode from './PlayMode/InvitedButtonsPlayMode';
import InvitedDialogsPlayMode from './PlayMode/InvitedDialogsPlayMode';
import MoveValidatorTable from './Table/MoveValidatorTable.js';
import SecondaryButtons from './SecondaryButtons.js';
import SecondaryDialogs from './SecondaryDialogs';
import History from './History';

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
        <InvitedButtonsPlayMode />
        <FinishedButtonsPlayMode />
      </Grid>
      <SecondaryDialogs />
      <InvitedDialogsPlayMode />
      <FinishedDialogsPlayMode />
    </Grid>
  );
};

export default Game;
