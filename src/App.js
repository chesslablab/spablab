import React from 'react';
import { Provider } from 'react-redux';
import { Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import store from 'app/store';
import InfoAlert from 'features/alert/InfoAlert.js';
import WarningAlert from 'features/alert/WarningAlert.js';
import VariantBoard from 'features/board/VariantBoard';
import ModeFenDialogs from 'features/mode/fen/FenDialogs';
import ModePlayDialogs from 'features/mode/play/PlayDialogs';
import ModeRavDialogs from 'features/mode/rav/RavDialogs';
import ModeSanDialogs from 'features/mode/san/SanDialogs';
import ModeStockfishDialogs from 'features/mode/stockfish/StockfishDialogs';
import Nav from 'features/nav/Nav';
import NavDialogs from 'features/nav/NavDialogs';
import Panel from 'features/panel/Panel';
import Heuristics from 'features/Heuristics';
import PositionEval from 'features/PositionEval';
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
            <PositionEval />
            <Heuristics />
          </Grid>
          <Grid item xs={12} md={4}>
            <Panel />
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
        </Grid>
        <ModeFenDialogs />
        <ModePlayDialogs />
        <ModeRavDialogs />
        <ModeSanDialogs />
        <ModeSanDialogs />
        <ModeStockfishDialogs />
        <ProgressDialog />
        <InfoAlert />
        <WarningAlert />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
