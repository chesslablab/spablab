import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import TuneIcon from '@mui/icons-material/Tune';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import WidgetsIcon from '@mui/icons-material/Widgets';
import UploadIcon from '@mui/icons-material/Upload';
import { Button, Divider, Menu, MenuItem } from '@mui/material';
import * as navConst from 'features/nav/navConst';
import * as nav from 'features/nav/navSlice';
import * as fenMode from 'features/mode/fenModeSlice';
import * as imgUploadMode from 'features/mode/ImageUploadSlice';
import * as modeConst from 'features/mode/modeConst';
import * as sanMode from 'features/mode/sanModeSlice';
import * as ravMode from 'features/mode/ravModeSlice';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';

const AnalysisBoardMenu = () => {
  const state = useSelector(state => state);

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
        sx={{ borderRadius: 0, justifyContent: 'flex-start' }}
        variant={state.nav.name === navConst.ANALYSIS ? "contained" : "text"}
        startIcon={<TuneIcon />}
        onClick={handleClickAnalysis}
      >
        Analysis Board
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
            Ws.start(variantConst.CLASSICAL, modeConst.FEN);
          }}
        >
          <RestartAltIcon size="small" />&nbsp;Start Classical
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startFischerRandom960"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setAnalysis());
            handleCloseAnalysis();
            Ws.start(variantConst.CHESS_960, modeConst.FEN);
          }}
        >
          <ShuffleIcon size="small" />&nbsp;Start Fischer Random 960
        </MenuItem>
        <MenuItem
          id="Nav-analysisBoard-MenuItem-startCapablanca"
          onClick={() => {
            multiAction.initGui(dispatch);
            dispatch(nav.setAnalysis());
            handleCloseAnalysis();
            Ws.start(variantConst.CAPABLANCA, modeConst.FEN);
          }}
        >
          <BlurOnIcon size="small" />&nbsp;Start Capablanca
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
        <MenuItem
          onClick={() => {
            dispatch(imgUploadMode.loadImgDialog({ open: true }));
            handleCloseAnalysis();
          }}
        >
          <UploadIcon size="small" />&nbsp;Import Image
        </MenuItem>
      </Menu>
    </>
  );
}

export default AnalysisBoardMenu;
