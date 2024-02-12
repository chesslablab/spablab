'use client'

import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import * as actionConst from 'features/mode/actionConst';
import * as playMode from 'features/mode/playModeSlice';

const AcceptTakebackDialog = () => {
  const state = useSelector(state => state.playMode);

  const dispatch = useDispatch();

  const handleTakebackAccept = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ws/takeback',
      payload: actionConst.ACCEPT,
    });
    dispatch({ type: 'ws/undo' })
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
              dispatch({
                type: 'ws/takeback',
                payload: actionConst.DECLINE,
              });
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
