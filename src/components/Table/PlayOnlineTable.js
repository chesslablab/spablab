import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import playOnlineDialogActionTypes from '../../constants/dialog/playOnlineDialogActionTypes';
import WsAction from '../../ws/WsAction';

const PlayOnlineTable = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePlay = (hash) => {
    WsAction.quit(state).then(() => {
      WsAction.accept(state, hash).then(() => {
        dispatch({ type: playOnlineDialogActionTypes.CLOSE });
      });
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell>Color</TableCell>
            <TableCell align="right">Minutes</TableCell>
            <TableCell align="right">Increment</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.playOnlineDialog.rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell align="left">Anonymous</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.min}</TableCell>
              <TableCell align="right">{row.increment}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handlePlay(row.hash)}
                >
                  Play
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayOnlineTable;
