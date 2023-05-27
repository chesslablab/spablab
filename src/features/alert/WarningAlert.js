import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Backdrop, Button } from '@mui/material';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';

const WarningAlert = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleClose = () => {
    multiAction.initGui(dispatch);
    Ws.start(variantConst.CLASSICAL, modeConst.FEN);
  };

  if (state.warningAlert.open) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.warningAlert.open}
      >
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={handleClose}>
              OK
            </Button>
          }
        >
          {state.warningAlert.mssg}
        </Alert>
      </Backdrop>
    );
  }

  return null;
}

export default WarningAlert;
