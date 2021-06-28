import React, { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { useDispatch, useSelector } from 'react-redux';
import { flipBoard } from '../actions/boardActions';

const SecondaryButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const buttons = () => {
    let items = [];

    items.push(
      <Button
        key={0}
        color="default"
        startIcon={<SwapVertIcon />}
        onClick={() => dispatch(flipBoard())}
        style={{textTransform: 'none'}}
      >
        Flip
      </Button>
    );

    return items;
  }

  return (
    <ButtonGroup
      color="primary"
      style={{justifyContent: 'center'}}
    >
      {buttons()}
    </ButtonGroup>
  );
}

export default SecondaryButtons;
