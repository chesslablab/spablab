import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Ascii from 'common/Ascii';

const OpeningTable = () => {
  const stateFenMode = useSelector(state => state.fenMode);

  const stateSanMode = useSelector(state => state.sanMode);

  const stateStockfishMode = useSelector(state => state.stockfishMode);

  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  if (stateFenMode.active || stateSanMode.active || stateStockfishMode.active) {
    if (stateBoard.fen[0] === Ascii.initialFen()) {
      if (statePanel.tables.opening.rows) {
        return (
          <TableContainer sx={{ mt: 1.5 }}>
            <Table stickyHeader size="small" aria-label="Chess Openings">
              <TableBody>
                {
                  statePanel.tables.opening.rows.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell align="left">{item.eco}</TableCell>
                      <TableCell align="left">{item.name}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        );
      }
    }
  }

  return null;
}

export default OpeningTable;
