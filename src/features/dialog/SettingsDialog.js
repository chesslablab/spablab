import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch
} from '@mui/material';
import * as settingsDialog from '../../features/dialog/settingsDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';

const SettingsDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleHeuristicsChange = (event: Event) => {
    dispatch(settingsDialog.accept({
      heuristics: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  const handleAccept = (event) => {
    event.preventDefault();
    // TODO ...
  };

  return (
    <Dialog open={state.settingsDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Settings
        <IconButton onClick={() => dispatch(settingsDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleAccept}>
          <FormGroup>
            <FormControlLabel
              label="Show heuristics"
              control={<Switch
                name="heuristics"
                value={state.settingsDialog.fields.heuristics}
                onChange={handleHeuristicsChange}
              />}
            />
          </FormGroup>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
          >
            Accept
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
