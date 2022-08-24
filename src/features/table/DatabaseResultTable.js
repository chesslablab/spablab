import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as databaseDialog from '../../features/dialog/databaseDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import * as gameTable from '../../features/table/gameTableSlice';
import WsAction from '../../ws/WsAction';

const DatabaseResultTable = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (item) => {
    dispatch(databaseDialog.close());
    dispatch(progressDialog.open());
    dispatch(mainButtons.setDatabase());
    Dispatcher.initGui(dispatch);
    WsAction.startPgn(state, item.movetext);
    dispatch(gameTable.show({
      game: {
        Event: item.Event,
        Site: item.Site,
        Date: item.Date,
        White: item.White,
        Black: item.Black,
        Result: item.Result,
        ECO: item.ECO
      }
    }));
  };

  return (
    <TableContainer style={{ marginTop: 10 }} component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableBody>
          {
            props.result.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="left">{item.Event}</TableCell>
                <TableCell align="left">{item.White}</TableCell>
                <TableCell align="left">{item.Black}</TableCell>
                <TableCell align="left">{item.Date}</TableCell>
                <TableCell align="left">{item.ECO}</TableCell>
                <TableCell align="left">{item.Result}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="load"
                    color="primary"
                    onClick={() => handleLoad(item)}
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
