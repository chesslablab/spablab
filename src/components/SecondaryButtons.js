import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { IconButton, Stack } from "@mui/material";
import { wsMssgHeuristicpicture } from '../actions/serverActions';
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';
import boardActionTypes from '../constants/boardActionTypes';

const SecondaryButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        color="primary"
        size="large"
        title="Copy PGN"
        aria-label="copy"
        onClick={() => state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null}
      >
        <ContentCopyIcon />
      </IconButton>
      <IconButton
        color="primary"
        size="large"
        title="Copy FEN"
        aria-label="fen"
        onClick={() => state.board.fen ? navigator.clipboard.writeText(state.board.fen) : null}
      >
        <WidgetsIcon />
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
      <IconButton
        color="primary"
        size="large"
        title="Flip Board"
        aria-label="flip"
        onClick={() => dispatch({ type: boardActionTypes.FLIP })}
      >
        <CachedIcon />
      </IconButton>
    </Stack>
  );
}

export default SecondaryButtons;
