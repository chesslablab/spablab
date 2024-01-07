import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { IconButton, Stack } from "@mui/material";
import { Movetext } from '@chesslablab/reactblab';
import { getActiveMode } from 'app/store';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as board from 'features/board/boardSlice';
import * as variantConst from 'features/mode/variantConst';
import * as panel from 'features/panel/panelSlice';
import * as progressDialog from 'features/progressDialogSlice';

const Buttons = () => {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const stateFenMode = useSelector(state => state.fenMode);

  const stateStockfishMode = useSelector(state => state.stockfishMode);

  const dispatch = useDispatch();

  const handleDownloadImage = async () => {
    await fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/download/image`, {
      method: 'POST',
      body: JSON.stringify({
        fen: stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back],
        variant: getActiveMode().variant,
        flip: stateBoard.flip
      })
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
    await fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/download/mp4`, {
      method: 'POST',
      body: JSON.stringify({
        variant: getActiveMode().variant,
        fen: stateBoard.fen[0],
        movetext: Movetext.substring(stateBoard.movetext, statePanel.history.back),
        flip: stateBoard.flip,
        ...(getActiveMode().variant === variantConst.CHESS_960) && {startPos: stateFenMode.startPos},
        ...(getActiveMode().variant === variantConst.CAPABLANCA_FISCHER) && {startPos: stateFenMode.startPos},
        ...(stateFenMode.active) && {fen: stateFenMode.fen}
      })
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

  const handleHeuristics = async () => {
    dispatch(progressDialog.open());
    await fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/heuristics`, {
      method: 'POST',
      body: JSON.stringify({
        variant: getActiveMode().variant,
        movetext: Movetext.substring(stateBoard.movetext, statePanel.history.back),
        ...(getActiveMode().variant === variantConst.CHESS_960) && {startPos: stateFenMode.startPos},
        ...(getActiveMode().variant === variantConst.CAPABLANCA_FISCHER) && {startPos: stateFenMode.startPos},
        ...(stateFenMode.active) && {fen: stateBoard.fen[0]},
        ...(stateStockfishMode.active) && {fen: stateBoard.fen[0]}
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch(panel.heuristicsDialog({
        open: true,
        heuristics: res
      }));
    })
    .catch(error => {
      dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
    })
    .finally(() => {
      dispatch(progressDialog.close());
    });
  }

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
        id="Buttons-flip"
        color="primary"
        title="Flip board"
        aria-label="flip"
        onClick={() => dispatch(board.flip())}
      >
        <CachedIcon />
      </IconButton>
      <IconButton
        size="small"
        id="Buttons-copyMovetext"
        disabled={!stateBoard.movetext}
        color="primary"
        title="Copy movetext"
        aria-label="copy"
        onClick={() => navigator.clipboard.writeText(Movetext.substring(stateBoard.movetext, statePanel.history.back))}
      >
        <MoveDownIcon />
      </IconButton>
      <IconButton
        size="small"
        id="Buttons-copyFenString"
        color="primary"
        title="Copy FEN string"
        aria-label="fen"
        onClick={() => navigator.clipboard.writeText(stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back])}
      >
        <WidgetsIcon />
      </IconButton>
      <IconButton
        size="small"
        id="Buttons-heuristics"
        disabled={!stateBoard.movetext}
        color="primary"
        title="Heuristics"
        aria-label="heuristics"
        onClick={() => handleHeuristics()}
      >
        <BarChartIcon />
      </IconButton>
      <IconButton
        size="small"
        id="Buttons-downloadImage"
        color="primary"
        title="Download Image"
        aria-label="flip"
        onClick={() => handleDownloadImage()}
      >
        <InsertPhotoIcon />
      </IconButton>
      <IconButton
        size="small"
        id="Buttons-downloadVideo"
        disabled={!stateBoard.movetext}
        color="primary"
        title="Download Video"
        aria-label="flip"
        onClick={() => handleDownloadMp4()}
      >
        <VideoCameraBackIcon />
      </IconButton>
    </Stack>
  );
}

export default Buttons;
