import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { IconButton, Stack } from "@mui/material";
import Movetext from '../common/Movetext';
import * as modeConst from '../features/mode/modeConst';
import * as variantConst from '../features/variant/variantConst';
import * as progressDialog from '../features/dialog/progressDialogSlice';
import WsAction from '../features/ws/WsAction';

const SecondaryButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleDownloadImage = async () => {
    let body = {
      fen: state.board.fen[state.board.fen.length - 1 + state.history.back],
      variant: state.variant.name,
      flip: state.board.flip
    };
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/download/image`, {
      method: 'POST',
      body: JSON.stringify(body)
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
    dispatch(progressDialog.open());
    let body = {
      variant: state.variant.name,
      movetext: Movetext.substring(state.board.movetext, state.history.back),
      flip: state.board.flip
    };
    if (state.variant.name === variantConst.CHESS_960) {
      body.startPos = state.variant.startPos;
    }
    if (state.mode.name === modeConst.FEN) {
      body.fen = state.mode.fen;
    }
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/download/mp4`, {
      method: 'POST',
      body: JSON.stringify(body)
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
    .finally(() => dispatch(progressDialog.close()));
  }

  const disabled = !(
      state.mode.name === modeConst.FEN ||
      state.mode.name === modeConst.PGN
    ) && !state.board.movetext;

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        disabled={disabled}
        color="primary"
        size="medium"
        title="Copy PGN movetext"
        aria-label="copy"
        onClick={() => navigator.clipboard.writeText(Movetext.substring(state.board.movetext, state.history.back))}
      >
        <MoveDownIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        disabled={disabled}
        color="primary"
        size="medium"
        title="Copy FEN string"
        aria-label="fen"
        onClick={() => navigator.clipboard.writeText(state.board.fen[state.board.fen.length - 1 + state.history.back])}
      >
        <WidgetsIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        disabled={disabled}
        color="primary"
        size="medium"
        title="Heuristics"
        aria-label="heuristics"
        onClick={() => {
          dispatch(progressDialog.open());
          WsAction.heuristics(state, Movetext.substring(state.board.movetext, state.history.back));
        }}
      >
        <BarChartIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        disabled={disabled}
        color="primary"
        size="medium"
        title="Download Image"
        aria-label="flip"
        onClick={() => handleDownloadImage()}
      >
        <InsertPhotoIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        disabled={disabled}
        color="primary"
        size="medium"
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
