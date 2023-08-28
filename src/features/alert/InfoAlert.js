import { useDispatch, useSelector } from 'react-redux';
import { Alert, Backdrop, Button } from '@mui/material';
import * as infoAlert from 'features/alert/infoAlertSlice';

const InfoAlert = () => {
  const state = useSelector(state => state);
  
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(infoAlert.close());
  };

  if (state.infoAlert.open) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.infoAlert.open}
      >
        <Alert
          severity="info"
          action={
            state.infoAlert.button
              ? <Button color="inherit" size="small" onClick={handleClose}>
                  OK
                </Button>
              : null
          }
        >
          {state.infoAlert.mssg}
        </Alert>
      </Backdrop>
    );
  }

  return null;
}

export default InfoAlert;
