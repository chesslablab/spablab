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
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as board from 'features/board/boardSlice';
import * as ravMode from 'features/mode/ravModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import multiAction from 'features/multiAction';
import * as progressDialog from 'features/progressDialogSlice';
import VariantTextField from 'features/VariantTextField';
import styles from 'styles/dialog';

const LoadRavDialog = () => {
  const state = useSelector(state => state.ravMode);

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
    dispatch(progressDialog.open());
    fetch(`${process.env.REACT_APP_API_SCHEME}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API_VERSION}/play/rav`, {
      method: 'POST',
      headers: {
        'X-Api-Key': `${process.env.REACT_APP_API_KEY}`
      },
      body: JSON.stringify({
        variant: fields.variant,
        movetext: event.target.elements.rav.value,
        ...(fields.variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
        ...(fields.variant === variantConst.CAPABLANCA_FISCHER) && {startPos: event.target.elements.startPos.value},
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
    <Dialog
      sx={styles.dialog}
      open={state.dialogs.loadRav.open}
      maxWidth="xs"
      fullWidth={true}
    >
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
