import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Movetext } from '@chesslablab/reactblab';
import { getActiveMode } from 'app/store';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as board from 'features/board/boardSlice';
import * as variantConst from 'features/mode/variantConst';
import * as panel from 'features/panel/panelSlice';
import * as progressDialog from 'features/progressDialogSlice';

export default function BasicMenu() {
  const stateBoard = useSelector(state => state.board);

  const statePanel = useSelector(state => state.panel);

  const stateFenMode = useSelector(state => state.fenMode);

  const stateStockfishMode = useSelector(state => state.stockfishMode);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadImage = async () => {
    await fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/download/image`, {
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

  const handleDownloadMp4 = async () => {
    dispatch(progressDialog.open());
    await fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/download/mp4`, {
      method: 'POST',
      headers: {
        'X-Api-Key': `${process.env.REACT_APP_API_KEY}`
      },
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
      headers: {
        'X-Api-Key': `${process.env.REACT_APP_API_KEY}`
      },
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
    <div>
      <Button
        sx={{ borderRadius: 0 }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<AddIcon />}
        fullWidth={true}
      >
        Game Actions
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          dispatch(board.flip());
          handleClose();
        }}>
          <ListItemIcon>
            <CachedIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: '0.9rem' }}
            primary="Flip Board"
          />
        </MenuItem>
        <MenuItem
          disabled={!stateBoard.movetext}
          onClick={() => {
            navigator.clipboard.writeText(Movetext.substring(stateBoard.movetext, statePanel.history.back));
            handleClose();
        }}>
          <ListItemIcon>
            <MoveDownIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: '0.9rem' }}
            primary="Copy Movetext"
          />
        </MenuItem>
        <MenuItem onClick={() => {
          navigator.clipboard.writeText(stateBoard.fen[stateBoard.fen.length - 1 + statePanel.history.back]);
          handleClose();
        }}>
          <ListItemIcon>
            <MoveDownIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: '0.9rem' }}
            primary="Copy FEN string"
          />
        </MenuItem>
        <MenuItem
          disabled={!stateBoard.movetext}
          onClick={() => {
            handleHeuristics();
            handleClose();
        }}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: '0.9rem' }}
            primary="Heuristics"
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDownloadImage();
            handleClose();
        }}>
          <ListItemIcon>
            <InsertPhotoIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: '0.9rem' }}
            primary="Download Image"
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDownloadMp4();
            handleClose();
        }}>
          <ListItemIcon>
            <VideoCameraBackIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: '0.9rem' }}
            primary="Download Video"
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
