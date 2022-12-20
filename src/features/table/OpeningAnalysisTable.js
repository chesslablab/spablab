import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import * as variantConst from '../../features/variant/variantConst';
import * as mainButtonsConst from '../../features/mainButtonsConst';

const OpeningAnalysisTable = ({props}) => {
  const state = useSelector(state => state);

  if (
    state.variant.name === variantConst.CLASSICAL &&
    state.openingAnalysisTable.open &&
    state.mainButtons.name !== mainButtonsConst.TRAINING
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

export default OpeningAnalysisTable;
