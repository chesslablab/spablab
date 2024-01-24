import { useSelector } from 'react-redux';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { IconButton, Stack } from "@mui/material";
import { getActiveMode } from 'app/store';

const RavButtons = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const handleDownloadImage = async () => {
    await fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API_VERSION}/download/image`, {
      method: 'POST',
      headers: {
        'X-Api-Key': `${process.env.REACT_APP_API_KEY}`
      },
      body: JSON.stringify({
        fen: stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back],
        variant: getActiveMode().variant,
        flip: stateBoard.flip
      })
    })
    .then(res => res.blob())
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

  const disabled = !stateBoard.movetext;

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ mt: 1.5 }}
    >
      <IconButton
        size="small"
        id="RavButtons-copyFenString"
        disabled={disabled}
        color="primary"
        title="Copy FEN string"
        aria-label="fen"
        onClick={() => navigator.clipboard.writeText(stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back])}
      >
        <WidgetsIcon />
      </IconButton>
      <IconButton
        size="small"
        id="RavButtons-downloadImage"
        disabled={disabled}
        color="primary"
        title="Download Image"
        aria-label="flip"
        onClick={() => handleDownloadImage()}
      >
        <InsertPhotoIcon />
      </IconButton>
    </Stack>
  );
}

export default RavButtons;
