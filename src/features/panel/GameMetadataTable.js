import React from 'react';
import { useSelector } from 'react-redux';
import { TableCell, TableRow } from '@mui/material';

const styles = {
  tableRow: {
    background: '#ffffff',
  },
};

const GameMetadataTable = ({props}) => {
  const state = useSelector(state => state);

  if (state.panel.tables.gameMetadata) {
    return <TableRow key={0} sx={styles.tableRow}>
      <TableCell align="left">
        {state.panel.tables.gameMetadata.White}<br/>
        {state.panel.tables.gameMetadata["White ELO"]}
      </TableCell>
      <TableCell align="center">
        {state.panel.tables.gameMetadata.Result}<br/>
        {state.panel.tables.gameMetadata.Event}<br/>
        {state.panel.tables.gameMetadata.Site}, {state.panel.tables.gameMetadata.Date}<br/>
        {state.panel.tables.gameMetadata.ECO}
      </TableCell>
      <TableCell align="right">
        {state.panel.tables.gameMetadata.Black}<br/>
        {state.panel.tables.gameMetadata["Black ELO"]}
      </TableCell>
    </TableRow>;
  }

  return null;
}

export default GameMetadataTable;
