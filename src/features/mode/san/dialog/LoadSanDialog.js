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
import * as sanMode from 'features/mode/sanModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';

const LoadSanDialog = () => {
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
    let settings = {
      movetext: event.target.elements.san.value,
      ...(fields.variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
      ...(fields?.fen && {fen: event.target.elements.fen?.value})
    };
    Ws.start(
      event.target.elements.variant.value,
      modeConst.SAN,
      { settings: JSON.stringify(settings) }
    );
  };

  return (
    <Dialog open={state.sanMode.dialogs.loadSan.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        SAN Movetext
        <IconButton onClick={() => dispatch(sanMode.loadSanDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Alert
          style={{ marginBottom: 15 }}
          className="info-alert"
          severity="info"
        >
          Variations and comments will be removed. To keep them, load a RAV Movetext instead.
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
            margin="normal"
            onChange={handleVariantChange}
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
            margin="normal"
            onChange={handlePositionChange}
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
                  margin="normal"
                  onChange={handleFenChange}
              />
              : null
          }
          <TextField
            id="LoadSanDialog-TextField-movetext"
            fullWidth
            required
            multiline
            rows={4}
            name="san"
            label="Movetext"
            variant="filled"
            margin="normal"
            inputProps={{
              spellCheck: false
            }}
          />
          <Button
            id="LoadSanDialog-Button-load"
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

export default LoadSanDialog;
