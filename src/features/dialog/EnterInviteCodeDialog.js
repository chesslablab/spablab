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
import * as mainButtons from '../../features/mainButtonsSlice';
import * as enterInviteCodeDialog from '../../features/dialog/enterInviteCodeDialogSlice';
import * as mode from '../../features/mode/modeSlice';
import WsAction from '../../features/ws/WsAction';

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
    dispatch(mainButtons.setPlayAFriend());
    dispatch(mode.startAnalysis());
    dispatch(enterInviteCodeDialog.close());
    WsAction.accept(state, fields.hash);
  };

  return (
    <Dialog open={state.enterInviteCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Enter Invite Code
        <IconButton onClick={() => dispatch(enterInviteCodeDialog.close())}>
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
          margin="normal"
          onChange={handleHashChange}
        />
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handlePlay()}
          sx={{ mt: 2 }}
        >
          Play friend
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EnterInviteCodeDialog;
