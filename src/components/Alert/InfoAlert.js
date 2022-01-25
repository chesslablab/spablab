import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';

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

const InfoAlert = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.infoAlert.open) {
    let text = state.infoAlert.info.split('\n').map((line, i) => {
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

export default InfoAlert;
