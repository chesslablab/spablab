import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { IconButton, Stack } from "@mui/material";
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';
import boardActionTypes from '../constants/boardActionTypes';
import WsAction from '../ws/WsAction';

const SecondaryButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

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
        size="medium"
        title="Copy PGN"
        aria-label="copy"
        onClick={() => state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null}
      >
        <ContentCopyIcon />
      </IconButton>
      <IconButton
        color="primary"
        size="medium"
        title="Copy FEN"
        aria-label="fen"
        onClick={() => state.board.fen ? navigator.clipboard.writeText(state.board.fen) : null}
      >
        <WidgetsIcon />
      </IconButton>
      <IconButton
        color="primary"
        size="medium"
        title="Heuristics"
        aria-label="heuristics"
        onClick={() => {
          dispatch({ type: progressDialogActionTypes.OPEN });
          WsAction.heuristics(state);
        }}
      >
        <BarChartIcon />
      </IconButton>
      <IconButton
        color="primary"
        size="medium"
        title="Flip Board"
        aria-label="flip"
        onClick={() => dispatch({ type: boardActionTypes.FLIP })}
      >
        <CachedIcon />
      </IconButton>
      <IconButton
        color="primary"
        size="medium"
        title="Download Image"
        aria-label="flip"
        onClick={() => handleDownloadImage()}
      >
        <InsertPhotoIcon />
      </IconButton>
      <IconButton
        color="primary"
        size="medium"
        title="Download Video"
        aria-label="flip"
        onClick={() => handleDownloadMp4()}
      >
        <VideoCameraBackIcon />
      </IconButton>
    </Stack>
  );
}

export default SecondaryButtons;
