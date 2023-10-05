import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const styles = {
  tableRow: {
    background: '#f6f6f6',
  },
  tableCell: {
    fontSize: '0.8rem',
    borderBottom: 0,
  },
};

const GameMetadataTable = () => {
  const state = useSelector(state => state.panel);

  if (Object.keys(state.tables.gameMetadata).length) {
    return <TableContainer className="noTextSelection">
      <Table stickyHeader size="small" aria-label="Movetext">
        <TableBody>
          <TableRow key={0} sx={styles.tableRow}>
            <TableCell align="left" sx={styles.tableCell}>
              <b>{state.tables.gameMetadata.White}</b><br/>
              {state.tables.gameMetadata["White ELO"]}
            </TableCell>
            <TableCell align="center" sx={styles.tableCell}>
              <b>{state.tables.gameMetadata.Result}</b><br/>
              {state.tables.gameMetadata.Event},  Rd {state.tables.gameMetadata.Round}<br/>
              {state.tables.gameMetadata.Site}, {state.tables.gameMetadata.Date}, {state.tables.gameMetadata.ECO}
            </TableCell>
            <TableCell align="right" sx={styles.tableCell}>
              <b>{state.tables.gameMetadata.Black}</b><br/>
              {state.tables.gameMetadata["Black ELO"]}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>;
  }

  return null;
}

export default GameMetadataTable;
