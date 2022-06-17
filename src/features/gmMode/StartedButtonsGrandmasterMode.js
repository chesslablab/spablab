import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import { MODE_GM } from '../modeConstants';
import WsAction from '../../ws/WsAction';

const useStyles = makeStyles({
  buttonGroup: {
    marginTop: 15,
  },
});

const StartedButtonsGrandmasterMode = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.mode.name === MODE_GM) {
    if (state.board.movetext && !state.mode.grandmaster.movetext) {
      return (
        <ButtonGroup
          className={classes.buttonGroup}
          size="small"
          aria-label="Game Buttons"
          orientation="vertical"
          fullWidth={true}
        >
          <Button onClick={() => {
            WsAction.undo(state);
          }}>
            Undo move
          </Button>
        </ButtonGroup>
      );
    }
  }

  return null;
}

export default StartedButtonsGrandmasterMode;
