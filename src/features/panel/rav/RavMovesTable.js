import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Movetext from 'common/Movetext.js';
import * as panel from 'features/panel/panelSlice';
import Ws from 'features/ws/Ws';

const styles = {
  table: {
    maxHeight: 365,
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  description: {
    background: '#ffffff',
  },
  nMove: {
    background: '#f0f0f0',
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

const RavMovesTable = ({props}) => {
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

  const rgb = (r, g, b) => `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;

  const paint = (rows) => {
    let colors = [];
    for (let i = 0; i < rows.length; i++) {
      const needle = state.ravMode?.breakdown[rows[i].nBreakdown]
        .replace(/\s?\{[^}]+\}/g, '')
        .replace(/\s?\$[1-9][0-9]*/g, '')
        .trim();
      for (let j = 0; j < state.ravMode?.lines.length; j++) {
        for (let k = 0; k < state.ravMode?.lines[j].length; k++) {
          const haystack = Object.keys(state.ravMode?.lines[j][k])[0];
          if (haystack.includes(needle)) {
            colors[i] = {
              background: rgb(255 - (j * 10), 255 - (j * 10), 255 - (j * 10))
            };
          }
        }
      }
    }

    return colors;
  };

  const description = () => {
    const comment = Movetext.description(state.ravMode?.breakdown[0]);
    if (comment) {
      return <TableRow sx={styles.description}>
        <TableCell colSpan={3}>{comment}</TableCell>
      </TableRow>;
    }

    return null;
  };

  const moves = () => {
    let j = 1;
    let rows = [];
    state.ravMode?.breakdown.forEach((breakdown, i) => {
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

    return rows.map((row, i) => {
      return <TableRow key={i} sx={paint(rows)[i]}>
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

  if (state.ravMode.active) {
    return (
      <TableContainer className="noTextSelection" sx={styles.table}>
        <Table stickyHeader size="small" aria-label="Movetext">
          <TableBody>
            {description()}
            {moves()}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return null;
}

export default RavMovesTable;
