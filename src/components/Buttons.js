import React, { useState } from 'react';
import { Button, ButtonGroup, Menu, MenuItem } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { open as openCreateInvitationDialog } from '../actions/createInvitationDialogActions';
import { open as openEnterCodeDialog } from '../actions/enterCodeDialogActions';
import { startBoard, flipBoard } from '../actions/boardActions';
import { wsMssgStartAnalysis, connect, wsMssgQuit } from '../actions/serverActions';
import modeActionTypes from '../constants/modeActionTypes';

const Settings = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorElPlayFriend, setAnchorElPlayFriend] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);

  const handleClickPlayFriend = (event) => {
    setAnchorElPlayFriend(event.currentTarget);
  };

  const handleClosePlayFriend = () => {
    setAnchorElPlayFriend(null);
  };

  const handleClickSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };

  const buttons = () => {
    let items = [];
    let analysisButton = [];
    let playFriendButton = [];
    let settingsButton = [];

    analysisButton.push(
      <div key={0}>
        <Button
          startIcon={<TuneIcon />}
          style={{textTransform: 'none'}}
          onClick={() => {
            wsMssgQuit(state).then(() => {
              wsMssgStartAnalysis(state.server.ws).then(() => {
                dispatch({ type: modeActionTypes.RESET });
                dispatch(startBoard({ back: state.board.history.length - 1 }));
              });
            });
          }}
        >
          Analysis board
        </Button>
      </div>
    );

    if (props.server) {
      playFriendButton.push(
        <div key={1}>
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
              dispatch(openCreateInvitationDialog());
              handleClosePlayFriend();
            }}>Create invitation</MenuItem>
            <MenuItem onClick={() => {
              dispatch(openEnterCodeDialog());
              handleClosePlayFriend();
            }}>Enter code</MenuItem>
          </Menu>
        </div>
      );
    }

    settingsButton.push(
      <div key={2}>
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
              dispatch(flipBoard());
              handleCloseSettings();
            }}
          >
            Flip board
          </MenuItem>
          {props.server
            ? <MenuItem
                key={1}
                onClick={() => {
                  if (props.server) {
                    dispatch(connect(state, props)).then((ws) => {
                      wsMssgStartAnalysis(ws).then(() => {
                        dispatch(startBoard({ back: state.board.history.length - 1 }));
                        handleCloseSettings();
                      });
                    });
                  }
                }}
              >
                Connect
              </MenuItem>
            : null}
        </Menu>
      </div>
    );

    items.push(analysisButton);
    items.push(playFriendButton);
    items.push(settingsButton);

    return items;
  }

  return (
    <ButtonGroup variant="text">
      {buttons()}
    </ButtonGroup>
  );
}

export default Settings;
