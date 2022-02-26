import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import modeNames from '../constants/modeNames';

const useStyles = makeStyles({
  breadcrumbs: {
    color:"#707070",
    fontWeight: "bold",
    marginBottom: "0.25em !important",
  },
});

const MainBreadcrumbs = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.mode.current === modeNames.ANALYSIS) {
    return (
      <Typography className={classes.breadcrumbs} variant="p" component="div">
        Analysis board
      </Typography>
    );
  } else if (state.mode.current === modeNames.GRANDMASTER) {
    return (
      <Typography className={classes.breadcrumbs} variant="p" component="div">
        Guess the move
      </Typography>
    );
  } else if (state.mode.current === modeNames.LOADFEN) {
    return (
      <Typography className={classes.breadcrumbs} variant="p" component="div">
        FEN board
      </Typography>
    );
  } else if (state.mode.current === modeNames.LOADPGN) {
    return (
      <Typography className={classes.breadcrumbs} variant="p" component="div">
        PGN board
      </Typography>
    );
  } else if (state.mode.current === modeNames.PLAYFRIEND) {
    return (
      <Typography className={classes.breadcrumbs} variant="p" component="div">
        Invited friend
      </Typography>
    );
  }

  return null;
}

export default MainBreadcrumbs;
