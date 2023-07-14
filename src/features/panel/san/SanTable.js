import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Movetext from 'common/Movetext.js';
import * as panel from 'features/panel/panelSlice';
import Ws from 'features/ws/Ws';

const styles = {
  table: {
    maxHeight: 362,
    display: 'flex',
    flexDirection: 'column-reverse',
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

const RavTable = ({props}) => {
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

  const description = () => {
    const comment = Movetext.description(state.sanMode.filtered);
    if (comment) {
      return <TableRow>
        <TableCell colSpan={3}>{comment}</TableCell>
      </TableRow>;
    }

    return null;
  };

  const moves = () => {
    let j = 1;
    let rows = Movetext.toCommentedRows(state.sanMode.filtered);
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

  if (state.sanMode.active) {
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

export default RavTable;
