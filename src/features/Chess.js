import React from 'react';
import { Provider } from 'react-redux';
import { Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import store from 'app/store';
import VariantBoard from 'features/board/VariantBoard';
import InfoAlert from 'features/alert/InfoAlert.js';
import CheckmateSkillsDialog from 'features/dialog/CheckmateSkillsDialog';
import CreateInboxCodeDialog from 'features/dialog/CreateInboxCodeDialog';
import EndgameSkillsDialog from 'features/dialog/EndgameSkillsDialog';
import EnterInboxCodeDialog from 'features/dialog/EnterInboxCodeDialog';
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
import StartedButtonsFenMode from 'features/mode/fen/StartedButtonsFenMode';
import StartedButtonsGmMode from 'features/mode/gm/StartedButtonsGmMode';
import StartedButtonsPgnMode from 'features/mode/pgn/StartedButtonsPgnMode';
import StartedButtonsStockfishMode from 'features/mode/stockfish/StartedButtonsStockfishMode';
import GameTable from 'features/table/GameTable';
import OpeningAnalysisTable from 'features/table/OpeningAnalysisTable';
import Game from 'features/Game';
import HeuristicsBar from 'features/HeuristicsBar';
import MainButtons from 'features/MainButtons';
import PlayButtons from 'features/PlayButtons';
import theme from 'styles/theme.js';

const styles = {
  right: {
    textAlign: 'right',
  },
};

const Chess = ({ props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Grid container spacing={2}>
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
            <StartedButtonsGmMode />
            <StartedButtonsFenMode />
            <StartedButtonsPgnMode />
            <StartedButtonsStockfishMode />
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
        <CreateInboxCodeDialog />
        <EnterInboxCodeDialog />
        <SettingsDialog />
        <ProgressDialog />
      </Provider>
    </ThemeProvider>
  );
};

export default Chess;
