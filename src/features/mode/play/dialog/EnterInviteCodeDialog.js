import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material';
import * as playMode from 'features/mode/playModeSlice';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';

const EnterInviteCodeDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [fields, setFields] = React.useState({
    hash: ''
  });

  const handleHashChange = (event: Event) => {
    setFields({
      hash: event.target.value
    });
  };

  const handlePlay = () => {
    dispatch(nav.setPlay());
    dispatch(playMode.reset());
    dispatch(playMode.enterInviteCodeDialog({ open: false }));
    Ws.accept(fields.hash);
  };

  return (
    <Dialog open={state.playMode.dialogs.enterInviteCode.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Enter Invite Code
        <IconButton onClick={() => dispatch(playMode.enterInviteCodeDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          required
          name="hash"
          label="Invite code"
          variant="filled"
          onChange={handleHashChange}
          margin="dense"
        />
        <Button sx={{ mt: 2 }}
          fullWidth
          size="large"
          variant="contained"
          onClick={() => handlePlay()}
        >
          Play
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EnterInviteCodeDialog;
