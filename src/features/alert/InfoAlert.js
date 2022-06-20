import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  alert: {
    marginTop: 15,
  },
});

const InfoAlert = () => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.infoAlert.open) {
    return (
      <Alert className={classes.alert} severity="info">
        {state.infoAlert.info}
      </Alert>
    );
  }

  return null;
}

export default InfoAlert;
