import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { IconButton, Stack, useMediaQuery } from "@mui/material";
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';
import boardActionTypes from '../constants/boardActionTypes';
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
    dispatch({ type: progressDialogActionTypes.OPEN });
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
    .finally(() => dispatch({ type: progressDialogActionTypes.CLOSE }));
  }

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        color="primary"
        size={matches ? 'small' : 'large'}
        title="Copy PGN"
        aria-label="copy"
        onClick={() => state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null}
      >
        <ContentCopyIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        color="primary"
        size={matches ? 'small' : 'large'}
        title="Copy FEN"
        aria-label="fen"
        onClick={() => state.board.fen ? navigator.clipboard.writeText(state.board.fen) : null}
      >
        <WidgetsIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        color="primary"
        size={matches ? 'small' : 'large'}
        title="Heuristics"
        aria-label="heuristics"
        onClick={() => {
          dispatch({ type: progressDialogActionTypes.OPEN });
          WsAction.heuristics(state);
        }}
      >
        <BarChartIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        color="primary"
        size={matches ? 'small' : 'large'}
        title="Flip Board"
        aria-label="flip"
        onClick={() => dispatch({ type: boardActionTypes.FLIP })}
      >
        <CachedIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        color="primary"
        size={matches ? 'small' : 'large'}
        title="Download Image"
        aria-label="flip"
        onClick={() => handleDownloadImage()}
      >
        <InsertPhotoIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        color="primary"
        size={matches ? 'small' : 'large'}
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
