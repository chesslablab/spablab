import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import TuneIcon from '@mui/icons-material/Tune';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import WidgetsIcon from '@mui/icons-material/Widgets';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Button, Divider, Menu, MenuItem } from '@mui/material';
import * as navConst from 'features/nav/navConst';
import * as nav from 'features/nav/navSlice';
import * as fenMode from 'features/mode/fenModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as sanMode from 'features/mode/sanModeSlice';
import * as ravMode from 'features/mode/ravModeSlice';
import * as variantConst from 'features/mode/variantConst';
import multiAction from 'features/multiAction';

const ChessboardMenu = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  const [anchorElAnalysis, setAnchorElAnalysis] = useState(null);

  const handleCloseAnalysis = () => {
    setAnchorElAnalysis(null);
  };

  const handleClickAnalysis = (event) => {
    setAnchorElAnalysis(event.currentTarget);
  };

  return (
    <>
      <Button
        id="Nav-analysisBoard"
        sx={{ pl: 2, borderRadius: 0,justifyContent: 'flex-start' }}
        variant={state.name === navConst.ANALYSIS ? "contained" : "text"}
        startIcon={<TuneIcon />}
        onClick={handleClickAnalysis}
      >
        Chessboard
      </Button>
      <Menu
        anchorEl={anchorElAnalysis}
        open={Boolean(anchorElAnalysis)}
        onClose={handleCloseAnalysis}
      >
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startClassical"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setAnalysis());
            handleCloseAnalysis();
            dispatch({
              type: 'socket/start',
              payload: {
                variant: variantConst.CLASSICAL,
                mode: modeConst.FEN,
                settings: {},
              },
            });
          }}
        >
          <RestartAltIcon size="small" />&nbsp;Classical
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startFischerRandom960"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setAnalysis());
            handleCloseAnalysis();
            dispatch({
              type: 'socket/start',
              payload: {
                variant: variantConst.CHESS_960,
                mode: modeConst.FEN,
                settings: {},
              },
            });
          }}
        >
          <ShuffleIcon size="small" />&nbsp;Fischer Random
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startCapablanca"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setAnalysis());
            handleCloseAnalysis();
            dispatch({
              type: 'socket/start',
              payload: {
                variant: variantConst.CAPABLANCA,
                mode: modeConst.FEN,
                settings: {},
              },
            });
          }}
        >
          <BlurOnIcon size="small" />&nbsp;Capablanca
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startCapablancaFischer"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setAnalysis());
            handleCloseAnalysis();
            dispatch({
              type: 'socket/start',
              payload: {
                variant: variantConst.CAPABLANCA_FISCHER,
                mode: modeConst.FEN,
                settings: {},
              },
            });
          }}
        >
          <AllInclusiveIcon size="small" />&nbsp;Capablanca-Fischer
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-analysisBoard-MenuItem-sanMovetext"
          onClick={() => {
            dispatch(sanMode.loadSanDialog({ open: true }));
            handleCloseAnalysis();
          }}
        >
          <MoveDownIcon size="small" />&nbsp;SAN Movetext
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-ravMovetext"
          onClick={() => {
            dispatch(ravMode.loadRavDialog({ open: true }));
            handleCloseAnalysis();
          }}
        >
          <AccountTreeIcon size="small" />&nbsp;RAV Movetext
        </MenuItem>
        <Divider />
        <MenuItem
          id="Nav-analysisBoard-MenuItem-fenString"
          onClick={() => {
            dispatch(fenMode.loadFenDialog({ open: true }));
            handleCloseAnalysis();
          }}
        >
          <WidgetsIcon size="small" />&nbsp;FEN String
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            dispatch(fenMode.loadImageDialog({ open: true }));
            handleCloseAnalysis();
          }}
        >
          <InsertPhotoIcon size="small" />&nbsp;Import Image
        </MenuItem>
      </Menu>
    </>
  );
}

export default ChessboardMenu;
