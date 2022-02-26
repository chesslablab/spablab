import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import ChessOpeningSearchAjaxLoader from "../AjaxLoader/ChessOpeningSearchAjaxLoader.js";
import ChessOpeningSearchResult from "./ChessOpeningSearchResult.js";
import chessOpeningSearchAjaxLoaderActionTypes from '../../constants/ajaxLoader/chessOpeningSearchAjaxLoaderActionTypes';
import chessOpeningSearchEcoDialogActionTypes from '../../constants/dialog/chessOpeningSearchEcoDialogActionTypes';

const useStyles = makeStyles({
  form: {
    marginTop: 10,
  },
});

const ChessOpeningSearchEcoDialog = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    setOpenings([]);
    dispatch({ type: chessOpeningSearchAjaxLoaderActionTypes.SHOW });
    fetch('https://pchess.net/api/opening', {
      method: 'POST',
      body: JSON.stringify({ eco: event.target.value })
    })
    .then(res => res.json())
    .then(res => setOpenings(res))
    .finally(() => dispatch({ type: chessOpeningSearchAjaxLoaderActionTypes.HIDE }));
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
              dispatch({ type: chessOpeningSearchEcoDialogActionTypes.CLOSE });
            }}>
              Cancel
            </Button>
          </DialogActions>
        </form>
        <ChessOpeningSearchAjaxLoader />
        <ChessOpeningSearchResult props={{ openings: openings }} />
      </DialogContent>
    </Dialog>
  );
}

export default ChessOpeningSearchEcoDialog;
