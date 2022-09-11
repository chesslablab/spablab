import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as mainButtonsConst from '../../features/mainButtonsConst';

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 15,
    background: '#f6f6f6',
  },
});

const OpeningAnalysisTable = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (
    state.openingAnalysisTable.open &&
    state.mainButtons.name !== mainButtonsConst.TRAINING
  ) {
    return (
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader size="small" aria-label="Chess Openings">
          <TableBody>
            {
              state.openingAnalysisTable.rows.map((item, i) => (
                <TableRow key={i}>
                  <TableCell align="left">{item.eco}</TableCell>
                  <TableCell align="left">{item.name}</TableCell>
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

export default OpeningAnalysisTable;
