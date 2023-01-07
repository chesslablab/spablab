import React from 'react';
import { Provider } from 'react-redux';
import { Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import '../index.css';
import '../assets/css/fonts.css';
import store from '../app/store';
import theme from '../styles/theme.js';
import VariantBoard from './board/VariantBoard';
import InfoAlert from './alert/InfoAlert.js';
import CheckmateSkillsDialog from './dialog/CheckmateSkillsDialog';
import EndgameSkillsDialog from './dialog/EndgameSkillsDialog';
import EventsStatsDialog from './dialog/EventsStatsDialog';
import LoadFenDialog from './dialog/LoadFenDialog';
import LoadPgnDialog from './dialog/LoadPgnDialog';
import OpeningsStatsDialog from './dialog/OpeningsStatsDialog';
import PlayersStatsDialog from './dialog/PlayersStatsDialog';
import SearchGamesDialog from './dialog/SearchGamesDialog';
import SearchEcoDialog from './dialog/SearchEcoDialog';
import SearchMovetextDialog from './dialog/SearchMovetextDialog';
import SearchNameDialog from './dialog/SearchNameDialog';
import ProgressDialog from './dialog/ProgressDialog';
import WatchDialog from './dialog/WatchDialog';
import StartedButtonsAnalysisMode from './mode/analysis/StartedButtonsAnalysisMode';
import StartedButtonsGmMode from './mode/gm//StartedButtonsGmMode';
import GameTable from './table/GameTable';
import OpeningAnalysisTable from './table/OpeningAnalysisTable';
import Game from './Game';
import HeuristicsBar from './HeuristicsBar';
import MainButtons from './MainButtons';
import PlayButtons from './PlayButtons';

const styles = {
  right: {
    textAlign: 'right',
  },
};

const Chess = ({ props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={2} sx={styles.right}>
            <MainButtons />
          </Grid>
          <Grid item xs={12} md={4}>
            <VariantBoard props={props} />
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
        <EndgameSkillsDialog />
        <LoadFenDialog />
        <LoadPgnDialog />
        <OpeningsStatsDialog />
        <PlayersStatsDialog props={props} />
        <EventsStatsDialog props={props} />
        <SearchGamesDialog props={props} />
        <SearchEcoDialog props={props} />
        <SearchMovetextDialog props={props} />
        <SearchNameDialog props={props} />
        <WatchDialog />
        <ProgressDialog />
      </Provider>
    </ThemeProvider>
  );
};

export default Chess;
