import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import '../index.css';
import store from '../app/store';
import InfoAlert from './alert/InfoAlert.js';
import StartedButtonsAnalysisMode from './analysisMode/StartedButtonsAnalysisMode';
import CheckmateSkillsDialog from './dialog/CheckmateSkillsDialog';
import CreateInviteCodeDialog from './dialog/CreateInviteCodeDialog';
import DatabaseDialog from './dialog/DatabaseDialog';
import EnterInviteCodeDialog from './dialog/EnterInviteCodeDialog';
import SearchEcoDialog from './dialog/SearchEcoDialog';
import SearchMovetextDialog from './dialog/SearchMovetextDialog';
import SearchNameDialog from './dialog/SearchNameDialog';
import LoadFenDialog from './dialog/LoadFenDialog';
import LoadPgnDialog from './dialog/LoadPgnDialog';
import PlayComputerDialog from './dialog/PlayComputerDialog';
import PlayOnlineDialog from './dialog/PlayOnlineDialog';
import ProgressDialog from './dialog/ProgressDialog';
import WatchDialog from './dialog/WatchDialog';
import StartedButtonsGmMode from './gmMode/StartedButtonsGmMode';
import OpeningAnalysisTable from './table/OpeningAnalysisTable.js';
import GameTable from './table/GameTable.js';
import Board from './Board.js';
import Game from './Game.js';
import HeuristicsBar from './HeuristicsBar.js';
import MainButtons from './MainButtons.js';

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
      <Grid container spacing={1}>
        <Grid item xs={12} md={2} className={classes.right}>
          <MainButtons />
        </Grid>
        <Grid item xs={12} md={4}>
          <Board props={props} />
          <HeuristicsBar />
        </Grid>
        <Grid item xs={12} md={3}>
          <Game props={props} />
          <GameTable />
          <OpeningAnalysisTable />
          <StartedButtonsAnalysisMode />
          <StartedButtonsGmMode />
          <InfoAlert />
        </Grid>
      </Grid>
      <DatabaseDialog props={props} />
      <SearchEcoDialog props={props} />
      <SearchMovetextDialog props={props} />
      <SearchNameDialog props={props} />
      <CreateInviteCodeDialog />
      <EnterInviteCodeDialog />
      <CheckmateSkillsDialog />
      <ProgressDialog />
      <LoadFenDialog />
      <LoadPgnDialog />
      <PlayComputerDialog />
      <PlayOnlineDialog />
      <WatchDialog />
    </Provider>
  );
};

export default Chess;
