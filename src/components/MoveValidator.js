import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { wsMssgPlayfen } from '../actions/serverActions';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Movetext from '../utils/Movetext.js';

const useStyles = makeStyles({
  table: {
    maxHeight: 300,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
});

const MoveValidator = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.board.fen) {
    wsMssgPlayfen(state);
  }

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table stickyHeader aria-label="simple table">
        <TableBody>
          {
            Movetext.toRows(state.board.movetext).map((row, i) => (
              <TableRow key={i}>
                <TableCell align="right">{i + 1}</TableCell>
                <TableCell align="right">{row.w}</TableCell>
                <TableCell align="right">{row.b}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MoveValidator;
