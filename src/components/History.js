import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button, ButtonGroup } from '@mui/material';
import boardActionTypes from '../constants/boardActionTypes';
import historyActionTypes from '../constants/historyActionTypes';

const History = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
      <Button
        startIcon={<FastRewindIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => dispatch({
          type: historyActionTypes.GO_TO_BEGINNING,
          payload: {
            back: state.board.history.length - 1
          }
        })}
      />
      <Button
        startIcon={<SkipPreviousIcon />}
        disabled={state.board.history.length - 1 - Math.abs(state.history.back) === 0}
        onClick={() => {
          dispatch({ type: historyActionTypes.GO_BACK });
          dispatch({ type: boardActionTypes.BROWSE_HISTORY });
        }}
      />
      <Button
        startIcon={<SkipNextIcon />}
        disabled={state.history.back === 0}
        onClick={() => {
          dispatch({ type: historyActionTypes.GO_FORWARD });
          dispatch({ type: boardActionTypes.BROWSE_HISTORY });
        }}
      />
      <Button
        startIcon={<FastForwardIcon />}
        disabled={state.history.back === 0}
        onClick={() => {
          dispatch({ type: historyActionTypes.GO_TO_END });
          dispatch({ type: boardActionTypes.BROWSE_HISTORY });
        }}
      />
    </ButtonGroup>
  );
}

export default History;
