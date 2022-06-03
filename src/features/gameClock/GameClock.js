import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import BlackTimer from './BlackTimer';
import WhiteTimer from './WhiteTimer';

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

  if (state.mode.play.accepted) {
    if (!state.board.isMate &&
      !state.mode.play.draw &&
      !state.mode.play.resign &&
      !state.mode.play.leave &&
      !state.mode.play.timer.over
    ) {
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
