import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

const PlayOnlineTable = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Color</TableCell>
            <TableCell align="right">Minutes</TableCell>
            <TableCell align="right">Increment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.playOnlineDialog.rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.min}</TableCell>
              <TableCell align="right">{row.increment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayOnlineTable;
