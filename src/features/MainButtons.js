import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookIcon from '@mui/icons-material/Book';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LanguageIcon from '@mui/icons-material/Language';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QuizIcon from '@mui/icons-material/Quiz';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StorageIcon from '@mui/icons-material/Storage';
import TuneIcon from '@mui/icons-material/Tune';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Button, ButtonGroup, Divider, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../assets/img/logo.png';
import SyncAction from '../common/SyncAction';
import {
  MAIN_BUTTON_ANALYSIS,
  MAIN_BUTTON_PLAY_ONLINE,
  MAIN_BUTTON_PLAY_A_FRIEND,
  MAIN_BUTTON_PLAY_COMPUTER,
  MAIN_BUTTON_TRAINING,
  MAIN_BUTTON_OPENING_SEARCH,
  MAIN_BUTTON_OPENING_DATABASE
} from '../features/mainButtonsConstants';
import {
  MODE_PLAY,
} from '../features/modeConstants';
import { setAnalysis, setTraining } from '../features/mainButtonsSlice';
import { startAnalysis } from '../features/modeSlice';
import { openCreateInviteCodeDialog } from '../features/dialog/createInviteCodeDialogSlice';
import { openDatabaseDialog } from '../features/dialog/databaseDialogSlice';
import { openEnterInviteCodeDialog } from '../features/dialog/enterInviteCodeDialogSlice';
import { openLoadFenDialog } from '../features/dialog/loadFenDialogSlice';
import { openLoadPgnDialog } from '../features/dialog/loadPgnDialogSlice';
import { openSearchEcoDialog } from '../features/dialog/searchEcoDialogSlice';
import { openSearchMovetextDialog } from '../features/dialog/searchMovetextDialogSlice';
import { openSearchNameDialog } from '../features/dialog/searchNameDialogSlice';
import { openCheckmateSkillsDialog } from '../features/dialog/checkmateSkillsDialogSlice';
import { openPlayComputerDialog } from '../features/dialog/playComputerDialogSlice';
import { openPlayGmDialog } from '../features/dialog/playGmDialogSlice';
import { openPlayOnlineDialog } from '../features/dialog/playOnlineDialogSlice';
import { openProgressDialog } from '../features/dialog/progressDialogSlice';
import { openWatchDialog } from '../features/dialog/watchDialogSlice';
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
  const [anchorElTraining, setAnchorElTraining] = useState(null);
  const [anchorElOpeningSearch, setAnchorElOpeningSearch] = useState(null);
  const [anchorElPlay, setAnchorElPlay] = useState(null);

  const matches = useMediaQuery("(min-width:900px)");

  const handleCloseAnalysis = () => {
    setAnchorElAnalysis(null);
  };

  const handleCloseTraining = () => {
    setAnchorElTraining(null);
  };

  const handleCloseOpeningSearch = () => {
    setAnchorElOpeningSearch(null);
  };

  const handleClosePlay = () => {
    setAnchorElPlay(null);
  };

  const handleClickAnalysis = (event) => {
    setAnchorElAnalysis(event.currentTarget);
  };

  const handleClickTraining = (event) => {
    setAnchorElTraining(event.currentTarget);
  };

  const handleClickOpeningSearch = (event) => {
    setAnchorElOpeningSearch(event.currentTarget);
  };

  const handleClickPlay = (event) => {
    setAnchorElPlay(event.currentTarget);
  };

  return (
    <ButtonGroup
      orientation="vertical"
      size="small"
      variant="text"
      aria-label="Main Menu"
      fullWidth={matches ? false : true}
      disabled={state.mode.name === MODE_PLAY &&
        state.mode.play.accepted &&
        !state.mode.play.draw &&
        !state.mode.play.resign &&
        !state.mode.play.resign &&
        !state.mode.play.leave &&
        !state.mode.play.timer.over &&
        !state.board.isMate
      }>
      <IconButton className={classes.iconButton} href="/">
        <img className={classes.logo} src={logo} />
      </IconButton>
      <Button
        sx={{ borderRadius: 0 }}
        variant={state.mainButtons.name === MAIN_BUTTON_ANALYSIS ? "contained" : "text"}
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
          dispatch(setAnalysis());
          handleCloseAnalysis();
          SyncAction.reset(dispatch);
          WsAction.startAnalysis(state.server.ws);
        }}>
          <RestartAltIcon size="small" />&nbsp;Start Position
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openLoadPgnDialog());
          handleCloseAnalysis();
        }}>
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openLoadFenDialog());
          handleCloseAnalysis();
        }}>
          <WidgetsIcon size="small" />&nbsp;FEN String
        </MenuItem>
      </Menu>
      <Button
        variant={state.mainButtons.name === MAIN_BUTTON_OPENING_SEARCH ? "contained" : "text"}
        startIcon={<SearchIcon />}
        onClick={handleClickOpeningSearch}
      >
        Opening Search
      </Button>
      <Button
        variant={state.mainButtons.name === MAIN_BUTTON_OPENING_DATABASE ? "contained" : "text"}
        startIcon={<StorageIcon />}
        onClick={() => dispatch(openDatabaseDialog())}
      >
        Database
      </Button>
      <Button
        variant={state.mainButtons.name === MAIN_BUTTON_TRAINING ? "contained" : "text"}
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
          dispatch(openCheckmateSkillsDialog());
          handleCloseTraining();
        }}>
          <CheckBoxIcon size="small" />&nbsp;Checkmate Skills
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openPlayGmDialog());
          handleCloseTraining();
        }}>
          <QuizIcon size="small" />&nbsp;Guess the Move
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(setTraining());
          dispatch(openProgressDialog());
          handleCloseTraining();
          WsAction.randomGame(state);
        }}>
          <EmojiEventsIcon size="small" />&nbsp;Random Tournament Game
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElOpeningSearch}
        open={Boolean(anchorElOpeningSearch)}
        onClose={handleCloseOpeningSearch}
      >
        <MenuItem onClick={() => {
          dispatch(openSearchEcoDialog());
          handleCloseOpeningSearch();
        }}>
          <BookIcon size="small" />&nbsp;ECO Code
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openSearchMovetextDialog());
          handleCloseOpeningSearch();
        }}>
          <MoveDownIcon size="small" />&nbsp;PGN Movetext
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openSearchNameDialog());
          handleCloseOpeningSearch();
        }}>
          <SpellcheckIcon size="small" />&nbsp;Name
        </MenuItem>
      </Menu>
      <Button
        sx={{ borderRadius: 0 }}
        startIcon={<OndemandVideoIcon />}
        onClick={() => dispatch(openWatchDialog())}
      >
        Watch
      </Button>
      <Button
        aria-controls={Boolean(anchorElPlay) ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorElPlay) ? 'true' : undefined}
        variant={state.mainButtons.name === MAIN_BUTTON_PLAY_ONLINE ||
          state.mainButtons.name === MAIN_BUTTON_PLAY_A_FRIEND ||
          state.mainButtons.name === MAIN_BUTTON_PLAY_COMPUTER
            ? "contained"
            : "text"
        }
        disableElevation
        onClick={handleClickPlay}
        startIcon={<SportsEsportsIcon />}
      >
        Play
      </Button>
      <Menu
        anchorEl={anchorElPlay}
        open={Boolean(anchorElPlay)}
        onClose={handleClosePlay}
      >
        <MenuItem style={{ pointerEvents: 'none', justifyContent: 'center' }}>
          Online
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(openPlayOnlineDialog());
            handleClosePlay();
            WsAction.onlineGames(state);
          }}
        >
          <LanguageIcon size="small" />&nbsp;Create game
        </MenuItem>
        <Divider />
        <MenuItem style={{ pointerEvents: 'none', justifyContent: 'center' }}>
          A friend
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(openCreateInviteCodeDialog());
            dispatch(startAnalysis());
            handleClosePlay();
          }}
        >
          <QrCodeIcon />&nbsp;Create Invite Code
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(openEnterInviteCodeDialog());
            handleClosePlay();
          }}
        >
          <KeyboardIcon />&nbsp;Enter Invite Code
        </MenuItem>
        <Divider />
        <MenuItem style={{ pointerEvents: 'none', justifyContent: 'center' }}>
          Computer
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(openPlayComputerDialog());
            handleClosePlay();
          }}
        >
          <SmartToyIcon size="small" />&nbsp;Create game
        </MenuItem>
      </Menu>
    </ButtonGroup>
  );
}

export default MainButtons;
