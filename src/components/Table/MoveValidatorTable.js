import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Slide, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { wsMssgPlayfen } from '../../actions/serverActions';
import Movetext from '../../utils/Movetext.js';

const useStyles = makeStyles({
  table: {
    maxHeight: 170,
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
          <TableCell align="left">{i + 1}</TableCell>
          <TableCell align="left" className={highlight(((i + 1) * 2) - 1)}>
            {row.w}
          </TableCell>
          <TableCell align="left" className={highlight((i + 1) * 2)}>
            {row.b}
          </TableCell>
        </TableRow>
      )
    );
  };

  return (
    <Slide direction="down" in={state.board.movetext ? true : false} mountOnEnter unmountOnExit>
      <TableContainer className={classes.table}>
        <Table stickyHeader size="small" aria-label="Movetext">
          <TableBody>
            {tableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Slide>
  );
}

export default MoveValidatorTable;
