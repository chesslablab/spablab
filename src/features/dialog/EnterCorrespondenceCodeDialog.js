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
import * as enterCorrespondenceCodeDialog from 'features/dialog/enterCorrespondenceCodeDialogSlice';

const EnterCorrespondenceCodeDialog = () => {
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

  const handleCheckInbox = () => {
    dispatch(enterCorrespondenceCodeDialog.close());
    // TODO ...
    console.log('To do...');
    console.log(fields);
  };

  return (
    <Dialog open={state.enterCorrespondenceCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Make a Move
        <IconButton onClick={() => dispatch(enterCorrespondenceCodeDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};

export default EnterCorrespondenceCodeDialog;
