import React from 'react';
import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/play/panel/StartedButtons';
import StartedDialogs from 'features/mode/play/panel/StartedDialogs';
import FinishedButtons from 'features/mode/play/panel/FinishedButtons';
import FinishedDialogs from 'features/mode/play/panel/FinishedDialogs';
import Timer from 'features/mode/play/panel/timer/Timer';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import History from 'features/panel/History';
import MovesTable from 'features/panel/MovesTable';
import OpeningTable from 'features/panel/OpeningTable';
import styles from 'styles/panel/styles';

const PlayPanel = ({ props }) => {
  return (
    <Grid item xs={12} sx={styles.panel}>
      <History />
      <MovesTable />
      <Buttons props={props} />
      <Timer />
      <StartedButtons />
      <FinishedButtons />
      <OpeningTable />
      <ButtonsDialogs />
      <StartedDialogs />
      <FinishedDialogs />
    </Grid>
  );
};

export default PlayPanel;
