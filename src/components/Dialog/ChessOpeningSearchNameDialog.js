import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChessOpeningSearchAjaxLoader from '../AjaxLoader/ChessOpeningSearchAjaxLoader.js';
import ChessOpeningSearchResult from './ChessOpeningSearchResult.js';
import chessOpeningSearchAjaxLoaderActionTypes from '../../constants/ajaxLoader/chessOpeningSearchAjaxLoaderActionTypes';
import chessOpeningSearchNameDialogActionTypes from '../../constants/dialog/chessOpeningSearchNameDialogActionTypes';

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
    setOpenings([]);
    dispatch({ type: chessOpeningSearchAjaxLoaderActionTypes.SHOW });
    fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/opening`, {
      method: 'POST',
      body: JSON.stringify({ name: event.target.elements.name.value })
    })
    .then(res => res.json())
    .then(res => setOpenings(res))
    .finally(() => dispatch({ type: chessOpeningSearchAjaxLoaderActionTypes.HIDE }));
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
              dispatch({ type: chessOpeningSearchNameDialogActionTypes.CLOSE });
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

export default ChessOpeningSearchNameDialog;
