import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import LanguageIcon from '@mui/icons-material/Language';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Button, ButtonGroup, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { openCreateInviteCodeDialog } from '../features/dialog/createInviteCodeDialogSlice';
import { openEnterInviteCodeDialog } from '../features/dialog/enterInviteCodeDialogSlice';
import { openLoadFenDialog } from '../features/dialog/loadFenDialogSlice';
import { openLoadPgnDialog } from '../features/dialog/loadPgnDialogSlice';
import { openSearchEcoDialog } from '../features/dialog/searchEcoDialogSlice';
import { openSearchMovetextDialog } from '../features/dialog/searchMovetextDialogSlice';
import { openSearchNameDialog } from '../features/dialog/searchNameDialogSlice';
import { openCheckmateSkillsDialog } from '../features/dialog/checkmateSkillsDialogSlice';
import { openPlayGmDialog } from '../features/dialog/playGmDialogSlice';
import { openPlayComputerDialog } from '../features/dialog/playComputerDialogSlice';
import { openProgressDialog } from '../features/dialog/progressDialogSlice';
import { openWatchDialog } from '../features/dialog/watchDialogSlice';
import { MODE_PLAY } from '../features/modeConstants';
import { startAnalysis } from '../features/modeSlice';
import WsAction from '../ws/WsAction';

const MainButtons = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElPlayFriend, setAnchorElPlayFriend] = useState(null);
  const [anchorElPlayComputer, setAnchorElPlayComputer] = useState(null);
  const [anchorElAnalysis, setAnchorElAnalysis] = useState(null);
  const [anchorElTraining, setAnchorElTraining] = useState(null);
  const [anchorElOpeningSearch, setAnchorElOpeningSearch] = useState(null);

  const matches = useMediaQuery("(min-width:900px)");

  const handleClosePlayFriend = () => {
    setAnchorElPlayFriend(null);
  };

  const handleClosePlayComputer = () => {
    setAnchorElPlayComputer(null);
  };

  const handleCloseAnalysis = () => {
    setAnchorElAnalysis(null);
  };

  const handleCloseTraining = () => {
    setAnchorElTraining(null);
  };

  const handleCloseOpeningSearch = () => {
    setAnchorElOpeningSearch(null);
  };

  const handleClickPlayFriend = (event) => {
    setAnchorElPlayFriend(event.currentTarget);
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
      <Button
        startIcon={<LanguageIcon />}
        onClick={() => {
          dispatch(openProgressDialog());
          WsAction.onlineGames(state);
        }}
      >
        Play Online
      </Button>
      <Button
        startIcon={<GroupAddIcon />}
        onClick={handleClickPlayFriend}
      >
        Play a Friend
      </Button>
      <Menu
        anchorEl={anchorElPlayFriend}
        keepMounted
        open={Boolean(anchorElPlayFriend)}
        onClose={handleClosePlayFriend}
      >
        <MenuItem onClick={() => {
          dispatch(openCreateInviteCodeDialog());
          dispatch(startAnalysis());
          handleClosePlayFriend();
        }}>Create Invite Code</MenuItem>
        <MenuItem onClick={() => {
          dispatch(openEnterInviteCodeDialog());
          handleClosePlayFriend();
        }}>Enter Invite Code</MenuItem>
      </Menu>
      <Button
        startIcon={<SmartToyIcon />}
        onClick={() => {
          dispatch(openPlayComputerDialog());
          handleClosePlayComputer();
        }}
      >
        Play Computer
      </Button>
      <Button
        startIcon={<TuneIcon />}
        onClick={handleClickAnalysis}
      >
        Analysis Board
      </Button>
      <Menu
        anchorEl={anchorElAnalysis}
        keepMounted
        open={Boolean(anchorElAnalysis)}
        onClose={handleCloseAnalysis}
      >
        <MenuItem onClick={() => {
          WsAction.quit(state).then(() => WsAction.startAnalysis(state.server.ws));
          handleCloseAnalysis();
        }}>
          Start Position
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openLoadFenDialog());
          handleCloseAnalysis();
        }}>
          FEN String
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openLoadPgnDialog());
          handleCloseAnalysis();
        }}>
          PGN Movetext
        </MenuItem>
      </Menu>
      <Button
        startIcon={<PsychologyIcon />}
        onClick={handleClickTraining}
      >
        Training
      </Button>
      <Menu
        anchorEl={anchorElTraining}
        keepMounted
        open={Boolean(anchorElTraining)}
        onClose={handleCloseTraining}
      >
        <MenuItem onClick={() => {
          dispatch(openCheckmateSkillsDialog());
          handleCloseTraining();
        }}>
          Checkmate Skills
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openPlayGmDialog());
          handleCloseTraining();
        }}>
          Guess the Move
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openProgressDialog());
          WsAction.quit(state).then(() => WsAction.randomGame(state));
          handleCloseTraining();
        }}>
          Random Tournament Game
        </MenuItem>
      </Menu>
      <Button
        startIcon={<SearchIcon />}
        onClick={handleClickOpeningSearch}
      >
        Opening Search
      </Button>
      <Menu
        anchorEl={anchorElOpeningSearch}
        keepMounted
        open={Boolean(anchorElOpeningSearch)}
        onClose={handleCloseOpeningSearch}
      >
        <MenuItem onClick={() => {
          dispatch(openSearchEcoDialog());
          handleCloseOpeningSearch();
        }}>
          ECO Code
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openSearchNameDialog());
          handleCloseOpeningSearch();
        }}>
          Name
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(openSearchMovetextDialog());
          handleCloseOpeningSearch();
        }}>
          Movetext
        </MenuItem>
      </Menu>
      <Button
        startIcon={<OndemandVideoIcon />}
        onClick={() => dispatch(openWatchDialog())}
      >
        Watch
      </Button>
    </ButtonGroup>
  );
}

export default MainButtons;
