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

  const offset = () => {
    if (state.board?.movetext?.startsWith('1...')) {
      return 1;
    }

    return 0;
  };

  const highlight = (n) => {
    if (n === state.board.fen.length + state.panel.history.back - 1 + offset()) {
      return styles.currentMove;
    }

    return {};
  };

  const tableRows = () => {
    return Movetext.toRows(state.board.movetext)
      .map((row, i) => (
        <TableRow key={i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell
            sx={[styles.move, highlight(((i + 1) * 2) - 1)]}
            onClick={() => dispatch(panel.goTo({
              back: state.board.fen.length - 1 - (((i + 1) * 2) - 1 - offset()) }
            ))}
          >
            {row.w}
          </TableCell>
          <TableCell
            sx={[styles.move, highlight((i + 1) * 2)]}
            onClick={() => {
              const back = state.board.fen.length - 1 - ((i + 1) * 2 - offset());
              if (back >= 0) {
                dispatch(panel.goTo({ back: back }));
              }
            }}
          >
            {row.b}
          </TableCell>
        </TableRow>
      )
    );
  };

  if (!state.ravMode.active) {
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
}

export default PgnTable;
