import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
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

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch(mainButtons.setAnalysis());
    dispatch(loadFenDialog.close());
    dispatch(progressDialog.open());
    Dispatcher.initGui(dispatch);
    WsAction.start(state, variantConst.CLASSICAL, modeConst.FEN, {
      fen: event.target.elements.fen.value
    });
  };

  return (
    <Dialog open={state.loadFenDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            FEN String
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(loadFenDialog.close())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
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
