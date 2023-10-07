import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Movetext from 'common/Movetext.js';
import * as panel from 'features/panel/panelSlice';
import styles from 'styles/panel';

const RavMovesTable = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const stateRavMode = useSelector(state => state.ravMode);

  const dispatch = useDispatch();

  const currentMove = (fen) => {
    if (stateBoard.fen.length - 1 + statePanel.history.back === fen ) {
      return styles.panel.movesTable.tableCell.currentMove;
    }

    return {};
  };

  const level = (rows) => {
    let haystack = Movetext.haystack(stateRavMode?.filtered);
    let needles = Movetext.needles(rows, stateRavMode?.breakdown);
    for (let i = needles.length - 1; i >= 0; i--) {
      const position = haystack.lastIndexOf(needles[i]);
      rows[i].level = Movetext.openParentheses(haystack.substring(0, position));
      haystack = haystack.substring(0, position).slice(0, -1).trim();
    }

    return rows;
  };

  const color = (rows) => {
    return level(rows).map(row => {
      return {
        background: Movetext.rgb(255 - (row.level * 10), 255 - (row.level * 10), 255 - (row.level * 10))
      }
    });
  };

  const description = () => {
    const comment = Movetext.description(stateRavMode?.breakdown[0]);
    if (comment) {
      return <TableRow sx={styles.panel.movesTable.tableRow}>
        <TableCell colSpan={3}>{comment}</TableCell>
      </TableRow>;
    }

    return null;
  };

  const moves = () => {
    let j = 1;
    let rows = [];
    stateRavMode?.breakdown.forEach((breakdown, i) => {
      rows = [...rows, ...Movetext.toCommentedRows(breakdown, i)];
    });
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

    const colors = color(rows);

    return rows.map((row, i) => {
      return <TableRow key={i} sx={colors[i]}>
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
          {description()}
          {moves()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RavMovesTable;
