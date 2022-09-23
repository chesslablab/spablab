import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CachedIcon from '@mui/icons-material/Cached';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button, ButtonGroup } from '@mui/material';
import * as board from '../features/board/boardSlice';
import * as history from '../features/historySlice';

const History = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <ButtonGroup variant="text" aria-label="History" size="medium">
      <Button
        startIcon={<CachedIcon />}
        onClick={() => dispatch(board.flip())}
      />
      <Button
        startIcon={<FastRewindIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch(history.goTo({ back: state.board.history.length - 1 }))}
      />
      <Button
        startIcon={<SkipPreviousIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => {
          dispatch(history.goBack());
          dispatch(board.browseHistory());
        }}
      />
      <Button
        startIcon={<SkipNextIcon />}
        disabled={state.history.back === 0}
        onClick={() => {
          dispatch(history.goForward());
          dispatch(board.browseHistory());
        }}
      />
      <Button
        startIcon={<FastForwardIcon />}
        disabled={state.history.back === 0}
        onClick={() => {
          dispatch(history.goToEnd());
          dispatch(board.browseHistory());
        }}
      />
    </ButtonGroup>
  );
}

export default History;
