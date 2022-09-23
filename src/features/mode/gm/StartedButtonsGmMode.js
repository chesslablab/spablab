import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import * as modeConst from '../../../features/mode/modeConst';
import WsAction from '../../../ws/WsAction';

const useStyles = makeStyles({
  buttonGroup: {
    marginTop: 15,
  },
});

const StartedButtonsGmMode = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  if (state.mode.name === modeConst.GM) {
    if (state.gameTable.open) {
      return (
        <ButtonGroup
          className={classes.buttonGroup}
          size="small"
          aria-label="Game Buttons"
          orientation="vertical"
          fullWidth={true}
        >
          <Button onClick={() => WsAction.start(state, {
            variant: 'classical',
            mode: modeConst.PGN,
            params: {
              movetext: state.mode.gm.movetext
            }
          })}>
            View Game
          </Button>
        </ButtonGroup>
      );
    }
  }

  return null;
}

export default StartedButtonsGmMode;
