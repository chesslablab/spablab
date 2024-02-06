'use client'

import { useDispatch, useSelector } from 'react-redux';
import { Alert, Backdrop, Button } from '@mui/material';
import * as infoAlert from 'features/alert/infoAlertSlice';

const InfoAlert = () => {
  const state = useSelector(state => state.infoAlert);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(infoAlert.close());
  };

  if (state.open) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          alignItems: 'flex-start',
          pt: 4,
        }}
        open={state.open}
      >
        <Alert
          severity="info"
          action={
            state.button
              ? <Button color="inherit" size="small" onClick={handleClose}>
                  OK
                </Button>
              : null
          }
        >
          {state.mssg}
        </Alert>
      </Backdrop>
    );
  }

  return null;
}

export default InfoAlert;
