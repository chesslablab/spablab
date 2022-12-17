import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {
  Avatar,
  Button,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import wKing from '../../assets/img/pieces/png/150/wKing.png';
import bKing from '../../assets/img/pieces/png/150/bKing.png';
import Pgn from '../../common/Pgn';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as playOnlineDialog from '../../features/dialog/playOnlineDialogSlice';
import * as mode from '../../features/mode/modeSlice';
import * as variantConst from '../../features/variant/variantConst';
import WsAction from '../../ws/WsAction';

const VariantIcon = ({props}) => {
  if (props.variant === variantConst.CLASSICAL) {
    return <RestartAltIcon />;
  } else if (props.variant === variantConst.CHESS_960) {
    return <ShuffleIcon />;
  } else if (props.variant === variantConst.CAPABLANCA_80) {
    return <BlurOnIcon />;
  }

  return null;
}

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
    dispatch(mainButtons.setPlayOnline());
    WsAction.accept(state, hash);
    dispatch(mode.startAnalysis());
    dispatch(playOnlineDialog.close());
  };

  if (state.playOnlineDialog.rows.length > 0) {
    return (
      <TableContainer component={Paper} style={{ marginTop: 10, marginBottom: 5 }}>
        <Table aria-label="simple table">
          <TableBody>
            {state.playOnlineDialog.rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">Anonymous</TableCell>
                <TableCell align="center">{row.min}</TableCell>
                <TableCell align="center">+{row.increment}</TableCell>
                <TableCell align="center">
                  {
                    row.color === Pgn.symbol.WHITE
                      ? <Avatar src={wKing} sx={{ mt: -0.85, width: 25, height: 25 }} />
                      : <Avatar src={bKing} sx={{ mt: -0.85, width: 25, height: 25 }} />
                  }
                </TableCell>
                <TableCell align="center">
                  <VariantIcon props={{ variant: row.variant }} />
                </TableCell>
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
