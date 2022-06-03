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
import ProgressDialog from '../features/dialog/ProgressDialog';
import LoadFenDialog from '../features/dialog/LoadFenDialog';
import LoadPgnDialog from '../features/dialog/LoadPgnDialog';
import PlayLikeGrandmasterDialog from './Dialog/PlayLikeGrandmasterDialog';
import PlayOnlineDialog from './Dialog/PlayOnlineDialog';
import WatchDialog from '../features/dialog/WatchDialog';
import ChessOpeningAnalysisTable from './Table/ChessOpeningAnalysisTable.js';
import GameTable from './Table/GameTable.js';
import Board from './Board.js';
import Game from './Game.js';
import HeuristicsBar from './HeuristicsBar.js';
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
            <MainButtons />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Board props={props} />
          <HeuristicsBar />
        </Grid>
        <Grid item xs={12} md={3}>
          <Game props={props} />
          <ChessOpeningAnalysisTable />
          <GameTable />
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
      <PlayOnlineDialog />
      <WatchDialog />
    </Provider>
  );
};

export default Chess;
