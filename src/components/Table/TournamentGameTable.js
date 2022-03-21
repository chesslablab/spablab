import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 10,
  },
});

const TournamentGameTable = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.tournamentGameTable.open) {
    return (
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table stickyHeader size="small" aria-label="Chess Openings">
          <TableBody>
            {
              state.tournamentGameTable.rows.map((item, i) => (
                <TableRow key={i}>
                  <TableCell align="right">{item.tag}</TableCell>
                  <TableCell align="left">{item.val}</TableCell>
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

export default TournamentGameTable;
