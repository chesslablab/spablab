import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import * as navConst from 'features/nav/navConst';

const OpeningAnalysisTableStockfishMode = ({props}) => {
  const state = useSelector(state => state);

  if (
    state.stockfishMode.active &&
    state.stockfishMode.tables.openingAnalysis.open &&
    state.nav.name !== navConst.TRAINING
  ) {
    return (
      <TableContainer sx={{ mt: 1.5 }}>
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

export default OpeningAnalysisTableStockfishMode;
