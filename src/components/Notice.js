import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

const Notice = ({props}) => {
  const state = useSelector(state => state);

  return (
    <Alert variant="filled" severity="info">
      This is an info alert — check it out!
    </Alert>
  );
}

export default Notice;
