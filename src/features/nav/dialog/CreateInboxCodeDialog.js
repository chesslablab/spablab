'use client'

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
import Captcha from 'features/Captcha';
import * as progressDialog from 'features/progressDialogSlice';
import VariantTextField from 'features/VariantTextField';
import styles from 'styles/dialog';

const CreateInboxCodeDialog = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  return (
    <Dialog
      sx={styles.dialog}
      open={state.dialogs.createInboxCode.open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>
        Create Inbox
        <IconButton onClick={() => dispatch(nav.createInboxCodeDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {state.dialogs.createInboxCode.inbox?.hash ? <CopyCode /> : <CreateCode />}
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

  const handleFenChange = (event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleCreateCode = async (event) => {
    event.preventDefault();
    if (fields.code.toLowerCase() !== fields.solution.toLowerCase()) {
      dispatch(nav.createInboxCodeDialog({ open: false }));
      dispatch(infoAlert.show({
        msg: 'The CAPTCHA is not valid, please try again with a different one.'
      }));
    } else {
      await fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API_VERSION}/inbox/create`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${process.env.REACT_APP_API_KEY}`
        },
        body: JSON.stringify({
          variant: fields.variant,
          settings: {
            ...(fields.variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
            ...(fields.variant === variantConst.CAPABLANCA_FISCHER) && {startPos: event.target.elements.startPos.value},
            ...(fields?.fen && {fen: event.target.elements.fen?.value})
          }
        })
      })
      .then(res => res.json())
      .then(res => {
        if (res.hash) {
          dispatch(nav.createInboxCodeDialog({
            open: true,
            inbox: {
              hash: res.hash,
            },
          }));
        } else {
          dispatch(nav.createInboxCodeDialog({ open: false }));
          dispatch(infoAlert.show({
            msg: res.message,
          }));
        }
      })
      .catch(error => {

      })
      .finally(() => {
        dispatch(progressDialog.close());
      });
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
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  return (
    <DialogContent>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        value={state.dialogs.createInboxCode.inbox.hash}
        margin="dense"
      />
      <Button sx={{ mt: 2 }}
        fullWidth
        size="large"
        variant="contained"
        onClick={() => {
          navigator.clipboard.writeText(state.dialogs.createInboxCode.inbox.hash);
          dispatch(nav.createInboxCodeDialog({ open: false }));
      }}>
        Copy Inbox Code
      </Button>
    </DialogContent>
  );
}

export default CreateInboxCodeDialog;
