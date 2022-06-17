import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { closeOpeningSearchEcoDialog } from '../../features/dialog/openingSearchEcoDialogSlice';
import { closeOpeningSearchMovetextDialog } from '../../features/dialog/openingSearchMovetextDialogSlice';
import { closeOpeningSearchNameDialog } from '../../features/dialog/openingSearchNameDialogSlice';
import { openProgressDialog } from '../../features/dialog/progressDialogSlice';
import WsAction from '../../ws/WsAction';

const OpeningSearchResultTable = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    dispatch(closeOpeningSearchEcoDialog());
    dispatch(closeOpeningSearchMovetextDialog());
    dispatch(closeOpeningSearchNameDialog());
    dispatch(openProgressDialog());
    WsAction.quit(state).then(() => WsAction.startLoadpgn(state, movetext));
  };

  return (
    <TableContainer component={Paper}>
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
