import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Movetext from 'common/Movetext.js';
import GameTable from 'features/mode/rav/table/GameTable';
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

  const level = (rows) => {
    let haystack = Movetext.haystack(state.ravMode?.filtered);
    let needles = Movetext.needles(rows, state.ravMode?.breakdown);
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

    const colors = color(rows);

    return rows.map((row, i) => {
      return <TableRow key={i} sx={colors[i]}>
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
            <GameTable />
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
