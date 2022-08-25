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
import * as loadPgnDialog from '../../features/dialog/loadPgnDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import WsAction from '../../ws/WsAction';

const LoadPgnDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLoad = (event) => {
    event.preventDefault();
    dispatch(mainButtons.setAnalysis());
    dispatch(loadPgnDialog.close());
    dispatch(progressDialog.open());
    Dispatcher.initGui(dispatch);
    WsAction.startPgn(state, event.target.elements.pgn.value);
  };

  return (
    <Dialog open={state.loadPgnDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Load PGN
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(loadPgnDialog.close())}>
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
            multiline
            rows={4}
            name="pgn"
            label="Movetext"
            margin="normal"
            inputProps={{
              spellCheck: false
            }}
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

export default LoadPgnDialog;
