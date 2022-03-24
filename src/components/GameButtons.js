import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, ButtonGroup } from "@mui/material";
import { wsMssgHeuristicpicture } from '../actions/serverActions';
import boardActionTypes from '../constants/boardActionTypes';
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';

const GameButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <ButtonGroup size="small" variant="text" aria-label="Game">
      <Button
        startIcon={<CachedIcon />}
        onClick={() => dispatch({ type: boardActionTypes.FLIP })}
      >
        Flip
      </Button>
      <Button
        startIcon={<ContentCopyIcon />}
        onClick={() => state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null}
      >
        Copy
      </Button>
      <Button
        startIcon={<BarChartIcon />}
        onClick={() => {
          dispatch({ type: progressDialogActionTypes.OPEN });
          wsMssgHeuristicpicture(state);
        }}
      >
        Heuristics
      </Button>
    </ButtonGroup>
  );
}

export default GameButtons;
