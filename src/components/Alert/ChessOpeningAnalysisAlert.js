import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles({
  chessOpeningAlert: {
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

  if (state.chessOpeningAlert.open) {
    let text = state.chessOpeningAlert.info.split('\n').map((line, i) => {
      return <div className={classes.line} key={i}>{line}</div>
    });
    return (
      <Alert className={classes.chessOpeningAlert} severity="info">
        {text}
      </Alert>
    );
  }

  return null;
}

export default ChessOpeningAnalysisAlert;
