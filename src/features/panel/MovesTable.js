import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Movetext from 'common/Movetext.js';
import * as panel from 'features/panel/panelSlice';
import Ws from 'features/ws/Ws';

const styles = {
  table: {
    maxHeight: 193,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  nMove: {
    background: '#f0f0f0',
  },
  moves: {
    background: '#ffffff',
  },
  move: {
    "&:hover": {
      color: '#ffffff',
      background: '#3d8cd9',
      cursor: 'pointer',
    },
  },
  currentMove: {
    color: '#ffffff',
    background: '#1976d2',
    fontWeight: 'bold',
  },
};

const MovesTable = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.board.lan && !state.board.pieceGrabbed) {
      Ws.playLan();
    }
  }, [state.board.pieceGrabbed, state.board.lan]);

  const currentMove = (fen) => {
    if (state.board.fen.length - 1 + state.panel.history.back === fen ) {
      return styles.currentMove;
    }

    return {};
  };

  const moves = () => {
    let j = 1;
    let rows = Movetext.toRows(
      state.board.movetext?.replace(/\s?\{[^}]+\}/g, '')
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
      return <TableRow key={i} sx={styles.moves}>
        <TableCell sx={styles.nMove}>{row.n}</TableCell>
        <TableCell
          sx={[styles.move, currentMove(row.wFen)]}
          onClick={() => {
            if (row.w !== '...') {
              dispatch(panel.goTo({ back: state.board.fen.length - 1 - row.wFen }));
            }
          }}
        >
          {row.w}
        </TableCell>
        <TableCell
          sx={[styles.move, currentMove(row.bFen)]}
          onClick={() => {
            if (row.b) {
              dispatch(panel.goTo({ back: state.board.fen.length - 1 - row.bFen }));
            }
          }}
        >
          {row.b}
        </TableCell>
      </TableRow>
    });
  };

  if (!state.ravMode.active) {
    return (
      <TableContainer className="noTextSelection" sx={styles.table}>
        <Table stickyHeader size="small" aria-label="Movetext">
          <TableBody>
            {moves()}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return null;
}

export default MovesTable;
