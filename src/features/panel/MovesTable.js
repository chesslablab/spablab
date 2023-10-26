import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Movetext } from '@chesslablab/reactblab';
import * as panel from 'features/panel/panelSlice';
import styles from 'styles/panel';

const MovesTable = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const dispatch = useDispatch();

  const currentMove = (fen) => {
    if (stateBoard.fen.length - 1 + statePanel.history.back === fen ) {
      return styles.panel.movesTable.tableCell.currentMove;
    }

    return {};
  };

  const moves = () => {
    let j = 1;
    let rows = Movetext.toRows(
      stateBoard.movetext?.replace(/\s?\{[^}]+\}/g, '')
        .replace(/\s?\$[1-9][0-9]*/g, '')
        .trim()
    );
    rows.forEach((row, i) => {
      if (row.w !== '...') {
        row.wFen = j;
        j += 1;
      }
      if (row.b) {
        row.bFen = j;
        j += 1;
      }
    });

    return rows.map((row, i) => {
      return <TableRow key={i} sx={styles.panel.movesTable.tableRow}>
        <TableCell sx={styles.panel.movesTable.tableCell.nMove}>{row.n}</TableCell>
        <TableCell
          sx={[styles.panel.movesTable.tableCell, currentMove(row.wFen)]}
          onClick={() => {
            if (row.w !== '...') {
              dispatch(panel.goTo({ back: stateBoard.fen.length - 1 - row.wFen }));
            }
          }}
        >
          {row.w}
        </TableCell>
        <TableCell
          sx={[styles.panel.movesTable.tableCell, currentMove(row.bFen)]}
          onClick={() => {
            if (row.b) {
              dispatch(panel.goTo({ back: stateBoard.fen.length - 1 - row.bFen }));
            }
          }}
        >
          {row.b}
        </TableCell>
      </TableRow>
    });
  };

  return (
    <TableContainer sx={styles.panel.movesTable.tableContainer} className="noTextSelection">
      <Table stickyHeader size="small" aria-label="Movetext">
        <TableBody>
          {moves()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MovesTable;
