import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChessOpeningAnalysisAlert from './Alert/ChessOpeningAnalysisAlert.js';
import ChessOpeningSearchEcoDialog from './Dialog/ChessOpeningSearchEcoDialog';
import ChessOpeningSearchMovetextDialog from './Dialog/ChessOpeningSearchMovetextDialog';
import ChessOpeningSearchNameDialog from './Dialog/ChessOpeningSearchNameDialog';
import CreateInviteCodeDialog from './Dialog/CreateInviteCodeDialog';
import DrawAcceptDialog from './Dialog/DrawAcceptDialog';
import DrawOfferDialog from './Dialog/DrawOfferDialog';
import EnterInviteCodeDialog from './Dialog/EnterInviteCodeDialog';
import FenDialog from './Dialog/FenDialog';
import ProgressDialog from './Dialog/ProgressDialog';
import HeuristicPictureDialog from './Dialog/HeuristicPictureDialog';
import LoadFenDialog from './Dialog/LoadFenDialog';
import LoadPgnDialog from './Dialog/LoadPgnDialog';
import PlayLikeGrandmasterDialog from './Dialog/PlayLikeGrandmasterDialog';
import RematchAcceptDialog from './Dialog/RematchAcceptDialog';
import RematchOfferDialog from './Dialog/RematchOfferDialog';
import ResignAcceptDialog from './Dialog/ResignAcceptDialog';
import TakebackAcceptDialog from './Dialog/TakebackAcceptDialog';
import TakebackOfferDialog from './Dialog/TakebackOfferDialog';
import GameClock from './GameClock/GameClock';
import { default as ButtonsPlayFriendMode } from './PlayFriendMode/Buttons.js';
import Board from './Board.js';
import Buttons from './Buttons.js';
import History from './History';
import InfoAlert from './InfoAlert.js';
import MoveValidator from './MoveValidator.js';
import '../index.css';
import store from '../store';

const useStyles = makeStyles({
  paper: {
    padding: 10,
  },
});

const Chess = ({ props }) => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Buttons props={props} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper className={classes.paper}>
            <History />
            <GameClock />
            <MoveValidator />
            <ButtonsPlayFriendMode />
          </Paper>
          <ChessOpeningAnalysisAlert />
          <InfoAlert />
        </Grid>
        <Grid item xs={12} md={6}>
          <Board props={props} />
        </Grid>
      </Grid>
      <ChessOpeningSearchEcoDialog props={props} />
      <ChessOpeningSearchMovetextDialog props={props} />
      <ChessOpeningSearchNameDialog props={props} />
      <CreateInviteCodeDialog />
      <DrawAcceptDialog />
      <DrawOfferDialog />
      <EnterInviteCodeDialog />
      <FenDialog />
      <ProgressDialog />
      <HeuristicPictureDialog />
      <LoadFenDialog />
      <LoadPgnDialog />
      <PlayLikeGrandmasterDialog />
      <RematchAcceptDialog />
      <RematchOfferDialog />
      <ResignAcceptDialog />
      <TakebackAcceptDialog />
      <TakebackOfferDialog />
    </Provider>
  );
};

export default Chess;
