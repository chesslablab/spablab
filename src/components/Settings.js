import React, { useState } from 'react';
import { Button, Divider, Menu, MenuItem } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { startBoard, flipBoard } from '../actions/boardActions';
import { analysis, connect } from '../actions/serverActions';

const Settings = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = () => {
    let items = [];

    if (props.server) {
        items.push(
          <MenuItem
            key={0}
            onClick={() => {
              if (props.server) {
                dispatch(connect(props.server.host, props.server.port)).then((ws) => {
                  dispatch(analysis(ws)).then(() => {
                    dispatch(startBoard({ back: state.board.history.length - 1 }));
                    handleClose();
                  });
                });
              }
            }}
          >
            Connect
          </MenuItem>
      );
    }

    items.push(<Divider key={1} />);

    items.push(
      <MenuItem
        key={2}
        onClick={() => {
          dispatch(flipBoard());
          handleClose();
        }}
      >
        Flip board
      </MenuItem>
    );

    return items;
  }

  return (
    <div>
      <Button
        color="default"
        onClick={handleClick}
        startIcon={<SettingsIcon />}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems()}
      </Menu>
    </div>
  );
}

export default Settings;
