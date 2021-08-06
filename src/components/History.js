import React, { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FastForwardIcon from '@material-ui/icons/FastForward';
import { useDispatch, useSelector } from 'react-redux';
import { goToBeginning, goBack, goForward, goToEnd } from '../actions/historyActions';

const History = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <ButtonGroup
      className="history"
      color="primary"
    >
      <Button
        color="default"
        startIcon={<FastRewindIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(goToBeginning({ back: state.board.history.length - 1}))}
      / >
      <Button
        color="default"
        startIcon={<SkipPreviousIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(goBack())}>
      </Button>
      <Button
        color="default"
        startIcon={<SkipNextIcon />}
        disabled={state.history.back === 0}
        onClick={() => dispatch(goForward())}>
      </Button>
      <Button
        color="default"
        startIcon={<FastForwardIcon />}
        disabled={state.history.back === 0}
        onClick={() => dispatch(goToEnd())}>
      </Button>
    </ButtonGroup>
  );
}

export default History;
