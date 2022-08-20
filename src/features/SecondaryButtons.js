import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { IconButton, Stack, useMediaQuery } from "@mui/material";
import { flip } from '../features/boardSlice';
import {
  MODE_FEN,
  MODE_PGN,
  MODE_UNDEFINED
} from '../features/modeConstants';
import {
  closeProgressDialog,
  openProgressDialog
} from '../features/dialog/progressDialogSlice';
import WsAction from '../ws/WsAction';

const SecondaryButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const matches = useMediaQuery("(min-width:900px)");

  const handleDownloadImage = async () => {
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/download_image`, {
      method: 'POST',
      body: JSON.stringify({ fen: state.board.fen })
    }).then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "chessboard.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  const handleDownloadMp4 = async () => {
    dispatch(openProgressDialog());
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/download_mp4`, {
      method: 'POST',
      body: JSON.stringify({ movetext: state.board.movetext })
    })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "chessgame.mp4";
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .finally(() => dispatch(closeProgressDialog()));
  }

  const disabled = !(state.mode.name === MODE_FEN || state.mode.name === MODE_PGN) && !state.board.movetext;

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        disabled={disabled}
        color="primary"
        size={matches ? 'small' : 'medium'}
        title="Flip Board"
        aria-label="flip"
        onClick={() => dispatch(flip())}
      >
        <CachedIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        disabled={disabled}
        color="primary"
        size={matches ? 'small' : 'medium'}
        title="Copy PGN movetext"
        aria-label="copy"
        onClick={() => state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null}
      >
        <MoveDownIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        disabled={disabled}
        color="primary"
        size={matches ? 'small' : 'medium'}
        title="Copy FEN string"
        aria-label="fen"
        onClick={() => state.board.fen ? navigator.clipboard.writeText(state.board.fen) : null}
      >
        <WidgetsIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        disabled={disabled}
        color="primary"
        size={matches ? 'small' : 'medium'}
        title="Heuristics"
        aria-label="heuristics"
        onClick={() => {
          dispatch(openProgressDialog());
          WsAction.heuristics(state);
        }}
      >
        <BarChartIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        disabled={disabled}
        color="primary"
        size={matches ? 'small' : 'medium'}
        title="Download Image"
        aria-label="flip"
        onClick={() => handleDownloadImage()}
      >
        <InsertPhotoIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        disabled={disabled}
        color="primary"
        size={matches ? 'small' : 'medium'}
        title="Download Video"
        aria-label="flip"
        onClick={() => handleDownloadMp4()}
      >
        <VideoCameraBackIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}

export default SecondaryButtons;
