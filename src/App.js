import { Provider } from 'react-redux';
import { Grid } from '@mui/material';
import { ThemeModeProvider } from 'features/ThemeModeProvider';
import store from 'app/store';
import InfoAlert from 'features/alert/InfoAlert.js';
import WarningAlert from 'features/alert/WarningAlert.js';
import Board from 'features/board/Board';
import ModeFenDialogs from 'features/mode/fen/FenDialogs';
import ModePlayDialogs from 'features/mode/play/PlayDialogs';
import ModeRavDialogs from 'features/mode/rav/RavDialogs';
import ModeSanDialogs from 'features/mode/san/SanDialogs';
import ModeStockfishDialogs from 'features/mode/stockfish/StockfishDialogs';
import Nav from 'features/nav/Nav';
import NavDialogs from 'features/nav/NavDialogs';
import Panel from 'features/panel/Panel';
import ProgressDialog from 'features/ProgressDialog';
import theme from 'styles/theme.js';

const App = () => {
  return (
      <Provider store={store}>
        <ThemeModeProvider theme={theme}>
          <Grid container>
            <Nav />
            <NavDialogs />
          </Grid>
          <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item xs={12} md={5}>
              <Board />
            </Grid>
            <Grid item xs={12} md={7}>
              <Panel />
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
        </ThemeModeProvider>
      </Provider>
  );
};

export default App;
