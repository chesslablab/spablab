import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import LanguageIcon from '@mui/icons-material/Language';
import { Button, ButtonGroup, Menu, MenuItem, useMediaQuery } from '@mui/material';
import chessOpeningSearchEcoDialogActionTypes from '../constants/dialog/chessOpeningSearchEcoDialogActionTypes';
import chessOpeningSearchMovetextDialogActionTypes from '../constants/dialog/chessOpeningSearchMovetextDialogActionTypes';
import chessOpeningSearchNameDialogActionTypes from '../constants/dialog/chessOpeningSearchNameDialogActionTypes';
import createInviteCodeDialogActionTypes from '../constants/dialog/createInviteCodeDialogActionTypes';
import enterInviteCodeDialogActionTypes from '../constants/dialog/enterInviteCodeDialogActionTypes';
import loadFenDialogActionTypes from '../constants/dialog/loadFenDialogActionTypes';
import loadPgnDialogActionTypes from '../constants/dialog/loadPgnDialogActionTypes';
import playLikeGrandmasterDialogActionTypes from '../constants/dialog/playLikeGrandmasterDialogActionTypes';
import { progressDialogOpen } from '../features/dialog/progressDialogSlice';
import { watchDialogOpen } from '../features/dialog/watchDialogSlice';
import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
import WsAction from '../ws/WsAction';

const MainButtons = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElPlayFriend, setAnchorElPlayFriend] = useState(null);
  const [anchorElAnalysis, setAnchorElAnalysis] = useState(null);
  const [anchorElTraining, setAnchorElTraining] = useState(null);
  const [anchorElOpeningSearch, setAnchorElOpeningSearch] = useState(null);

  const matches = useMediaQuery("(min-width:900px)");

  const handleClosePlayFriend = () => {
    setAnchorElPlayFriend(null);
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
      disabled={state.mode.current === modeNames.PLAY &&
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
          dispatch(progressDialogOpen());
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
          dispatch({ type: createInviteCodeDialogActionTypes.OPEN });
          dispatch({ type: modeActionTypes.SET_ANALYSIS });
          handleClosePlayFriend();
        }}>Create Invite Code</MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: enterInviteCodeDialogActionTypes.OPEN });
          handleClosePlayFriend();
        }}>Enter Invite Code</MenuItem>
      </Menu>
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
          dispatch({ type: loadFenDialogActionTypes.OPEN });
          handleCloseAnalysis();
        }}>
          FEN String
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: loadPgnDialogActionTypes.OPEN });
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
          dispatch({ type: playLikeGrandmasterDialogActionTypes.OPEN });
          handleCloseTraining();
        }}>
          Guess the Move
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch(progressDialogOpen());
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
          dispatch({ type: chessOpeningSearchEcoDialogActionTypes.OPEN });
          handleCloseOpeningSearch();
        }}>
          ECO Code
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: chessOpeningSearchNameDialogActionTypes.OPEN });
          handleCloseOpeningSearch();
        }}>
          Name
        </MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: chessOpeningSearchMovetextDialogActionTypes.OPEN });
          handleCloseOpeningSearch();
        }}>
          Movetext
        </MenuItem>
      </Menu>
      <Button
        startIcon={<OndemandVideoIcon />}
        onClick={() => dispatch(watchDialogOpen())}
      >
        Watch
      </Button>
    </ButtonGroup>
  );
}

export default MainButtons;
