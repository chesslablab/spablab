import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Stack } from "@mui/material";
import { wsMssgHeuristicpicture } from '../actions/serverActions';
import boardActionTypes from '../constants/boardActionTypes';
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';

const GameButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        color="primary"
        size="large"
        title="Flip"
        aria-label="flip"
        onClick={() => dispatch({ type: boardActionTypes.FLIP })}
      >
        <CachedIcon />
      </IconButton>
      <IconButton
        color="primary"
        size="large"
        title="Copy"
        aria-label="copy"
        onClick={() => state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null}
      >
        <ContentCopyIcon />
      </IconButton>
      <IconButton
        color="primary"
        size="large"
        title="Heuristics"
        aria-label="heuristics"
        onClick={() => {
          dispatch({ type: progressDialogActionTypes.OPEN });
          wsMssgHeuristicpicture(state);
        }}
      >
        <BarChartIcon />
      </IconButton>
    </Stack>
  );
}

export default GameButtons;
