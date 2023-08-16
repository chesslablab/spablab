import React, { useState } from 'react';
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
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as board from 'features/board/boardSlice';
import * as ravMode from 'features/mode/ravModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import multiAction from 'features/multiAction';
import * as progressDialog from 'features/progressDialogSlice';

const LoadRavDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    position: 'start',
    variant: variantConst.CLASSICAL,
    fen: ''
  });

  const handleVariantChange = (event: Event) => {
    setFields({
      ...fields,
      variant: event.target.value
    });
  };

  const handlePositionChange = (event: Event) => {
    setFields({
      ...fields,
      position: event.target.value
    });
  };

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleLoad = (event) => {
    event.preventDefault();
    multiAction.initGui(dispatch);
    dispatch(nav.setAnalysis());
    dispatch(progressDialog.open());
    fetch(`https://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/play/rav`, {
      method: 'POST',
      body: JSON.stringify({
        variant: fields.variant,
        movetext: event.target.elements.rav.value,
        ...(fields.variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
        ...(fields?.fen && {fen: event.target.elements.fen?.value})
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch(board.startPgn(res));
      dispatch(ravMode.set(res));
    })
    .catch(error => {
      dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
    })
    .finally(() => {
      dispatch(progressDialog.close());
    });
  };

  return (
    <Dialog open={state.ravMode.dialogs.loadRav.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        RAV Movetext
        <IconButton onClick={() => dispatch(ravMode.loadRavDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Alert
          style={{ marginBottom: 15 }}
          className="info-alert"
          severity="info"
        >
          Variations and comments will be kept. To remove them, load a SAN Movetext instead.
        </Alert>
        <form onSubmit={handleLoad}>
          <TextField
            select
            required
            fullWidth
            name="variant"
            label="Variant"
            variant="filled"
            value={fields.variant}
            onChange={handleVariantChange}
            margin="dense"
          >
            <MenuItem key={0} value="classical">
              Classical
            </MenuItem>
            <MenuItem key={1} value="960">
              Fischer Random 960
            </MenuItem>
            <MenuItem key={2} value="capablanca">
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
                  margin="dense"
              />
              : null
          }
          <TextField
            select
            required
            fullWidth
            name="position"
            label="From position"
            variant="filled"
            defaultValue="start"
            value={fields.position}
            onChange={handlePositionChange}
            margin="dense"
          >
            <MenuItem key={0} value="start">
              Start
            </MenuItem>
            <MenuItem key={1} value="fen">
              FEN
            </MenuItem>
          </TextField>
          {
            fields.position === 'fen'
              ? <TextField
                  fullWidth
                  required
                  name="fen"
                  label="Enter a FEN position"
                  variant="filled"
                  onChange={handleFenChange}
                  margin="dense"
              />
              : null
          }
          <TextField
            id="LoadRavDialog-TextField-movetext"
            fullWidth
            required
            multiline
            rows={4}
            name="rav"
            label="Movetext"
            variant="filled"
            inputProps={{
              spellCheck: false
            }}
            margin="dense"
          />
          <Button sx={{ mt: 2 }}
            fullWidth
            size="large"
            variant="contained"
            type="submit"
            id="LoadRavDialog-Button-load"
          >
            Load
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadRavDialog;
