import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import PublishIcon from '@material-ui/icons/Publish';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { useDispatch, useSelector } from 'react-redux';
import boardActionTypes from '../constants/boardActionTypes';
import loadFenDialogActionTypes from '../constants/loadFenDialogActionTypes';
import createInviteCodeDialogActionTypes from '../constants/createInviteCodeDialogActionTypes';
import enterInviteCodeDialogActionTypes from '../constants/enterInviteCodeDialogActionTypes';
import alertActionTypes from '../constants/alertActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import { startBoard } from '../actions/boardActions';
import { wsConnect, wsMssgHeuristicpicture, wsMssgStartAnalysis, wsMssgStartLoadfen, wsMssgQuit } from '../actions/serverActions';

const Buttons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElLoadfen, setAnchorElLoadfen] = React.useState(null);
  const [anchorElPlayFriend, setAnchorElPlayFriend] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);

  const handleCloseLoadfen = () => {
    setAnchorElLoadfen(null);
  };

  const handleClosePlayFriend = () => {
    setAnchorElPlayFriend(null);
  };

  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };

  const handleClickPlayFriend = (event) => {
    setAnchorElPlayFriend(event.currentTarget);
  };

  const handleClickSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  return (
    <div>
      <Button
        startIcon={<TuneIcon />}
        style={{textTransform: 'none'}}
        onClick={() => wsMssgQuit(state).then(() => {
          wsMssgStartAnalysis(state.server.ws).then(() => {
            dispatch({ type: alertActionTypes.INFO_CLOSE });
            dispatch({ type: modeActionTypes.RESET });
            dispatch(startBoard({ back: state.board.history.length - 1 }));
          });
        })}
      >
        Analysis board
      </Button>
      <Button
        startIcon={<PublishIcon />}
        style={{textTransform: 'none'}}
        onClick={() => {
          dispatch({ type: loadFenDialogActionTypes.OPEN });
          handleCloseLoadfen();
        }}
      >
        Load FEN
      </Button>
      <Button
        startIcon={<GroupAddIcon />}
        onClick={handleClickPlayFriend}
        style={{textTransform: 'none'}}
      >
        Invite a friend
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
          dispatch({ type: modeActionTypes.RESET });
          handleClosePlayFriend();
        }}>Create invite code</MenuItem>
        <MenuItem onClick={() => {
          dispatch({ type: enterInviteCodeDialogActionTypes.OPEN });
          handleClosePlayFriend();
        }}>Enter invite code</MenuItem>
      </Menu>
      <Button
        onClick={handleClickSettings}
        startIcon={<SettingsIcon />}
      />
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
          Flip board
        </MenuItem>
        <MenuItem
          key={1}
          onClick={() => {
            wsMssgHeuristicpicture(state).then(() => {
              handleCloseSettings();
            });
          }}
        >
          Heuristic picture
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Buttons;
