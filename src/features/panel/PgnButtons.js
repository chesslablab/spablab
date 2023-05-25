import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { IconButton, Stack } from "@mui/material";
import storeParser from 'app/storeParser';
import Movetext from 'common/Movetext';
import * as variantConst from 'features/mode/variantConst';
import * as progressDialog from 'features/progressDialogSlice';
import WsAction from 'features/ws/WsAction';

const PgnButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleDownloadImage = async () => {
    let body = {
      fen: state.board.fen[state.board.fen.length - 1 + state.panel.history.back],
      variant: storeParser.getActiveMode().variant,
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
      variant: storeParser.getActiveMode().variant,
      fen: state.board.fen[0],
      movetext: Movetext.substring(state.board.movetext, state.panel.history.back),
      flip: state.board.flip
    };
    if (storeParser.getActiveMode().variant === variantConst.CHESS_960) {
      body.startPos = state.variant.startPos;
    }
    if (state.fenMode.active) {
      body.fen = state.fenMode.fen;
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

  const disabled = !state.board.movetext;

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        id="PgnButtons-copyPgnMovetext"
        disabled={disabled}
        color="primary"
        size="medium"
        title="Copy PGN movetext"
        aria-label="copy"
        onClick={() => navigator.clipboard.writeText(Movetext.substring(state.board.movetext, state.panel.history.back))}
      >
        <MoveDownIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        id="PgnButtons-copyFenString"
        disabled={disabled}
        color="primary"
        size="medium"
        title="Copy FEN string"
        aria-label="fen"
        onClick={() => navigator.clipboard.writeText(state.board.fen[state.board.fen.length - 1 + state.panel.history.back])}
      >
        <WidgetsIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        id="PgnButtons-heuristics"
        disabled={disabled}
        color="primary"
        size="medium"
        title="Heuristics"
        aria-label="heuristics"
        onClick={() => {
          dispatch(progressDialog.open());
          WsAction.heuristics(Movetext.substring(state.board.movetext, state.panel.history.back));
        }}
      >
        <BarChartIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        id="PgnButtons-downloadImage"
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
        id="PgnButtons-downloadVideo"
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

export default PgnButtons;
