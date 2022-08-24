import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublishIcon from '@mui/icons-material/Publish';
import {
  Alert,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import Dispatcher from '../../common/Dispatcher';
import { setDatabase } from '../../features/mainButtonsSlice';
import { closeDatabaseDialog } from '../../features/dialog/databaseDialogSlice';
import { openProgressDialog } from '../../features/dialog/progressDialogSlice';
import { showGameTable } from '../../features/table/gameTableSlice';
import WsAction from '../../ws/WsAction';

const DatabaseResultTable = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLoad = (item) => {
    dispatch(closeDatabaseDialog());
    dispatch(openProgressDialog());
    dispatch(setDatabase());
    Dispatcher.initGui(dispatch);
    WsAction.startPgn(state, item.movetext);
    dispatch(showGameTable({
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
      <Alert
        className="info-alert"
        severity="info"
        style={{ margin: 15 }}
      >
        Are you feeling lucky? Every time the Search button is clicked, up to 25 random records are shown matching the criteria.
      </Alert>
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
