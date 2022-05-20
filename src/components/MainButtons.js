import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import LanguageIcon from '@mui/icons-material/Language';
import { Button, ButtonGroup, Menu, MenuItem, useMediaQuery } from '@mui/material';
import infoAlertActionTypes from '../constants/alert/infoAlertActionTypes';
import chessOpeningSearchEcoDialogActionTypes from '../constants/dialog/chessOpeningSearchEcoDialogActionTypes';
import chessOpeningSearchMovetextDialogActionTypes from '../constants/dialog/chessOpeningSearchMovetextDialogActionTypes';
import chessOpeningSearchNameDialogActionTypes from '../constants/dialog/chessOpeningSearchNameDialogActionTypes';
import createInviteCodeDialogActionTypes from '../constants/dialog/createInviteCodeDialogActionTypes';
import enterInviteCodeDialogActionTypes from '../constants/dialog/enterInviteCodeDialogActionTypes';
import loadFenDialogActionTypes from '../constants/dialog/loadFenDialogActionTypes';
import loadPgnDialogActionTypes from '../constants/dialog/loadPgnDialogActionTypes';
import playLikeGrandmasterDialogActionTypes from '../constants/dialog/playLikeGrandmasterDialogActionTypes';
import playOnlineDialogActionTypes from '../constants/dialog/playOnlineDialogActionTypes';
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';
import watchDialogActionTypes from '../constants/dialog/watchDialogActionTypes';
import chessOpeningAnalysisTableActionTypes from '../constants/table/chessOpeningAnalysisTableActionTypes';
import tournamentGameTableActionTypes from '../constants/table/tournamentGameTableActionTypes';
import heuristicsBarActionTypes from '../constants/heuristicsBarActionTypes';
import historyActionTypes from '../constants/historyActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import Tournament from '../utils/Tournament.js';
import WsAction from '../ws/WsAction';

const MainButtons = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElPlayFriend, setAnchorElPlayFriend] = useState(null);
  const [anchorElAnalysis, setAnchorElAnalysis] = useState(null);
  const [anchorElTraining, setAnchorElTraining] = useState(null);
  const [anchorElOpeningSearch, setAnchorElOpeningSearch] = useState(null);

  const matches = useMediaQuery("(min-width:900px)");

  const reset = () => {
    dispatch({ type: heuristicsBarActionTypes.RESET });
    dispatch({ type: chessOpeningAnalysisTableActionTypes.CLOSE });
    dispatch({ type: tournamentGameTableActionTypes.CLOSE });
    dispatch({ type: infoAlertActionTypes.CLOSE });
    dispatch({ type: historyActionTypes.GO_TO, payload: { back: 0 }});
    WsAction.quit(state).then(() => WsAction.startAnalysis(state.server.ws));
  };

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
    reset();
    setAnchorElPlayFriend(event.currentTarget);
  };

  const handleClickAnalysis = (event) => {
    reset();
    setAnchorElAnalysis(event.currentTarget);
  };

  const handleClickTraining = (event) => {
    reset();
    setAnchorElTraining(event.currentTarget);
  };

  const handleClickOpeningSearch = (event) => {
    reset();
    setAnchorElOpeningSearch(event.currentTarget);
  };

  const handleRandomTournamentGame = async () => {
    dispatch({ type: progressDialogActionTypes.OPEN });
    const game = Tournament.rand();
    dispatch({
      type: tournamentGameTableActionTypes.DISPLAY,
      payload: {
        game: {
          Event: game.Event,
          Site: game.Site,
          Date: game.Date,
          White: game.White,
          Black: game.Black,
          Result: game.Result,
          ECO: game.ECO
        }
      }
    });
    WsAction.quit(state).then(() => WsAction.startLoadpgn(state, game.movetext));
  }

  return (
    <ButtonGroup
      orientation="vertical"
      size="small"
      variant="text"
      aria-label="Main Menu"
      fullWidth={matches ? false : true}
    >
      <Button
        startIcon={<LanguageIcon />}
        onClick={() => dispatch({ type: playOnlineDialogActionTypes.OPEN })}
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
          reset();
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
        <MenuItem onClick={() => handleRandomTournamentGame().then(() => handleCloseTraining())}>
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
        onClick={() => dispatch({ type: watchDialogActionTypes.OPEN })}
      >
        Watch
      </Button>
    </ButtonGroup>
  );
}

export default MainButtons;
