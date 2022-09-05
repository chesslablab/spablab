import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import '../index.css';
import store from '../app/store';
import InfoAlert from './alert/InfoAlert.js';
import StartedButtonsAnalysisMode from './analysisMode/StartedButtonsAnalysisMode';
import CheckmateSkillsDialog from './dialog/CheckmateSkillsDialog';
import LoadFenDialog from './dialog/LoadFenDialog';
import LoadPgnDialog from './dialog/LoadPgnDialog';
import OpeningsStatsDialog from './dialog/OpeningsStatsDialog';
import SearchGamesDialog from './dialog/SearchGamesDialog';
import SearchEcoDialog from './dialog/SearchEcoDialog';
import SearchMovetextDialog from './dialog/SearchMovetextDialog';
import SearchNameDialog from './dialog/SearchNameDialog';
import ProgressDialog from './dialog/ProgressDialog';
import WatchDialog from './dialog/WatchDialog';
import StartedButtonsGmMode from './gmMode/StartedButtonsGmMode';
import OpeningAnalysisTable from './table/OpeningAnalysisTable';
import GameTable from './table/GameTable';
import Board from './Board';
import Game from './Game';
import HeuristicsBar from './HeuristicsBar';
import MainButtons from './MainButtons';
import PlayButtons from './PlayButtons';

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
        <Grid item xs={12} md={2}>
          <PlayButtons />
        </Grid>
      </Grid>
      <CheckmateSkillsDialog />
      <LoadFenDialog />
      <OpeningsStatsDialog />
      <SearchGamesDialog props={props} />
      <SearchEcoDialog props={props} />
      <SearchMovetextDialog props={props} />
      <SearchNameDialog props={props} />
      <WatchDialog />
      <ProgressDialog />
    </Provider>
  );
};

export default Chess;
