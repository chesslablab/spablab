import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { openingSearchNameDialogClose } from './openingSearchNameDialogSlice';
import ChessOpeningSearchResultTable from '../../components/Table/ChessOpeningSearchResultTable.js';
import { infoAlertDisplay } from '../../features/alert/infoAlertSlice';
import Opening from '../../utils/Opening.js';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const ChessOpeningSearchNameDialog = ({ props }) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    const openings = Opening.byName(event.target.elements.name.value);
    setOpenings(openings);
    if (openings.length === 0) {
      dispatch(openingSearchNameDialogClose());
      dispatch(infoAlertDisplay({ info: 'No results were found. Please try again.' }));
    }
  }

  return (
    <Dialog open={state.openingSearchNameDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Name</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSearch}>
          <TextField fullWidth required name="name" label="Name" />
          <DialogActions>
            <Button type="submit">Search</Button>
            <Button onClick={() => {
              setOpenings([]);
              dispatch(openingSearchNameDialogClose());
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

export default ChessOpeningSearchNameDialog;
