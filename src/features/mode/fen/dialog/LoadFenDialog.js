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
import * as fenMode from 'features/mode/fenModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';
import VariantTextField from 'features/VariantTextField';

const LoadFenDialog = () => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    variant: variantConst.CLASSICAL,
    startPos: '',
    fen: '',
  });

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
      fen: event.target.elements.fen.value,
      ...(fields.variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
      ...(fields.variant === variantConst.CAPABLANCA_FISCHER) && {startPos: event.target.elements.startPos.value},
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
          <VariantTextField props={fields} />
          <TextField
            id="LoadFenDialog-TextField-fen"
            fullWidth
            required
            name="fen"
            label="From FEN position"
            variant="filled"
            onChange={handleFenChange}
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
