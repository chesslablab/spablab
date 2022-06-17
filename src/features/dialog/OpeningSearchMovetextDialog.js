import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Opening from '../../common/Opening.js';
import { showInfoAlert } from '../../features/alert/infoAlertSlice';
import OpeningSearchResultTable from '../../features/table/OpeningSearchResultTable.js';
import { closeOpeningSearchMovetextDialog } from './openingSearchMovetextDialogSlice';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const OpeningSearchMovetextDialog = ({ props }) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    const openings = Opening.byMovetext(event.target.elements.movetext.value);
    setOpenings(openings);
    if (openings.length === 0) {
      dispatch(closeOpeningSearchMovetextDialog());
      dispatch(showInfoAlert({ info: 'No results were found. Please try again.' }));
    }
  }

  return (
    <Dialog open={state.openingSearchMovetextDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>Movetext</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSearch}>
          <TextField fullWidth required name="movetext" label="Movetext" />
          <DialogActions>
            <Button type="submit">Search</Button>
            <Button onClick={() => {
              setOpenings([]);
              dispatch(closeOpeningSearchMovetextDialog());
            }}>
              Cancel
            </Button>
          </DialogActions>
        </form>
        <OpeningSearchResultTable props={{ openings: openings }} />
      </DialogContent>
    </Dialog>
  );
}

export default OpeningSearchMovetextDialog;
