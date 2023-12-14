import { Provider } from 'react-redux';
import { Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
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
import Heuristics from 'features/Heuristics';
import PositionEval from 'features/PositionEval';
import ProgressDialog from 'features/ProgressDialog';
import PlayOnlineTable from 'features/mode/play/table/PlayOnlineTable';
import Iframe from 'features/Iframe';
import theme from 'styles/theme.js';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Grid container>
          <Nav />
          <NavDialogs />
        </Grid>
        <Grid container sx={{ p: 2 }} spacing={2}>
          <Grid item xs={12} md={5}>
            <Board />
            <PositionEval />
            <Heuristics />
          </Grid>
          <Grid item xs={12} md={4}>
            <Panel />
          </Grid>
          <Grid item xs={12} md={3}>
            <PlayOnlineTable />
            <Iframe title={process.env.REACT_APP_IFRAME_CHAT_TITLE} src={process.env.REACT_APP_IFRAME_CHAT_SRC} />
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
