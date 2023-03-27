import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Movetext from '../../common/Movetext.js';
import * as history from '../../features/historySlice';
import WsAction from '../../features/ws/WsAction';

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

const MoveValidatorTable = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.board.lan && !state.board.picked) {
      WsAction.playLan(state);
    }
  }, [state.board.picked]);

  const highlight = (n) => {
    if (n === state.board.history.length + state.history.back - 1) {
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
            onClick={() => dispatch(history.goTo({
              back: state.board.history.length - 1 - (((i + 1) * 2) - 1) }
            ))}
          >
            {row.w}
          </TableCell>
          <TableCell
            sx={[styles.move, highlight((i + 1) * 2)]}
            onClick={() => {
              const back = state.board.history.length - 1 - ((i + 1) * 2);
              if (back >= 0) {
                dispatch(history.goTo({ back: back }));
              }
            }}
          >
            {row.b}
          </TableCell>
        </TableRow>
      )
    );
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

export default MoveValidatorTable;
