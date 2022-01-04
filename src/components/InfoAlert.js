import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles({
  infoAlert: {
    marginTop: 10,
  },
});

const InfoAlert = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.alert.open) {
    return (
      <Alert className={classes.infoAlert} severity="info">
        {state.alert.info}
      </Alert>
    );
  }

  return null;
}

export default InfoAlert;
