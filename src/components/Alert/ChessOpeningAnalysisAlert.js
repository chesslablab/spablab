import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  infoAlert: {
    marginTop: 10,
    maxHeight: 300,
    overflowY: 'scroll',
  },
  line: {
    marginBottom: 10,
  },
});

const ChessOpeningAnalysisAlert = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.chessOpeningAnalysisAlert.open) {
    let text = state.chessOpeningAnalysisAlert.info.split('\n').map((line, i) => {
      return <div className={classes.line} key={i}>{line}</div>
    });
    return (
      <Alert className={classes.infoAlert} severity="info">
        {text}
      </Alert>
    );
  }

  return null;
}

export default ChessOpeningAnalysisAlert;
