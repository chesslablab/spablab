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
  const state = useSelector(state => state);

  if (Object.keys(state.panel.tables.gameMetadata).length) {
    return <TableContainer className="noTextSelection">
      <Table stickyHeader size="small" aria-label="Movetext">
        <TableBody>
          <TableRow key={0} sx={styles.tableRow}>
            <TableCell align="left" sx={styles.tableCell}>
              {state.panel.tables.gameMetadata.White}<br/>
              {state.panel.tables.gameMetadata["White ELO"]}
            </TableCell>
            <TableCell align="center" sx={styles.tableCell}>
              {state.panel.tables.gameMetadata.Result}<br/>
              {state.panel.tables.gameMetadata.Event}<br/>
              {state.panel.tables.gameMetadata.Site}, {state.panel.tables.gameMetadata.Date}<br/>
              {state.panel.tables.gameMetadata.ECO}
            </TableCell>
            <TableCell align="right" sx={styles.tableCell}>
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
