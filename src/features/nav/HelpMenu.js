'use client'

import React from 'react'
import HelpIcon from '@mui/icons-material/Help';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import * as navConst from 'features/nav/navConst';
import * as nav from 'features/nav/navSlice';

const HelpMenu = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  return (
    <Button
      id="Nav-help"
      sx={{ pl: 2, borderRadius: 0, justifyContent: 'flex-start' }}
      variant={state.name === navConst.HELP ? "contained" : "text"}
      startIcon={<HelpIcon />}
      onClick={() => dispatch(nav.helpDialog({ open: true }))}
    >
      Help
    </Button>
  );
}

export default HelpMenu;
