import React from 'react';
import { Provider } from 'react-redux';
import { Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import store from 'app/store';
import InfoAlert from 'features/alert/InfoAlert.js';
import WarningAlert from 'features/alert/WarningAlert.js';
import VariantBoard from 'features/board/VariantBoard';
import ModeFenDialogs from 'features/mode/fen/FenDialogs';
import CreateInviteCodeDialog from 'features/mode/play/dialog/CreateInviteCodeDialog';
import EnterInviteCodeDialog from 'features/mode/play/dialog/EnterInviteCodeDialog';
import PlayOnlineDialog from 'features/mode/play/dialog/PlayOnlineDialog';
import AnnotatedGamesDialog from 'features/mode/rav/dialog/AnnotatedGamesDialog';
import LoadRavDialog from 'features/mode/rav/dialog/LoadRavDialog';
import LoadSanDialog from 'features/mode/san/dialog/LoadSanDialog';
import SearchEcoDialog from 'features/mode/san/dialog/SearchEcoDialog';
import SearchGamesDialog from 'features/mode/san/dialog/SearchGamesDialog';
import SearchMovetextDialog from 'features/mode/san/dialog/SearchMovetextDialog';
import SearchNameDialog from 'features/mode/san/dialog/SearchNameDialog';
import CheckmateSkillsDialog from 'features/mode/stockfish/dialog/CheckmateSkillsDialog';
import EndgameSkillsDialog from 'features/mode/stockfish/dialog/EndgameSkillsDialog';
import PlayComputerDialog from 'features/mode/stockfish/dialog/PlayComputerDialog';
import Nav from 'features/nav/Nav';
import NavDialogs from 'features/nav/NavDialogs';
import Panel from 'features/panel/Panel';
import HeuristicsBar from 'features/HeuristicsBar';
import ProgressDialog from 'features/ProgressDialog';
import theme from 'styles/theme.js';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Nav />
            <NavDialogs />
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={4}>
            <VariantBoard />
            <HeuristicsBar />
          </Grid>
          <Grid item xs={12} md={4}>
            <Panel />
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
        </Grid>
        <ModeFenDialogs />
        <LoadSanDialog />
        <LoadRavDialog />
        <PlayComputerDialog />
        <CreateInviteCodeDialog />
        <EnterInviteCodeDialog />
        <PlayOnlineDialog />
        <SearchGamesDialog />
        <AnnotatedGamesDialog />
        <SearchEcoDialog />
        <SearchMovetextDialog />
        <SearchNameDialog />
        <CheckmateSkillsDialog />
        <EndgameSkillsDialog />
        <ProgressDialog />
        <InfoAlert />
        <WarningAlert />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
