import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { wsMssgPlayfen } from '../actions/serverActions';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const MoveValidator = ({props}) => {
  const state = useSelector(state => state);
  const [rows, setRows] = useState([]);

  if (state.board.fen) {
    wsMssgPlayfen(state);
  }

  useEffect(() => {
    if (state.board.movetext) {
      let movetext = state.board.movetext.split(' ');
      let last = movetext[movetext.length - 1];
      let secondLast = movetext[movetext.length - 2];
      let newRows = rows.map(item => ({...item}));
      if (movetext.length % 2 !== 0) {
        newRows.push({ w: last.split('.')[1], b: '' });
      } else {
        newRows.pop();
        newRows.push({ w: secondLast.split('.')[1], b: last });
      }
      setRows(newRows);
    }
  }, [state.board.movetext]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell align="right">{i + 1}</TableCell>
              <TableCell align="right">{row.w}</TableCell>
              <TableCell align="right">{row.b}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MoveValidator;
