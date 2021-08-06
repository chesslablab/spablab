import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

const Notice = ({props}) => {
  const state = useSelector(state => state);

  if (state.notice) {
    return (
      <Alert severity="info">
        This is an info alert — check it out!
      </Alert>
    );
  }

  return null;
}

export default Notice;
