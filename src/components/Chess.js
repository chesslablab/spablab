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
import ProgressDialog from './Dialog/ProgressDialog';
import LoadFenDialog from './Dialog/LoadFenDialog';
import LoadPgnDialog from './Dialog/LoadPgnDialog';
import PlayLikeGrandmasterDialog from './Dialog/PlayLikeGrandmasterDialog';
import ChessOpeningAnalysisTable from './Table/ChessOpeningAnalysisTable.js';
import TournamentGameTable from './Table/TournamentGameTable.js';
import Board from './Board.js';
import Game from './Game.js';
import MainButtons from './MainButtons.js';
import SupportButtons from './SupportButtons.js';
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
          <Grid item xs={12}>
            <MainButtons props={props} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Board props={props} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Game />
          <ChessOpeningAnalysisTable />
          <TournamentGameTable />
          <InfoAlert />
          <SupportButtons />
        </Grid>
      </Grid>
      <ChessOpeningSearchEcoDialog props={props} />
      <ChessOpeningSearchMovetextDialog props={props} />
      <ChessOpeningSearchNameDialog props={props} />
      <CreateInviteCodeDialog />
      <EnterInviteCodeDialog />
      <ProgressDialog />
      <LoadFenDialog />
      <LoadPgnDialog />
      <PlayLikeGrandmasterDialog />
    </Provider>
  );
};

export default Chess;
