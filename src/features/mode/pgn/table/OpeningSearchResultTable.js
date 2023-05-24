import React from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import MultiAction from 'common/MultiAction';
import * as modeConst from 'features/mode/modeConst';
import * as pgnMode from 'features/mode/pgnModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import WsAction from 'features/ws/WsAction';
import * as progressDialog from 'features/progressDialogSlice';

const styles = {
  clickable: {
    cursor: 'pointer',
    backgroundColor: '#ececec',
  },
};

const OpeningSearchResultTable = ({props}) => {
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    dispatch(pgnMode.searchEcoDialog({ open: false }));
    dispatch(pgnMode.searchMovetextDialog({ open: false }));
    dispatch(pgnMode.searchNameDialog({ open: false }));
    dispatch(progressDialog.open());
    dispatch(nav.setOpeningSearch());
    MultiAction.initGui(dispatch);
    WsAction.start(variantConst.CLASSICAL, modeConst.PGN, {
      movetext: movetext
    });
  };

  return (
    <TableContainer sx={{ mt: 1.5 }} component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableBody>
          {
            props.openings.map((item, i) => (
              <TableRow
                id={"OpeningSearchResultTable-TableRow-"+i}
                key={i}
                hover={true}
                sx={styles.clickable}
                onClick={() => handleLoad(item.movetext)}
              >
                <TableCell align="right">{item.eco}</TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.movetext}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OpeningSearchResultTable;
