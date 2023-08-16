import React from 'react';
import { useSelector } from 'react-redux';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Button, Stack } from "@mui/material";
import { getActiveMode } from 'app/store';

const RavButtons = () => {
  const state = useSelector(state => state);

  const handleDownloadImage = async () => {
    let body = {
      fen: state.board.fen[state.board.fen.length - 1 + state.panel.history.back],
      variant: getActiveMode().variant,
      flip: state.board.flip
    };
    await fetch(`${process.env.REACT_APP_API_PROT}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/download/image`, {
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
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          size="large"
          startIcon={<WidgetsIcon />}
          id="RavButtons-copyFenString"
          disabled={disabled}
          color="primary"
          title="Copy FEN string"
          aria-label="fen"
          onClick={() => navigator.clipboard.writeText(state.board.fen[state.board.fen.length - 1 + state.panel.history.back])}
        />
        <Button
          size="large"
          startIcon={<InsertPhotoIcon />}
          id="RavButtons-downloadImage"
          disabled={disabled}
          color="primary"
          title="Download Image"
          aria-label="flip"
          onClick={() => handleDownloadImage()}
        />
      </Stack>
    );
  }
}

export default RavButtons;
