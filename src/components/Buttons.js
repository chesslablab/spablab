import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, ButtonGroup, Menu, MenuItem } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import TuneIcon from '@mui/icons-material/Tune';
import PublishIcon from '@mui/icons-material/Publish';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import boardActionTypes from '../constants/boardActionTypes';
import loadFenDialogActionTypes from '../constants/loadFenDialogActionTypes';
import loadPgnDialogActionTypes from '../constants/loadPgnDialogActionTypes';
import fenDialogActionTypes from '../constants/fenDialogActionTypes';
import createInviteCodeDialogActionTypes from '../constants/createInviteCodeDialogActionTypes';
import enterInviteCodeDialogActionTypes from '../constants/enterInviteCodeDialogActionTypes';
import playLikeGrandmasterDialogActionTypes from '../constants/playLikeGrandmasterDialogActionTypes';
import alertActionTypes from '../constants/alertActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import pgnDialogActionTypes from '../constants/pgnDialogActionTypes';
import { DownloadImage } from './DownloadImage'
import {
  wsMssgStartAnalysis,
  wsMssgStartGrandmaster,
  wsMssgHeuristicpicture,
  wsMssgQuit,
  wsMssgFen
} from '../actions/serverActions';

const Buttons = ({ props }) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElPlayFriend, setAnchorElPlayFriend] = React.useState(null);
  const [anchorElPlayWithTheComputer, setAnchorElPlayWithTheComputer] = React.useState(null);
  const [anchorElLoad, setAnchorElLoad] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);

   const matches = useMediaQuery("(min-width:768px)");

  const handleClosePlayFriend = () => {
    setAnchorElPlayFriend(null);
  };

  const handleClosePlayWithTheComputer = () => {
    setAnchorElPlayWithTheComputer(null);
  };

  const handleCloseLoad = () => {
    setAnchorElLoad(null);
  };

  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };

  const handleClickPlayFriend = (event) => {
    setAnchorElPlayFriend(event.currentTarget);
  };

  const handleClickPlayWithTheComputer = (event) => {
    setAnchorElPlayWithTheComputer(event.currentTarget);
  };

  const handleClickLoad = (event) => {
    setAnchorElLoad(event.currentTarget);
  };

  const handleClickSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleDownloadImage = () => DownloadImage();

  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      orientation={`${matches ? `horizontal` : `vertical`}`}
      fullWidth={matches ? false : true}
    >
      <Button
        startIcon={<GroupAddIcon />}
        onClick={handleClickPlayFriend}
      >
        Invite a Friend
      </Button>
      <Menu
        anchorEl={anchorElPlayFriend}
        keepMounted
        open={Boolean(anchorElPlayFriend)}
        onClose={handleClosePlayFriend}
      >
        <MenuItem onClick={() => {
          dispatch({ type: createInviteCodeDialogActionTypes.OPEN });
          dispatch({ type: alertActionTypes.INFO_CLOSE });
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
        onClick={() => wsMssgQuit(state).then(() => wsMssgStartAnalysis(state.server.ws))}
      >
        Analysis Board
      </Button>
      <Button
        startIcon={<ComputerIcon />}
        onClick={handleClickPlayWithTheComputer}
      >
        Play With the Computer
      </Button>
      <Menu
        anchorEl={anchorElPlayWithTheComputer}
        keepMounted
        open={Boolean(anchorElPlayWithTheComputer)}
        onClose={handleClosePlayWithTheComputer}
      >
        <MenuItem
          onClick={() => {
            dispatch({ type: playLikeGrandmasterDialogActionTypes.OPEN });
            handleClosePlayWithTheComputer();
          }}
        >
            Like a Grandmaster
        </MenuItem>
      </Menu>
      <Button
        startIcon={<PublishIcon />}
        onClick={handleClickLoad}
      >
        Load
      </Button>
      <Menu
        anchorEl={anchorElLoad}
        keepMounted
        open={Boolean(anchorElLoad)}
        onClose={handleCloseLoad}
      >
        <MenuItem onClick={() => {
          dispatch({ type: loadFenDialogActionTypes.OPEN });
          handleCloseLoad();
        }}>FEN</MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: loadPgnDialogActionTypes.OPEN });
          handleCloseLoad();
        }}>PGN</MenuItem>
      </Menu>
      <Button
        onClick={handleClickSettings}
        startIcon={<SettingsIcon />}
      >
        Settings
      </Button>
      <Menu
        anchorEl={anchorElSettings}
        keepMounted
        open={Boolean(anchorElSettings)}
        onClose={handleCloseSettings}
      >
        <MenuItem
          key={0}
          onClick={() => {
            dispatch({ type: boardActionTypes.FLIP });
            handleCloseSettings();
          }}
        >
          Flip Board
        </MenuItem>
        <MenuItem
          key={1}
          onClick={() => {
            wsMssgHeuristicpicture(state).then(() => {
              handleCloseSettings();
            });
          }}
        >
          Heuristic Picture
        </MenuItem>
        <MenuItem
          key={2}
          onClick={() => {
            wsMssgFen(state).then(() => {
              dispatch({ type: fenDialogActionTypes.OPEN });
              handleCloseSettings();
            });
          }}
        >
          FEN
        </MenuItem>
        <MenuItem
          key={3}
          onClick={() => {
            // TODO
            dispatch({ type: pgnDialogActionTypes.OPEN });
            handleCloseSettings();
          }}
        >
          PGN Movetext
        </MenuItem>
        <MenuItem
          key={4}
          onClick={() => {
            handleDownloadImage().then(() => {
              handleCloseSettings();
            });
          }}
        >
          Image
        </MenuItem>
      </Menu>
    </ButtonGroup>
  );
}

export default Buttons;
