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
import * as fenMode from 'features/mode/fenModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';

const LoadFenDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    variant: variantConst.CLASSICAL
  });

  const handleVariantChange = (event: Event) => {
    setFields({
      ...fields,
      variant: event.target.value
    });
  };

  const handleLoad = (event) => {
    event.preventDefault();
    multiAction.initGui(dispatch);
    dispatch(nav.setAnalysis());
    let settings = {
      fen: event.target.elements.fen.value,
      ...(fields.variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
    };
    Ws.start(
      event.target.elements.variant.value,
      modeConst.FEN,
      { settings: JSON.stringify(settings) }
    );
  };

  return (
    <Dialog open={state.fenMode.dialogs.loadFen.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        FEN String
        <IconButton onClick={() => dispatch(fenMode.loadFenDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleLoad}>
          <TextField
            id="LoadFenDialog-TextField-variant"
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
            <MenuItem
              id="LoadFenDialog-TextField-variant-MenuItem-classical"
              key={0}
              value="classical"
            >
              Classical
            </MenuItem>
            <MenuItem
              id="LoadFenDialog-TextField-variant-MenuItem-960"
              key={1}
              value="960"
            >
              Fischer Random 960
            </MenuItem>
            <MenuItem
              id="LoadFenDialog-TextField-variant-MenuItem-capablanca"
              key={2}
              value="capablanca"
            >
              Capablanca
            </MenuItem>
          </TextField>
          {
            fields.variant === variantConst.CHESS_960
              ? <TextField
                  id="LoadFenDialog-TextField-startPos"
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
            id="LoadFenDialog-TextField-fen"
            fullWidth
            required
            name="fen"
            label="From FEN position"
            variant="filled"
            margin="dense"
          />
          <Button sx={{ mt: 2 }}
            fullWidth
            size="large"
            variant="contained"
            type="submit"
            id="LoadFenDialog-Button-load"
          >
            Load
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadFenDialog;
