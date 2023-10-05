import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from 'common/Wording.js';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const AcceptTakebackDialog = () => {
  const state = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const handleTakebackAccept = (event) => {
    event.preventDefault();
    Ws.takeback(Wording.verb.ACCEPT.toLowerCase());
    Ws.undo();
    dispatch(playMode.acceptTakebackDialog({ open: false }));
  };

  return (
    <Dialog
      open={state.dialogs.acceptTakeback.open}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>A takeback is being proposed</DialogTitle>
      <DialogContent>
        <form onSubmit={handleTakebackAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => {
              Ws.takeback(Wording.verb.DECLINE.toLowerCase());
              dispatch(playMode.acceptTakebackDialog({ open: false }));
            }}>
              Decline
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptTakebackDialog;
