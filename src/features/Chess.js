import React from 'react';
import { Provider } from 'react-redux';
import { Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import store from 'app/store';
import InfoAlert from 'features/alert/InfoAlert.js';
import WarningAlert from 'features/alert/WarningAlert.js';
import VariantBoard from 'features/board/VariantBoard';
import LoadFenDialog from 'features/mode/fen/dialog/LoadFenDialog';
import LoadPgnDialog from 'features/mode/pgn/dialog/LoadPgnDialog';
import LoadRavDialog from 'features/mode/rav/dialog/LoadRavDialog';
import SearchEcoDialog from 'features/mode/pgn/dialog/SearchEcoDialog';
import SearchGamesDialog from 'features/mode/pgn/dialog/SearchGamesDialog';
import SearchMovetextDialog from 'features/mode/pgn/dialog/SearchMovetextDialog';
import SearchNameDialog from 'features/mode/pgn/dialog/SearchNameDialog';
import CreateInviteCodeDialog from 'features/mode/play/dialog/CreateInviteCodeDialog';
import EnterInviteCodeDialog from 'features/mode/play/dialog/EnterInviteCodeDialog';
import PlayOnlineDialog from 'features/mode/play/dialog/PlayOnlineDialog';
import CheckmateSkillsDialog from 'features/mode/stockfish/dialog/CheckmateSkillsDialog';
import EndgameSkillsDialog from 'features/mode/stockfish/dialog/EndgameSkillsDialog';
import PlayComputerDialog from 'features/mode/stockfish/dialog/PlayComputerDialog';
import CreateInboxCodeDialog from 'features/nav/dialog/CreateInboxCodeDialog';
import EnterInboxCodeDialog from 'features/nav/dialog/EnterInboxCodeDialog';
import EventsStatsDialog from 'features/nav/dialog/EventsStatsDialog';
import OpeningsStatsDialog from 'features/nav/dialog/OpeningsStatsDialog';
import PlayersStatsDialog from 'features/nav/dialog/PlayersStatsDialog';
import SettingsDialog from 'features/nav/dialog/SettingsDialog';
import Nav from 'features/nav/Nav';
import Panel from 'features/panel/Panel';
import HeuristicsBar from 'features/HeuristicsBar';
import ProgressDialog from 'features/ProgressDialog';
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
            <Panel props={props} />
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
        </Grid>
        <LoadFenDialog />
        <LoadPgnDialog />
        <LoadRavDialog />
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
        <WarningAlert />
      </Provider>
    </ThemeProvider>
  );
};

export default Chess;
