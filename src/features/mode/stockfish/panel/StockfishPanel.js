import React from 'react';
import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/stockfish/panel/StartedButtons';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import History from 'features/panel/History';
import MovesTable from 'features/panel/MovesTable';
import OpeningTable from 'features/panel/OpeningTable';
import styles from 'features/panel/styles';

const StockfishPanel = ({ props }) => {
  return (
    <Grid sx={styles.panel}>
      <History />
      <MovesTable />
      <Buttons props={props} />
      <StartedButtons />
      <OpeningTable />
      <ButtonsDialogs />
    </Grid>
  );
};

export default StockfishPanel;
