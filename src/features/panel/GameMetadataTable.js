import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const styles = {
  tableRow: {
    background: '#ffffff',
  },
};

const GameMetadataTable = ({props}) => {
  const state = useSelector(state => state);

  if (state.panel.tables.gameMetadata) {
    return <TableContainer className="noTextSelection" sx={{mt: 1.5}}>
      <Table stickyHeader size="small" aria-label="Movetext">
        <TableBody>
          <TableRow key={0} sx={styles.tableRow}>
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
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>;
  }

  return null;
}

export default GameMetadataTable;
