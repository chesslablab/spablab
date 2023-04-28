import React from 'react';
import { Provider } from 'react-redux';
import { Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import 'index.css';
import 'assets/css/fonts.css';
import store from 'app/store';
import theme from 'styles/theme.js';
import VariantBoard from 'features/board/VariantBoard';
import InfoAlert from 'features/alert/InfoAlert.js';
import CheckmateSkillsDialog from 'features/dialog/CheckmateSkillsDialog';
import EndgameSkillsDialog from 'features/dialog/EndgameSkillsDialog';
import EventsStatsDialog from 'features/dialog/EventsStatsDialog';
import LoadFenDialog from 'features/dialog/LoadFenDialog';
import LoadPgnDialog from 'features/dialog/LoadPgnDialog';
import OpeningsStatsDialog from 'features/dialog/OpeningsStatsDialog';
import PlayersStatsDialog from 'features/dialog/PlayersStatsDialog';
import SearchGamesDialog from 'features/dialog/SearchGamesDialog';
import SearchEcoDialog from 'features/dialog/SearchEcoDialog';
import SearchMovetextDialog from 'features/dialog/SearchMovetextDialog';
import SearchNameDialog from 'features/dialog/SearchNameDialog';
import ProgressDialog from 'features/dialog/ProgressDialog';
import SettingsDialog from 'features/dialog/SettingsDialog';
import StartedButtonsAnalysisMode from 'features/mode/analysis/StartedButtonsAnalysisMode';
import StartedButtonsPgnMode from 'features/mode/pgn/StartedButtonsPgnMode';
import StartedButtonsStockfishMode from 'features/mode/stockfish/StartedButtonsStockfishMode';
import StartedButtonsGmMode from 'features/mode/gm//StartedButtonsGmMode';
import GameTable from 'features/table/GameTable';
import OpeningAnalysisTable from 'features/table/OpeningAnalysisTable';
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
            <MainButtons props={props} />
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
            <StartedButtonsPgnMode />
            <StartedButtonsStockfishMode />
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
        <SettingsDialog />
        <ProgressDialog />
      </Provider>
    </ThemeProvider>
  );
};

export default Chess;
