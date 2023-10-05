import { useState } from 'react';
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
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import Captcha from 'features/Captcha';
import VariantTextField from 'features/VariantTextField';

const CreateInboxCodeDialog = () => {
  const state = useSelector(state => state);

  const dispatch = useDispatch();

  return (
    <Dialog open={state.nav.dialogs.createInboxCode.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        Create Inbox
        <IconButton onClick={() => dispatch(nav.createInboxCodeDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {state.nav.dialogs.createInboxCode.inbox?.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    variant: variantConst.CLASSICAL,
    startPos: '',
    fen: '',
  });

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleCreateCode = (event) => {
    event.preventDefault();
    if (fields.code.toLowerCase() !== fields.solution.toLowerCase()) {
      dispatch(nav.createInboxCodeDialog({ open: false }));
      dispatch(infoAlert.show({
        mssg: 'The CAPTCHA is not valid, please try again with a different one.'
      }));
    } else {
      const settings = {
        ...(fields.fen && {fen: fields.fen}),
        ...(fields.startPos && {startPos: fields.startPos})
      };
      Ws.inboxCreate(fields.variant, JSON.stringify(settings));
    }
  }

  return (
    <DialogContent>
      <form onSubmit={handleCreateCode}>
        <VariantTextField props={fields} />
        <TextField
          fullWidth
          name="fen"
          label="From FEN position"
          variant="filled"
          onChange={handleFenChange}
          margin="dense"
        />
        <Captcha props={fields} />
        <Button sx={{ mt: 2 }}
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          Create Inbox
        </Button>
      </form>
    </DialogContent>
  );
}

const CopyCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <DialogContent>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        value={state.nav.dialogs.createInboxCode.inbox.hash}
        margin="dense"
      />
      <Button sx={{ mt: 2 }}
        fullWidth
        size="large"
        variant="contained"
        onClick={() => {
          navigator.clipboard.writeText(state.nav.dialogs.createInboxCode.inbox.hash);
          dispatch(nav.createInboxCodeDialog({ open: false }));
      }}>
        Copy Inbox Code
      </Button>
    </DialogContent>
  );
}

export default CreateInboxCodeDialog;
