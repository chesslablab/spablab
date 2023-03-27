import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import * as searchEcoDialog from '../../features/dialog/searchEcoDialogSlice';
import * as searchMovetextDialog from '../../features/dialog/searchMovetextDialogSlice';
import * as searchNameDialog from '../../features/dialog/searchNameDialogSlice';
import * as modeConst from '../../features/mode/modeConst';
import * as variantConst from '../../features/variant/variantConst';
import WsAction from '../../features/ws/WsAction';

const styles = {
  clickable: {
    cursor: 'pointer',
    backgroundColor: '#ececec',
  },
};

const OpeningSearchResultTable = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    dispatch(searchEcoDialog.close());
    dispatch(searchMovetextDialog.close());
    dispatch(searchNameDialog.close());
    dispatch(progressDialog.open());
    dispatch(mainButtons.setOpeningSearch());
    Dispatcher.initGui(dispatch);
    WsAction.start(state, variantConst.CLASSICAL, modeConst.PGN, {
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
