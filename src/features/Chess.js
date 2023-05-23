import React from 'react';
import { Provider } from 'react-redux';
import { Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import store from 'app/store';
import VariantBoard from 'features/board/VariantBoard';
import InfoAlert from 'features/alert/InfoAlert.js';
import CheckmateSkillsDialog from 'features/dialog/CheckmateSkillsDialog';
import CreateInboxCodeDialog from 'features/dialog/CreateInboxCodeDialog';
import CreateInviteCodeDialog from 'features/dialog/CreateInviteCodeDialog';
import EndgameSkillsDialog from 'features/dialog/EndgameSkillsDialog';
import EnterInboxCodeDialog from 'features/dialog/EnterInboxCodeDialog';
import EnterInviteCodeDialog from 'features/dialog/EnterInviteCodeDialog';
import EventsStatsDialog from 'features/dialog/EventsStatsDialog';
import LoadFenDialog from 'features/dialog/LoadFenDialog';
import LoadPgnDialog from 'features/dialog/LoadPgnDialog';
import OpeningsStatsDialog from 'features/dialog/OpeningsStatsDialog';
import PlayComputerDialog from 'features/dialog/PlayComputerDialog';
import PlayersStatsDialog from 'features/dialog/PlayersStatsDialog';
import PlayOnlineDialog from 'features/dialog/PlayOnlineDialog';
import SearchGamesDialog from 'features/dialog/SearchGamesDialog';
import SearchEcoDialog from 'features/dialog/SearchEcoDialog';
import SearchMovetextDialog from 'features/dialog/SearchMovetextDialog';
import SearchNameDialog from 'features/dialog/SearchNameDialog';
import ProgressDialog from 'features/dialog/ProgressDialog';
import SettingsDialog from 'features/dialog/SettingsDialog';
import StartedButtonsFenMode from 'features/mode/fen/StartedButtonsFenMode';
import StartedButtonsGmMode from 'features/mode/gm/StartedButtonsGmMode';
import StartedButtonsPgnMode from 'features/mode/pgn/StartedButtonsPgnMode';
import StartedButtonsStockfishMode from 'features/mode/stockfish/StartedButtonsStockfishMode';
import GameTable from 'features/table/GameTable';
import OpeningAnalysisTable from 'features/table/OpeningAnalysisTable';
import Game from 'features/Game';
import HeuristicsBar from 'features/HeuristicsBar';
import Nav from 'features/Nav';
import theme from 'styles/theme.js';

const Chess = ({ props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Nav props={props} />
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={4}>
            <VariantBoard props={props} />
            <HeuristicsBar />
          </Grid>
          <Grid item xs={12} md={4}>
            <Game props={props} />
            <GameTable />
            <OpeningAnalysisTable />
            <StartedButtonsGmMode />
            <StartedButtonsFenMode />
            <StartedButtonsPgnMode />
            <StartedButtonsStockfishMode />
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
        </Grid>
        <LoadFenDialog />
        <LoadPgnDialog />
        <OpeningsStatsDialog />
        <PlayersStatsDialog props={props} />
        <EventsStatsDialog props={props} />
        <PlayComputerDialog />
        <CreateInviteCodeDialog />
        <EnterInviteCodeDialog />
        <PlayOnlineDialog />
        <SearchGamesDialog props={props} />
        <SearchEcoDialog props={props} />
        <SearchMovetextDialog props={props} />
        <SearchNameDialog props={props} />
        <CheckmateSkillsDialog />
        <EndgameSkillsDialog />
        <CreateInboxCodeDialog />
        <EnterInboxCodeDialog />
        <SettingsDialog />
        <ProgressDialog />
        <InfoAlert />
      </Provider>
    </ThemeProvider>
  );
};

export default Chess;
