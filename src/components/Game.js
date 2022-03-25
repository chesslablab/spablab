import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DrawAcceptDialog from './Dialog/DrawAcceptDialog';
import DrawOfferDialog from './Dialog/DrawOfferDialog';
import HeuristicPictureDialog from './Dialog/HeuristicPictureDialog';
import RematchAcceptDialog from './Dialog/RematchAcceptDialog';
import RematchOfferDialog from './Dialog/RematchOfferDialog';
import ResignAcceptDialog from './Dialog/ResignAcceptDialog';
import TakebackAcceptDialog from './Dialog/TakebackAcceptDialog';
import TakebackOfferDialog from './Dialog/TakebackOfferDialog';
import GameClock from './GameClock/GameClock';
import { default as PlayFriendModeButtons } from './PlayFriendMode/Buttons.js';
import MoveValidatorTable from './Table/MoveValidatorTable.js';
import GameButtons from './GameButtons.js';
import History from './History';

const useStyles = makeStyles({
  box: {
    background: '#f6f6f6',
    marginBottom: 15,
  },
  pgn: {
    height: 230,
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
      <Grid item xs={12} className={classes.box}>
        <Grid item xs={12} className={classes.pgn}>
          <Grid item xs={12} className={classes.centered}>
            <History />
          </Grid>
          <Grid item xs={12} className={classes.centered}>
            <GameClock />
          </Grid>
          <Grid item xs={12}>
            <MoveValidatorTable />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.centered}>
          <GameButtons />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PlayFriendModeButtons />
      </Grid>
      <DrawAcceptDialog />
      <DrawOfferDialog />
      <HeuristicPictureDialog />
      <RematchAcceptDialog />
      <RematchOfferDialog />
      <ResignAcceptDialog />
      <TakebackAcceptDialog />
      <TakebackOfferDialog />
    </Grid>
  );
};

export default Game;
