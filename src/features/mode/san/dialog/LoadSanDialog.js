import { useState } from 'react';
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
import multiAction from 'features/multiAction';
import VariantTextField from 'features/VariantTextField';
import styles from 'styles/dialog';

const LoadSanDialog = () => {
  const state = useSelector(state => state.sanMode);

  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    position: 'start',
    variant: variantConst.CLASSICAL,
    startPos: '',
    fen: '',
  });

  const handlePositionChange = (event) => {
    setFields({
      ...fields,
      position: event.target.value
    });
  };

  const handleFenChange = (event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleLoad = (event) => {
    event.preventDefault();
    multiAction.initGui(dispatch);
    dispatch(nav.setAnalysis());
    dispatch({
      type: 'ws/start',
      payload: {
        variant: event.target.elements.variant.value,
        mode: modeConst.SAN,
        settings: {
          movetext: event.target.elements.san.value,
          ...(fields.variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
          ...(fields.variant === variantConst.CAPABLANCA_FISCHER) && {startPos: event.target.elements.startPos.value},
          ...(fields?.fen && {fen: event.target.elements.fen?.value})
        },
      },
    });
  };

  return (
    <Dialog
      sx={styles.dialog}
      open={state.dialogs.loadSan.open}
      maxWidth="xs"
      fullWidth={true}
    >
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
          <VariantTextField props={fields} />
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
            id="LoadSanDialog-TextField-movetext"
            fullWidth
            required
            multiline
            rows={4}
            name="san"
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
            id="LoadSanDialog-Button-load"
          >
            Load
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadSanDialog;
