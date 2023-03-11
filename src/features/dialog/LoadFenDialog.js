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
import * as loadFenDialog from '../../features/dialog/loadFenDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import * as modeConst from '../../features/mode/modeConst';
import * as variantConst from '../../features/variant/variantConst';
import WsAction from '../../ws/WsAction';

const LoadFenDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [variant, setVariant] = useState(variantConst.CLASSICAL);

  const handleVariantChange = (event: Event) => {
    setVariant(event.target.value);
  };

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch(mainButtons.setAnalysis());
    dispatch(loadFenDialog.close());
    dispatch(progressDialog.open());
    Dispatcher.initGui(dispatch);
    WsAction.start(state, event.target.elements.variant.value, modeConst.FEN, {
      fen: event.target.elements.fen.value
    });
  };

  return (
    <Dialog open={state.loadFenDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        FEN String
        <IconButton onClick={() => dispatch(loadFenDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleLoad}>
          <TextField
            fullWidth
            required
            name="fen"
            label="FEN string"
            margin="normal"
          />
          <TextField
            select
            fullWidth
            name="variant"
            label="Select a variant"
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
          <Button
            fullWidth
            type="submit"
            variant="outlined"
          >
            Load
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadFenDialog;
