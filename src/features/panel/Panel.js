import React from 'react';
import { Grid } from '@mui/material';
import GameTableGmMode from 'features/mode/gm/table/GameTableGmMode';
import StartedButtonsGmMode from 'features/mode/gm/StartedButtonsGmMode';
import StartedButtonsFenMode from 'features/mode/fen/StartedButtonsFenMode';
import StartedButtonsPgnMode from 'features/mode/pgn/StartedButtonsPgnMode';
import GameTablePgnMode from 'features/mode/pgn/table/GameTablePgnMode';
import FinishedButtonsPlayMode from 'features/mode/play/FinishedButtonsPlayMode';
import FinishedDialogsPlayMode from 'features/mode/play/FinishedDialogsPlayMode';
import StartedButtonsPlayMode from 'features/mode/play/StartedButtonsPlayMode';
import StartedDialogsPlayMode from 'features/mode/play/StartedDialogsPlayMode';
import StartedButtonsStockfishMode from 'features/mode/stockfish/StartedButtonsStockfishMode';
import Timer from 'features/mode/play/timer/Timer';
import History from 'features/panel/History';
import OpeningTable from 'features/panel/OpeningTable';
import PgnTable from 'features/panel/PgnTable';
import RavTable from 'features/panel/RavTable';
import PgnButtons from 'features/panel/PgnButtons';
import PgnDialogs from 'features/panel/PgnDialogs';

const styles = {
  gameBox: {
    background: '#f6f6f6',
  },
  pgn: {
    height: 225,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    background: '#f0f0f0'
  },
  timer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const Panel = ({ props }) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.gameBox}>
        <Grid item xs={12} sx={styles.pgn}>
          <Grid item xs={12} sx={styles.buttons}>
            <History />
          </Grid>
          <Grid item xs={12}>
            <PgnTable />
            <RavTable />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={styles.buttons}>
          <PgnButtons props={props} />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={styles.timer}>
        <Timer />
      </Grid>
      <Grid item xs={12}>
        { /* GM mode */ }
        <GameTableGmMode />
        <StartedButtonsGmMode />
        { /* FEN mode */ }
        <StartedButtonsFenMode />
        { /* PGN mode */ }
        <GameTablePgnMode />
        <StartedButtonsPgnMode />
        { /* Play mode */ }
        <StartedButtonsPlayMode />
        <FinishedButtonsPlayMode />
        { /* Stockfish mode */ }
        <StartedButtonsStockfishMode />
        { /* All modes */ }
        <OpeningTable />
      </Grid>
      <PgnDialogs />
      <StartedDialogsPlayMode />
      <FinishedDialogsPlayMode />
    </Grid>
  );
};

export default Panel;
