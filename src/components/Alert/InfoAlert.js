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
});

const InfoAlert = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.alert.open) {
    let text = state.alert.info.split('\n').map((line, i) => {
      return <p key={i}>{line}</p>
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
