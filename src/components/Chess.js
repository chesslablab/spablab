import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InfoAlert from './Alert/InfoAlert.js';
import ChessOpeningSearchEcoDialog from './Dialog/ChessOpeningSearchEcoDialog';
import ChessOpeningSearchMovetextDialog from './Dialog/ChessOpeningSearchMovetextDialog';
import ChessOpeningSearchNameDialog from './Dialog/ChessOpeningSearchNameDialog';
import CreateInviteCodeDialog from './Dialog/CreateInviteCodeDialog';
import EnterInviteCodeDialog from './Dialog/EnterInviteCodeDialog';
import FenDialog from './Dialog/FenDialog';
import ProgressDialog from './Dialog/ProgressDialog';
import LoadFenDialog from './Dialog/LoadFenDialog';
import LoadPgnDialog from './Dialog/LoadPgnDialog';
import PlayLikeGrandmasterDialog from './Dialog/PlayLikeGrandmasterDialog';
import ChessOpeningAnalysisTable from './Table/ChessOpeningAnalysisTable.js';
import TournamentGameTable from './Table/TournamentGameTable.js';
import Board from './Board.js';
import Buttons from './Buttons.js';
import Game from './Game.js';
import '../index.css';
import store from '../store';

const useStyles = makeStyles({
  right: {
    textAlign: 'right',
  },
});

const Chess = ({ props }) => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} className={classes.right}>
          <Buttons props={props} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Board props={props} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Game />
          <ChessOpeningAnalysisTable />
          <TournamentGameTable />
          <InfoAlert />
        </Grid>
      </Grid>
      <ChessOpeningSearchEcoDialog props={props} />
      <ChessOpeningSearchMovetextDialog props={props} />
      <ChessOpeningSearchNameDialog props={props} />
      <CreateInviteCodeDialog />
      <EnterInviteCodeDialog />
      <FenDialog />
      <ProgressDialog />
      <LoadFenDialog />
      <LoadPgnDialog />
      <PlayLikeGrandmasterDialog />
    </Provider>
  );
};

export default Chess;
