import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import * as createInboxCodeDialog from 'features/dialog/createInboxCodeDialogSlice';
import * as variantConst from 'features/variant/variantConst';
import WsAction from 'features/ws/WsAction';

const CreateInboxCodeDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <Dialog open={state.createInboxCodeDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        Play a Friend
        <IconButton onClick={() => dispatch(createInboxCodeDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {state.createInboxCodeDialog.inbox?.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const [fields, setFields] = React.useState({
    variant: variantConst.CLASSICAL,
    fen: '',
    startPos: '',
  });

  const handleVariantChange = (event: Event) => {
    setFields({
      ...fields,
      variant: event.target.value
    });
  };

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleStartPosChange = (event: Event) => {
    setFields({
      ...fields,
      startPos: event.target.value
    });
  };

  const handleCreateCode = (event) => {
    event.preventDefault();
    let settings = {};
    if (fields.fen) {
      settings.fen = fields.fen;
    }
    if (fields.startPos) {
      settings.startPos = fields.startPos;
    }
    WsAction.inboxCreate(fields.variant, JSON.stringify(settings));
  }

  return (
    <DialogContent>
       <Alert severity="info">
        Create a correspondence inbox and share the code with a friend.
      </Alert>
      <form onSubmit={handleCreateCode}>
        <TextField
          select
          required
          fullWidth
          name="variant"
          label="Variant"
          variant="filled"
          defaultValue={variantConst.CLASSICAL}
          margin="normal"
          onChange={handleVariantChange}
          >
          <MenuItem key={0} value="classical">
            Classical
          </MenuItem>
          <MenuItem key={1} value="960">
            Fischer Random 960
          </MenuItem>
          <MenuItem key={2} value="capablanca80">
            Capablanca
          </MenuItem>
        </TextField>
        {
          fields.variant === variantConst.CHESS_960
            ? <TextField
              fullWidth
              required
              name="startPos"
              label="Start position"
              variant="filled"
              helperText="Examples: RNBQKBNR, RBBKRQNN, NRKNBBQR, etc."
              onChange={handleStartPosChange}
            />
            : null
        }
        <TextField
          fullWidth
          name="fen"
          label="From FEN position"
          variant="filled"
          margin="normal"
          onChange={handleFenChange}
        />
        <Button
          fullWidth
          type="submit"
          variant="outlined"
          sx={{ mt: 2 }}
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
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        margin="normal"
        value={state.createInboxCodeDialog.inbox.hash}
      />
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          navigator.clipboard.writeText(state.createInboxCodeDialog.inbox.hash);
          dispatch(createInboxCodeDialog.close());
      }}>
        Copy Inbox Code
      </Button>
    </DialogContent>
  );
}

export default CreateInboxCodeDialog;
