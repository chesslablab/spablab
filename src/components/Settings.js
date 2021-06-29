import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { flipBoard } from '../actions/boardActions';

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
        <MenuItem
          onClick={() => dispatch(flipBoard())}
        >
          Flip board
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Settings;
