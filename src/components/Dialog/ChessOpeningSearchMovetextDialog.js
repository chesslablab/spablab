import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChessOpeningSearchResultTable from '../Table/ChessOpeningSearchResultTable.js';
import chessOpeningSearchMovetextDialogActionTypes from '../../constants/dialog/chessOpeningSearchMovetextDialogActionTypes';
import { infoAlertDisplay } from '../../features/alert/infoAlertSlice';
import Opening from '../../utils/Opening.js';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const ChessOpeningSearchMovetextDialog = ({ props }) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    const openings = Opening.byMovetext(event.target.elements.movetext.value);
    setOpenings(openings);
    if (openings.length === 0) {
      dispatch({ type: chessOpeningSearchMovetextDialogActionTypes.CLOSE });
      dispatch(infoAlertDisplay({ info: 'No results were found. Please try again.' }));
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
              dispatch({ type: chessOpeningSearchMovetextDialogActionTypes.CLOSE });
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

export default ChessOpeningSearchMovetextDialog;
