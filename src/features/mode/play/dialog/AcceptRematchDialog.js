import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import * as actionConst from 'features/mode/actionConst';
import * as playMode from 'features/mode/playModeSlice';

const AcceptRematchDialog = () => {
  const state = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const handleRematchAccept = (event) => {
    event.preventDefault();
    dispatch({
      type: 'socket/rematch',
      payload: actionConst.ACCEPT,
    });
    dispatch(playMode.acceptRematchDialog({ open: false }));
    dispatch({ type: 'socket/restart' });
  };

  const handleRematchDecline = (event) => {
    event.preventDefault();
    dispatch({
      type: 'socket/rematch',
      payload: actionConst.DECLINE,
    });
    dispatch(playMode.acceptRematchDialog({ open: false }));
  };

  return (
    <Dialog open={state.dialogs.acceptRematch.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>A rematch is being offered</DialogTitle>
      <DialogContent>
        <form onSubmit={handleRematchAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={handleRematchDecline}>Decline</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptRematchDialog;
