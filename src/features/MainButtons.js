import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BookIcon from '@mui/icons-material/Book';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ExtensionIcon from '@mui/icons-material/Extension';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import QuizIcon from '@mui/icons-material/Quiz';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import TuneIcon from '@mui/icons-material/Tune';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Button, ButtonGroup, Divider, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../assets/img/logo.png';
import Dispatcher from '../common/Dispatcher';
import Pgn from '../common/Pgn';
import Wording from '../common/Wording';
import * as mainButtonsConst from '../features/mainButtonsConst';
import * as mainButtons from '../features/mainButtonsSlice';
import * as loadFenDialog from '../features/dialog/loadFenDialogSlice';
import * as loadPgnDialog from '../features/dialog/loadPgnDialogSlice';
import * as eventsStatsDialog from '../features/dialog/eventsStatsDialogSlice';
import * as openingsStatsDialog from '../features/dialog/openingsStatsDialogSlice';
import * as playersStatsDialog from '../features/dialog/playersStatsDialogSlice';
import * as searchGamesDialog from '../features/dialog/searchGamesDialogSlice';
import * as searchEcoDialog from '../features/dialog/searchEcoDialogSlice';
import * as searchMovetextDialog from '../features/dialog/searchMovetextDialogSlice';
import * as searchNameDialog from '../features/dialog/searchNameDialogSlice';
import * as checkmateSkillsDialog from '../features/dialog/checkmateSkillsDialogSlice';
import * as endgameSkillsDialog from '../features/dialog/endgameSkillsDialogSlice';
import * as watchDialog from '../features/dialog/watchDialogSlice';
import * as modeConst from '../features/mode/modeConst';
import * as mode from '../features/mode/modeSlice';
import * as variantConst from '../features/variant/variantConst';
import WsAction from '../ws/WsAction';

const useStyles = makeStyles({
  iconButton: {
    '&:hover': {
      backgroundColor: "#fff !important",
    },
  },
  logo: {
    width: '110px',
    margin: 'auto',
  },
});

const MainButtons = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElAnalysis, setAnchorElAnalysis] = useState(null);
  const [anchorElDatabase, setAnchorElDatabase] = useState(null);
  const [anchorElTraining, setAnchorElTraining] = useState(null);
  const [anchorElOpeningSearch, setAnchorElOpeningSearch] = useState(null);

  const matches = useMediaQuery("(min-width:900px)");

  const handleCloseAnalysis = () => {
    setAnchorElAnalysis(null);
  };

  const handleCloseDatabase = () => {
    setAnchorElDatabase(null);
  };

  const handleCloseTraining = () => {
    setAnchorElTraining(null);
  };

  const handleCloseOpeningSearch = () => {
    setAnchorElOpeningSearch(null);
  };

  const handleClickAnalysis = (event) => {
    setAnchorElAnalysis(event.currentTarget);
  };

  const handleClickDatabase = (event) => {
    setAnchorElDatabase(event.currentTarget);
  };

  const handleClickTraining = (event) => {
    setAnchorElTraining(event.currentTarget);
  };

  const handleClickOpeningSearch = (event) => {
    setAnchorElOpeningSearch(event.currentTarget);
  };

  const disabled = state.mode.name === modeConst.PLAY &&
    state.mode.play.accepted &&
    (!state.mode.play.draw || state.mode.play.draw === Wording.verb.PROPOSE.toLowerCase()) &&
    !state.mode.play.resign &&
    !state.mode.play.leave &&
    !state.mode.play.timer.over &&
    !state.board.isMate;

  return (
    <ButtonGroup
      orientation="vertical"
      size="small"
      variant="text"
      aria-label="Main Menu"
      fullWidth={matches ? false : true}
      disabled={disabled}
    >
      <IconButton className={classes.iconButton} href="/">
        <img className={classes.logo} src={logo} />
      </IconButton>
      <Button
        sx={{ borderRadius: 0 }}
        variant={state.mainButtons.name === mainButtonsConst.ANALYSIS ? "contained" : "text"}
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
        <MenuItem onClick={() => {
          dispatch(mainButtons.setAnalysis());
          Dispatcher.initGui(dispatch);
          WsAction.start(state, variantConst.CLASSICAL, modeConst.ANALYSIS);
          handleCloseAnalysis();
        }}>
          <RestartAltIcon size="small" />&nbsp;Start Classical
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(mainButtons.setAnalysis());
          Dispatcher.initGui(dispatch);
          WsAction.start(state, variantConst.CHESS_960, modeConst.ANALYSIS);
          handleCloseAnalysis();
        }}>
          <RestartAltIcon size="small" />&nbsp;Start 960
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          dispatch(loadPgnDialog.open());
          handleCloseAnalysis();
        }}>
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(loadFenDialog.open());
          handleCloseAnalysis();
        }}>
          <WidgetsIcon size="small" />&nbsp;FEN String
        </MenuItem>
      </Menu>
      <Button
        variant={state.mainButtons.name === mainButtonsConst.OPENING_SEARCH ? "contained" : "text"}
        startIcon={<SearchIcon />}
        onClick={handleClickOpeningSearch}
      >
        Opening Search
      </Button>
      <Button
        variant={state.mainButtons.name === mainButtonsConst.MAIN_BUTTON_OPENING_DATABASE ? "contained" : "text"}
        startIcon={<StorageIcon />}
        onClick={handleClickDatabase}
      >
        Database
      </Button>
      <Menu
        anchorEl={anchorElDatabase}
        open={Boolean(anchorElDatabase)}
        onClose={handleCloseDatabase}
      >
        <MenuItem onClick={() => {
          dispatch(searchGamesDialog.open());
          handleCloseDatabase();
        }}>
          <TravelExploreIcon size="small" />&nbsp;Search Games
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          dispatch(openingsStatsDialog.open());
          handleCloseDatabase();
        }}>
          <AutoGraphIcon size="small" />&nbsp;Top 50 Openings
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(playersStatsDialog.open());
          handleCloseDatabase();
        }}>
          <QueryStatsIcon size="small" />&nbsp;Players Stats
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(eventsStatsDialog.open());
          handleCloseDatabase();
        }}>
          <TroubleshootIcon size="small" />&nbsp;Events Stats
        </MenuItem>
      </Menu>
      <Button
        variant={state.mainButtons.name === mainButtonsConst.TRAINING ? "contained" : "text"}
        startIcon={<PsychologyIcon />}
        onClick={handleClickTraining}
      >
        Training
      </Button>
      <Menu
        anchorEl={anchorElTraining}
        open={Boolean(anchorElTraining)}
        onClose={handleCloseTraining}
      >
        <MenuItem onClick={() => {
          dispatch(mainButtons.setTraining());
          Dispatcher.initGui(dispatch);
          WsAction.start(state, variantConst.CLASSICAL, modeConst.GM, {
            color: Pgn.symbol.WHITE
          });
          handleCloseTraining();
        }}>
          <QuizIcon size="small" />&nbsp;Guess the Move
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(endgameSkillsDialog.open());
          handleCloseTraining();
        }}>
          <ExtensionIcon size="small" />&nbsp;Endgame Skills
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(checkmateSkillsDialog.open());
          handleCloseTraining();
        }}>
          <CheckBoxIcon size="small" />&nbsp;Checkmate Skills
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElOpeningSearch}
        open={Boolean(anchorElOpeningSearch)}
        onClose={handleCloseOpeningSearch}
      >
        <MenuItem onClick={() => {
          dispatch(searchEcoDialog.open());
          handleCloseOpeningSearch();
        }}>
          <BookIcon size="small" />&nbsp;ECO Code
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(searchMovetextDialog.open());
          handleCloseOpeningSearch();
        }}>
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(searchNameDialog.open());
          handleCloseOpeningSearch();
        }}>
          <SpellcheckIcon size="small" />&nbsp;Name
        </MenuItem>
      </Menu>
      <Button
        sx={{ borderRadius: 0 }}
        startIcon={<OndemandVideoIcon />}
        onClick={() => dispatch(watchDialog.open())}
      >
        Watch
      </Button>
    </ButtonGroup>
  );
}

export default MainButtons;
