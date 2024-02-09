import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import * as actionConst from 'features/mode/actionConst';
import * as playMode from 'features/mode/playModeSlice';

const AcceptDrawDialog = () => {
  const state = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const handleDrawAccept = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ws/draw',
      payload: actionConst.ACCEPT,
    });
    dispatch(playMode.acceptDrawDialog({ open: false }));
  };

  const handleDrawDecline = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ws/draw',
      payload: actionConst.DECLINE,
    });
    dispatch(playMode.acceptDrawDialog({ open: false }));
  };

  return (
    <Dialog open={state.dialogs.acceptDraw.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>A draw is being offered</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDrawAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={handleDrawDecline}>Decline</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptDrawDialog;
