import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import InfoAlert from './alert/InfoAlert.js';
import CreateInviteCodeDialog from './dialog/CreateInviteCodeDialog';
import EnterInviteCodeDialog from './dialog/EnterInviteCodeDialog';
import OpeningSearchEcoDialog from './dialog/OpeningSearchEcoDialog';
import OpeningSearchMovetextDialog from './dialog/OpeningSearchMovetextDialog';
import OpeningSearchNameDialog from './dialog/OpeningSearchNameDialog';
import LoadFenDialog from './dialog/LoadFenDialog';
import LoadPgnDialog from './dialog/LoadPgnDialog';
import PlayLikeGrandmasterDialog from './dialog/PlayLikeGrandmasterDialog';
import PlayOnlineDialog from './dialog/PlayOnlineDialog';
import ProgressDialog from './dialog/ProgressDialog';
import WatchDialog from './dialog/WatchDialog';
import OpeningAnalysisTable from './table/OpeningAnalysisTable.js';
import GameTable from './table/GameTable.js';
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
