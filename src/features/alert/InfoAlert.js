import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const InfoAlert = () => {
  const state = useSelector(state => state);

  if (state.infoAlert.open) {
    return (
      <Alert sx={{ mt: 1.5 }} severity="info">
        {state.infoAlert.info}
      </Alert>
    );
  }

  return null;
}

export default InfoAlert;
