import React from 'react';
import { useSelector } from 'react-redux';
import { wsMssgPlayfen } from '../actions/serverActions';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Movetext from '../utils/Movetext.js';

const useStyles = makeStyles({
  table: {
    marginTop: 10,
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
