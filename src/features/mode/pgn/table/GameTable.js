import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const GameTable = ({props}) => {
  const state = useSelector(state => state);

  if (state.gameTable.open) {
    return (
      <TableContainer sx={{ mt: 1.5 }}>
        <Table stickyHeader size="small" aria-label="Chess Openings">
          <TableBody>
            {
              Object.entries(state.gameTable.game).map(([key, val]) => (
                <TableRow key={key}>
                  <TableCell align="right">{key}</TableCell>
                  <TableCell align="left">{val}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return null;
}

export default GameTable;
