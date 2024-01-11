import { useDispatch, useSelector } from 'react-redux';
import { Alert, Backdrop, Button } from '@mui/material';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';

const WarningAlert = () => {
  const state = useSelector(state => state.warningAlert);

  const dispatch = useDispatch();

  const handleClose = () => {
    multiAction.initGui(dispatch);
    Ws.start(variantConst.CLASSICAL, modeConst.FEN);
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
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={handleClose}>
              OK
            </Button>
          }
        >
          {state.mssg}
        </Alert>
      </Backdrop>
    );
  }

  return null;
}

export default WarningAlert;
