import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChartIcon from '@mui/icons-material/BarChart';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, ButtonGroup } from "@mui/material";
import { wsMssgHeuristicpicture } from '../actions/serverActions';
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';

const GameButtons = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <ButtonGroup size="small" variant="text" aria-label="small button group">
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
        Heuristic Pic
      </Button>
    </ButtonGroup>
  );
}

export default GameButtons;
