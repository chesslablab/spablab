import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { wsMssgPlayfen } from '../../actions/serverActions';
import Movetext from '../../utils/Movetext.js';

const useStyles = makeStyles({
  table: {
    marginBottom: 10,
    maxHeight: 200,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  currentMove: {
    backgroundColor: '#ececec !important',
    fontWeight: 'bold !important'
  }
});

const MoveValidatorTable = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  useEffect(() => {
    if (state.board.short_fen) {
      wsMssgPlayfen(state);
    }
  }, [state.board.short_fen]);

  const highlight = (n) => {
    if (n === state.board.history.length + state.history.back - 1) {
      return classes.currentMove;
    }

    return '';
  };

  const tableRows = () => {
    return Movetext.toRows(state.board.movetext)
      .map((row, i) => (
        <TableRow key={i}>
          <TableCell align="right">{i + 1}</TableCell>
          <TableCell align="right" className={highlight(((i + 1) * 2) - 1)}>
            {row.w}
          </TableCell>
          <TableCell align="right" className={highlight((i + 1) * 2)}>
            {row.b}
          </TableCell>
        </TableRow>
      )
    );
  };

  return (
    <TableContainer className={classes.table}>
      <Table stickyHeader size="small" aria-label="Movetext">
        <TableBody>
          {tableRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MoveValidatorTable;
