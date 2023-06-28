import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Movetext from 'common/Movetext.js';
import * as panel from 'features/panel/panelSlice';
import Ws from 'features/ws/Ws';

const styles = {
  table: {
    maxHeight: 190,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  move: {
    "&:hover": {
      color: "#ffffff",
      background: "#3d8cd9 !important",
      cursor: 'pointer'
    },
  },
  currentMove: {
    color: "#ffffff !important",
    background: "#1976d2 !important",
    fontWeight: 'bold !important'
  }
};

const PgnTable = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.board.lan && !state.board.pieceGrabbed) {
      Ws.playLan();
    }
  }, [state.board.pieceGrabbed, state.board.lan]);

  const highlight = (fen) => {
    if (state.board.fen.length - 1 + state.panel.history.back === fen ) {
      return styles.currentMove;
    }

    return {};
  };

  const tableRows = () => {
    let j = 1;
    let rows = [];
    if (state.pgnMode.active) {
      state.pgnMode.breakdown.forEach((breakdown, i) => {
        rows = [...rows, ...Movetext.toCommentedRows(breakdown)];
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

      return rows.map((row, i) => {
        return <TableRow key={i}>
          <TableCell>{row.n}</TableCell>
          <TableCell
            sx={[styles.move, highlight(row.wFen)]}
            onClick={() => {
              if (row.w !== '...') {
                dispatch(panel.goTo({
                  back: state.board.fen.length - 1 - row.wFen
                }));
              }
            }}
          >
            {row.w}
          </TableCell>
          <TableCell
            sx={[styles.move, highlight(row.bFen)]}
            onClick={() => {
              if (row.b) {
                dispatch(panel.goTo({
                  back: state.board.fen.length - 1 - row.bFen
                }));
              }
            }}
          >
            {row.b}
          </TableCell>
        </TableRow>
      });
    }
  };

  return (
    <TableContainer className="noTextSelection" sx={styles.table}>
      <Table stickyHeader size="small" aria-label="Movetext">
        <TableBody>
          {tableRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PgnTable;
