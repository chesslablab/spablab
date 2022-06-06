import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button, ButtonGroup } from '@mui/material';
import { boardBrowseHistory } from '../features/boardSlice';
import {
  historyGoTo,
  historyGoBack,
  historyGoForward,
  historyGoToEnd
} from '../features/historySlice';

const History = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <ButtonGroup variant="text" aria-label="History" size="small">
      <Button
        startIcon={<FastRewindIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(historyGoTo({ back: state.board.history.length - 1 }))}
      />
      <Button
        startIcon={<SkipPreviousIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => {
          dispatch(historyGoBack());
          dispatch(boardBrowseHistory());
        }}
      />
      <Button
        startIcon={<SkipNextIcon />}
        disabled={state.history.back === 0}
        onClick={() => {
          dispatch(historyGoForward());
          dispatch(boardBrowseHistory());
        }}
      />
      <Button
        startIcon={<FastForwardIcon />}
        disabled={state.history.back === 0}
        onClick={() => {
          dispatch(historyGoToEnd());
          dispatch(boardBrowseHistory());
        }}
      />
    </ButtonGroup>
  );
}

export default History;
