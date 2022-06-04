import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InfoAlert from '../features/alert/InfoAlert.js';
import OpeningSearchEcoDialog from '../features/dialog/OpeningSearchEcoDialog';
import OpeningSearchMovetextDialog from '../features/dialog/OpeningSearchMovetextDialog';
import OpeningSearchNameDialog from '../features/dialog/OpeningSearchNameDialog';
import CreateInviteCodeDialog from '../features/dialog/CreateInviteCodeDialog';
import EnterInviteCodeDialog from '../features/dialog/EnterInviteCodeDialog';
import ProgressDialog from '../features/dialog/ProgressDialog';
import LoadFenDialog from '../features/dialog/LoadFenDialog';
import LoadPgnDialog from '../features/dialog/LoadPgnDialog';
import PlayLikeGrandmasterDialog from '../features/dialog/PlayLikeGrandmasterDialog';
import PlayOnlineDialog from '../features/dialog/PlayOnlineDialog';
import WatchDialog from '../features/dialog/WatchDialog';
import OpeningAnalysisTable from '../features/table/OpeningAnalysisTable.js';
import GameTable from '../features/table/GameTable.js';
import Board from '../features/Board.js';
import Game from './Game.js';
import HeuristicsBar from '../features/HeuristicsBar.js';
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
          <OpeningAnalysisTable />
          <GameTable />
          <InfoAlert />
          <SupportButtons />
        </Grid>
      </Grid>
      <OpeningSearchEcoDialog props={props} />
      <OpeningSearchMovetextDialog props={props} />
      <OpeningSearchNameDialog props={props} />
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
