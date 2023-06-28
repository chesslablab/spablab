import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { IconButton, Stack } from "@mui/material";
import { getActiveMode } from 'app/store';
import Movetext from 'common/Movetext';
import * as progressDialog from 'features/progressDialogSlice';
import Ws from 'features/ws/Ws';

const RavButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleDownloadImage = async () => {
    let body = {
      fen: state.board.fen[state.board.fen.length - 1 + state.panel.history.back],
      variant: getActiveMode().variant,
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

  const disabled = !state.board.movetext;

  if (state.ravMode.active) {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          id="RavButtons-copyFenString"
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
          id="RavButtons-heuristics"
          disabled={disabled}
          color="primary"
          size="medium"
          title="Heuristics"
          aria-label="heuristics"
          onClick={() => {
            dispatch(progressDialog.open());
            Ws.heuristics(Movetext.substring(state.board.movetext, state.panel.history.back));
          }}
        >
          <BarChartIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          id="RavButtons-downloadImage"
          disabled={disabled}
          color="primary"
          size="medium"
          title="Download Image"
          aria-label="flip"
          onClick={() => handleDownloadImage()}
        >
          <InsertPhotoIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    );
  }
}

export default RavButtons;
