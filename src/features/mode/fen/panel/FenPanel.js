import React from 'react';
import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/fen/panel/StartedButtons';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import History from 'features/panel/History';
import MovesTable from 'features/panel/MovesTable';
import OpeningTable from 'features/panel/OpeningTable';
import styles from 'styles/panel/styles';

const FenPanel = ({ props }) => {
  return (
    <Grid item xs={12} sx={styles.panel}>
      <History />
      <Grid item xs={12} sx={styles.moves}>
        <MovesTable />
      </Grid>
      <Buttons props={props} />
      <StartedButtons />
      <OpeningTable />
      <ButtonsDialogs />
    </Grid>
  );
};

export default FenPanel;
