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
import Dispatcher from '../../common/Dispatcher';
import * as mainButtons from '../../features/mainButtonsSlice';
import * as loadPgnDialog from '../../features/dialog/loadPgnDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import * as modeConst from '../../features/mode/modeConst';
import * as variantConst from '../../features/variant/variantConst';
import WsAction from '../../features/ws/WsAction';

const LoadPgnDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [variant, setVariant] = useState(variantConst.CLASSICAL);

  const handleVariantChange = (event: Event) => {
    setVariant(event.target.value);
  };

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch(mainButtons.setAnalysis());
    dispatch(loadPgnDialog.close());
    dispatch(progressDialog.open());
    Dispatcher.initGui(dispatch);
    let add = {
      movetext: event.target.elements.pgn.value
    };
    if (variant === variantConst.CHESS_960) {
      add.startPos = event.target.elements.startPos.value
    }
    WsAction.start(state, event.target.elements.variant.value, modeConst.PGN, add);
  };

  return (
    <Dialog open={state.loadPgnDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        PGN Movetext
        <IconButton onClick={() => dispatch(loadPgnDialog.close())}>
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
