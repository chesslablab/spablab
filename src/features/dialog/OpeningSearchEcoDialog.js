import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { openingSearchEcoDialogClose } from './openingSearchEcoDialogSlice';
import ChessOpeningSearchResultTable from '../../components/Table/ChessOpeningSearchResultTable.js';
import Opening from '../../utils/Opening.js';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const OpeningSearchEcoDialog = ({ props }) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    setOpenings([]);
    setOpenings(Opening.byEco(event.target.value));
  }

  return (
    <Dialog open={state.openingSearchEcoDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>ECO Code</DialogTitle>
      <DialogContent>
        <form className={classes.form}>
          <TextField
            select
            fullWidth
            required
            name="code"
            label="Select an option"
            defaultValue=""
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
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
            <Button onClick={() => {
              setOpenings([]);
              dispatch(openingSearchEcoDialogClose());
            }}>
              Cancel
            </Button>
          </DialogActions>
        </form>
        <ChessOpeningSearchResultTable props={{ openings: openings }} />
      </DialogContent>
    </Dialog>
  );
}

export default OpeningSearchEcoDialog;
