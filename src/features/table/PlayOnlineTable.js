import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Button,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { closePlayOnlineDialog } from '../../features/dialog/playOnlineDialogSlice';
import { setPlayOnline } from '../../features/mainButtonsSlice';
import { startAnalysis } from '../../features/modeSlice';
import WsAction from '../../ws/WsAction';

const PlayOnlineTable = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      WsAction.onlineGames(state);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePlay = (hash) => {
    dispatch(setPlayOnline());
    WsAction.accept(state, hash);
    dispatch(startAnalysis());
    dispatch(closePlayOnlineDialog());
  };

  if (state.playOnlineDialog.rows.length > 0) {
    return (
      <TableContainer component={Paper} style={{marginTop: 15}}>
        <Table aria-label="simple table">
          <TableBody>
            {state.playOnlineDialog.rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">Anonymous</TableCell>
                <TableCell align="right">{row.min}</TableCell>
                <TableCell align="right">+{row.increment}</TableCell>
                <TableCell align="center">{row.color}</TableCell>
                <TableCell align="right">
                  <Button
                    disabled={
                      state.mode.play && state.mode.play.hash === row.hash
                        ? true
                        : false
                      }
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
  }

  return null;
};

export default PlayOnlineTable;
