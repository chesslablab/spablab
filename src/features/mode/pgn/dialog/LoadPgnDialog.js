import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import Dispatcher from 'common/Dispatcher';
import * as pgnMode from 'features/mode/pgnModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import WsAction from 'features/ws/WsAction';
import progressDialog from 'features/progressDialogSlice';

const LoadPgnDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [variant, setVariant] = useState(variantConst.CLASSICAL);

  const handleVariantChange = (event: Event) => {
    setVariant(event.target.value);
  };

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch(nav.setAnalysis());
    dispatch(pgnMode.loadPgnDialog({ open: false }));
    dispatch(progressDialog.open());
    Dispatcher.initGui(dispatch);
    let settings = {
      movetext: event.target.elements.pgn.value
    };
    if (variant === variantConst.CHESS_960) {
      settings.startPos = event.target.elements.startPos.value
    }
    WsAction.start(event.target.elements.variant.value, modeConst.PGN, settings);
  };

  return (
    <Dialog open={state.loadPgnDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        PGN Movetext
        <IconButton onClick={() => dispatch(pgnMode.loadPgnDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleLoad}>
          <TextField
            select
            required
            fullWidth
            name="variant"
            label="Variant"
            variant="filled"
            value={variant}
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
            variant === variantConst.CHESS_960
              ? <TextField
                fullWidth
                required
                name="startPos"
                label="Start position"
                variant="filled"
                helperText="Examples: RNBQKBNR, RBBKRQNN, NRKNBBQR, etc."
              />
              : null
          }
          <TextField
            id="LoadPgnDialog-TextField-movetext"
            fullWidth
            required
            multiline
            rows={4}
            name="pgn"
            label="Movetext"
            variant="filled"
            margin="normal"
            inputProps={{
              spellCheck: false
            }}
          />
          <Button
            id="LoadPgnDialog-Button-load"
            fullWidth
            type="submit"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Load
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadPgnDialog;
