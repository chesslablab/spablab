import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

const InfoAlert = ({props}) => {
  const state = useSelector(state => state);

  if (state.InfoAlert) {
    return (
      <Alert severity="info">
        This is an info alert — check it out!
      </Alert>
    );
  }

  return null;
}

export default InfoAlert;
