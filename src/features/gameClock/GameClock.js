import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import BlackTimer from './BlackTimer';
import WhiteTimer from './WhiteTimer';
import * as modeConst from '../../common/constants/mode';

const useStyles = makeStyles({
  timers: {
    color:"#707070",
    fontWeight: "bold",
    marginTop: "0.25em !important",
  },
});

const GameClock = () => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.mode.name === modeConst.PLAY) {
    if (state.mode.play.accepted) {
      return (
        <div className={classes.timers}>
          <WhiteTimer /><BlackTimer />
        </div>
      );
    }
  }

  return null;
}

export default GameClock;
