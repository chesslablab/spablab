import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import * as searchEcoDialog from '../../features/dialog/searchEcoDialogSlice';
import * as searchMovetextDialog from '../../features/dialog/searchMovetextDialogSlice';
import * as searchNameDialog from '../../features/dialog/searchNameDialogSlice';
import WsAction from '../../ws/WsAction';

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
    WsAction.startPgn(state, movetext);
  };

  return (
    <TableContainer style={{ marginTop: 10 }} component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableBody>
          {
            props.openings.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="right">{item.eco}</TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.movetext}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="load"
                    color="primary"
                    onClick={() => handleLoad(item.movetext)}
                  >
                    <PublishIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OpeningSearchResultTable;
