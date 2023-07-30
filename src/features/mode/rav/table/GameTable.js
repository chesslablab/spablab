import React from 'react';
import { useSelector } from 'react-redux';
import { TableCell, TableRow } from '@mui/material';

const styles = {
  tableRow: {
    background: '#ffffff',
  },
};

const GameTable = ({props}) => {
  const state = useSelector(state => state);

  if (state.ravMode.tables.panel.open) {
    return <TableRow key={0} sx={styles.tableRow}>
      <TableCell align="left">
        {state.ravMode.tables.panel.game.White}<br/>
        {state.ravMode.tables.panel.game["White ELO"]}
      </TableCell>
      <TableCell align="center">
        {state.ravMode.tables.panel.game.Result}<br/>
        {state.ravMode.tables.panel.game.Event}<br/>
        {state.ravMode.tables.panel.game.Site}, {state.ravMode.tables.panel.game.Date}<br/>
        {state.ravMode.tables.panel.game.ECO}
      </TableCell>
      <TableCell align="right">
        {state.ravMode.tables.panel.game.Black}<br/>
        {state.ravMode.tables.panel.game["Black ELO"]}
      </TableCell>
    </TableRow>;
  }

  return null;
}

export default GameTable;
