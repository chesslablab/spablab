import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import * as variantConst from 'features/mode/variantConst';

const OpeningAnalysisTablePgnMode = ({props}) => {
  const state = useSelector(state => state);

  if (
    state.pgnMode.active &&
    state.pgnMode.variant === variantConst.CLASSICAL &&
    state.pgnMode.tables.openingAnalysis.open
  ) {
    return (
      <TableContainer sx={{ mt: 1.5 }}>
        <Table stickyHeader size="small" aria-label="Chess Openings">
          <TableBody>
            {
              state.pgnMode.tables.openingAnalysis.rows.map((item, i) => (
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

export default OpeningAnalysisTablePgnMode;
