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
    <ButtonGroup color="primary">
      <Button
        color="default"
        size="small"
        startIcon={<FastRewindIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(goToBeginning({ back: state.board.history.length - 1}))}
      />
      <Button
        color="default"
        size="small"
        startIcon={<SkipPreviousIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(goBack())}
      />
      <Button
        color="default"
        size="small"
        startIcon={<SkipNextIcon />}
        disabled={state.history.back === 0}
        onClick={() => dispatch(goForward())}
      />
      <Button
        color="default"
        size="small"
        startIcon={<FastForwardIcon />}
        disabled={state.history.back === 0}
        onClick={() => dispatch(goToEnd())}
      />
    </ButtonGroup>
  );
}

export default History;
