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

  if (state.sanMode.tables.panel.open) {
    return <TableRow key={0} sx={styles.tableRow}>
      <TableCell align="left">
        {state.sanMode.tables.panel.game.White}<br/>
        {state.sanMode.tables.panel.game["White ELO"]}
      </TableCell>
      <TableCell align="center">
        {state.sanMode.tables.panel.game.Result}<br/>
        {state.sanMode.tables.panel.game.Event}<br/>
        {state.sanMode.tables.panel.game.Site}, {state.sanMode.tables.panel.game.Date}<br/>
        {state.sanMode.tables.panel.game.ECO}
      </TableCell>
      <TableCell align="right">
        {state.sanMode.tables.panel.game.Black}<br/>
        {state.sanMode.tables.panel.game["Black ELO"]}
      </TableCell>
    </TableRow>;
  }

  return null;
}

export default GameTable;
