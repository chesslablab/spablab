'use client'

import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton
} from '@mui/material';
import * as nav from 'features/nav/navSlice';
import styles from 'styles/dialog';

const SettingsDialog = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  const handleAnimationChange = (event) => {
    dispatch(nav.settingsDialogSet({
      pieceAnimation: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  const handleEvalChange = (event) => {
    dispatch(nav.settingsDialogSet({
      eval: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  const handleHeuristicsChange = (event) => {
    dispatch(nav.settingsDialogSet({
      heuristics: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  const handleExplanationChange = (event) => {
    dispatch(nav.settingsDialogSet({
      explanation: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  const handleDarkThemeChange = (event) => {
    dispatch(nav.settingsDialogSet({
      darkTheme: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  return (
    <Dialog
      sx={styles.dialog}
      open={state.dialogs.settings.open}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>
        Settings
        <IconButton onClick={() => dispatch(nav.settingsDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            label="Animate the chess pieces while playing"
            control={<Checkbox
              name="pieceAnimation"
              checked={state.dialogs.settings.fields.pieceAnimation === 'on'}
              value={state.dialogs.settings.fields.pieceAnimation}
              onChange={handleAnimationChange}
            />}
          />
          <FormControlLabel
            label="Display computer evaluation while playing"
            control={<Checkbox
              name="eval"
              checked={state.dialogs.settings.fields.eval === 'on'}
              value={state.dialogs.settings.fields.eval}
              onChange={handleEvalChange}
            />}
          />
          <FormControlLabel
            label="Explain the chess position while playing"
            control={<Checkbox
              name="explanation"
              checked={state.dialogs.settings.fields.explanation === 'on'}
              value={state.dialogs.settings.fields.explanation}
              onChange={handleExplanationChange}
            />}
          />
          <FormControlLabel
            label="Display chess heuristics while playing"
            control={<Checkbox
              name="heuristics"
              checked={state.dialogs.settings.fields.heuristics === 'on'}
              value={state.dialogs.settings.fields.heuristics}
              onChange={handleHeuristicsChange}
            />}
          />
          <FormControlLabel
            label="Dark theme"
            control={<Checkbox
              name="darkTheme"
              checked={state.dialogs.settings.fields.darkTheme === 'on'}
              value={state.dialogs.settings.fields.darkTheme}
              onChange={handleDarkThemeChange}
            />}
          />
        </FormGroup>
        <Button sx={{ mt: 2 }}
          fullWidth
          size="large"
          variant="contained"
          onClick={() => dispatch(nav.settingsDialog({ open: false }))}
        >
          Accept
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
