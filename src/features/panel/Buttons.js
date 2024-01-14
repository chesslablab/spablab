import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CommentIcon from '@mui/icons-material/Comment';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse} from '@mui/material';
import { Movetext } from '@chesslablab/reactblab';
import { getActiveMode } from 'app/store';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as board from 'features/board/boardSlice';
import * as variantConst from 'features/mode/variantConst';
import * as panel from 'features/panel/panelSlice';
import * as progressDialog from 'features/progressDialogSlice';

export default function Buttons() {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const stateFenMode = useSelector(state => state.fenMode);

  const stateStockfishMode = useSelector(state => state.stockfishMode);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
    <List
      sx={{ width: '100%', bgcolor: 'background.paper', pt: 0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton disableRipple onClick={handleClick}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: '0.9rem' }}
          primary="Game Actions"
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => dispatch(board.flip())}
          >
            <ListItemIcon>
              <CachedIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: '0.9rem' }}
              primary="Flip Board"
            />
          </ListItemButton>
          <ListItemButton
            disabled={!stateBoard.movetext}
            onClick={() => navigator.clipboard.writeText(Movetext.substring(stateBoard.movetext, statePanel.history.back))}
          >
            <ListItemIcon>
              <MoveDownIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: '0.9rem' }}
              primary="Copy Movetext"
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => navigator.clipboard.writeText(stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back])}
          >
            <ListItemIcon>
              <WidgetsIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: '0.9rem' }}
              primary="Copy FEN string"
            />
          </ListItemButton>
          <ListItemButton
            disabled={!stateBoard.movetext}
            onClick={() => handleHeuristics()}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: '0.9rem' }}
              primary="Heuristics"
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleDownloadImage()}
          >
            <ListItemIcon>
              <InsertPhotoIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: '0.9rem' }}
              primary="Download Image"
            />
          </ListItemButton>
          <ListItemButton
            disabled={!stateBoard.movetext}
            onClick={() => handleDownloadMp4()}
          >
            <ListItemIcon>
              <VideoCameraBackIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: '0.9rem' }}
              primary="Download Video"
            />
          </ListItemButton>
          <ListItemButton disabled>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: '0.9rem' }}
              primary="Explain Position"
            />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
