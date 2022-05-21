import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

const rows = [
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
  {
    name: 'The name',
    calories: 'Foo',
    fat: 'Bar',
    carbs: 'Foobar'
  },
];

const PlayOnlineTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayOnlineTable;
