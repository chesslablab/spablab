import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { setDatabase } from '../../features/mainButtonsSlice';
import { closeDatabaseDialog } from '../../features/dialog/databaseDialogSlice';
import { openProgressDialog } from '../../features/dialog/progressDialogSlice';
import WsAction from '../../ws/WsAction';

const DatabaseResultTable = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (movetext) => {
    dispatch(closeDatabaseDialog());
    dispatch(openProgressDialog());
    dispatch(setDatabase());
    WsAction.startPgn(state, movetext);
  };

  return (
    <TableContainer style={{ marginTop: 10 }} component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableBody>
          {
            props.result.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="left">{item.Event}</TableCell>
                <TableCell align="left">{item.Date}</TableCell>
                <TableCell align="left">{item.White}</TableCell>
                <TableCell align="left">{item.Black}</TableCell>
                <TableCell align="left">{item.ECO}</TableCell>
                <TableCell align="left">{item.Result}</TableCell>
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

export default DatabaseResultTable;
