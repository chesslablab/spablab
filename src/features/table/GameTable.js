import React from 'react';
import { useSelector } from 'react-redux';
import { Fade, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 15,
    background: '#f6f6f6',
  },
});

const GameTable = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.gameTable.open) {
    return (
      <Fade in={state.gameTable.open}>
        <TableContainer className={classes.tableContainer}>
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
      </Fade>
    );
  }

  return null;
}

export default GameTable;
