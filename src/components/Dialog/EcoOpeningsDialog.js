import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import ecoOpeningsDialogActions from '../../constants/ecoOpeningsDialogActionTypes';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const EcoOpeningsDialog = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    // TODO
    console.log('TODO');
  }

  return (
    <Dialog open={state.ecoOpeningsDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>ECO Openings</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSearch}>
          <TextField
            select
            fullWidth
            name="code"
            label="Code"
          >
            <MenuItem key={0} value="A">
              A: Flank Openings
            </MenuItem>
            <MenuItem key={1} value="B">
              B: Semi-Open Games other than the French Defense
            </MenuItem>
            <MenuItem key={2} value="C">
              C: Open Games and the French Defense
            </MenuItem>
            <MenuItem key={3} value="D">
              D: Closed Games and Semi-Closed Games
            </MenuItem>
            <MenuItem key={4} value="E">
              E: Indian Defenses
            </MenuItem>
          </TextField>
          <DialogActions>
            <Button type="submit">Search</Button>
            <Button onClick={() => dispatch({ type: ecoOpeningsDialogActions.CLOSE })}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EcoOpeningsDialog;
