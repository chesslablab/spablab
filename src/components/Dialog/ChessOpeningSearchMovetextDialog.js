import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ChessOpeningSearchAjaxLoader from "../AjaxLoader/ChessOpeningSearchAjaxLoader.js";
import ChessOpeningSearchResult from "./ChessOpeningSearchResult.js";
import chessOpeningSearchAjaxLoaderActionTypes from '../../constants/ajaxLoader/chessOpeningSearchAjaxLoaderActionTypes';
import chessOpeningSearchMovetextDialogActionTypes from '../../constants/dialog/chessOpeningSearchMovetextDialogActionTypes';

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
    setOpenings([]);
    dispatch({ type: chessOpeningSearchAjaxLoaderActionTypes.SHOW });
    fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/opening`, {
      method: 'POST',
      body: JSON.stringify({ movetext: event.target.elements.movetext.value })
    })
    .then(res => res.json())
    .then(res => setOpenings(res))
    .finally(() => dispatch({ type: chessOpeningSearchAjaxLoaderActionTypes.HIDE }));
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
        <ChessOpeningSearchAjaxLoader />
        <ChessOpeningSearchResult props={{ openings: openings }} />
      </DialogContent>
    </Dialog>
  );
}

export default ChessOpeningSearchMovetextDialog;
