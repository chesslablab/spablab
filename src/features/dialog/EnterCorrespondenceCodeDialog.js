import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  TextField
} from '@mui/material';
import * as enterCorrespondenceCodeDialog from 'features/dialog/enterCorrespondenceCodeDialogSlice';
import WsAction from 'features/ws/WsAction';

const EnterCorrespondenceCodeDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.enterCorrespondenceCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Make a Move
        <IconButton onClick={() => dispatch(enterCorrespondenceCodeDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <CheckInbox />
        <Game />
      </DialogContent>
    </Dialog>
  );
};

const CheckInbox = () => {
  const state = useSelector(state => state);
  const [fields, setFields] = React.useState({
    hash: '',
    pgn: ''
  });

  const handleHashChange = (event: Event) => {
    setFields({
      ...fields,
      hash: event.target.value
    });
  };

  const handleCheckInbox = () => {
    WsAction.correspondence(fields.hash, fields.pgn);
  };

  if (!state.enterCorrespondenceCodeDialog.game) {
    return (
      <FormGroup>
        <TextField
          fullWidth
          required
          name="hash"
          label="Correspondence code"
          variant="filled"
          margin="normal"
          onChange={handleHashChange}
        />
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleCheckInbox()}
          sx={{ mt: 2 }}
        >
          Check Inbox
        </Button>
      </FormGroup>
    );
  }

  return null;
}

const Game = () => {
  const state = useSelector(state => state);

  const handleSendMove = () => {
    console.log('To Do...');
  };

  if (state.enterCorrespondenceCodeDialog.game) {
    return (
      <FormGroup>
        <TextField
          id="EnterCorrespondenceCodeDialog-TextField-movetext"
          fullWidth
          multiline
          rows={4}
          name="pgn"
          label="Movetext"
          variant="filled"
          margin="normal"
          inputProps={{
            spellCheck: false,
            readOnly: true
          }}
        />
        <TextField
          id="EnterCorrespondenceCodeDialog-TextField-pgn"
          required
          fullWidth
          name="pgn"
          label="Your move"
          variant="filled"
          margin="normal"
        />
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleSendMove()}
          sx={{ mt: 2 }}
        >
          Send Move
        </Button>
      </FormGroup>
    );
  }

  return null;
}

export default EnterCorrespondenceCodeDialog;
