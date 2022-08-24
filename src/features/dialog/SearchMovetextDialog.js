import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField
} from '@mui/material';
import { closeSearchMovetextDialog } from './searchMovetextDialogSlice';
import Opening from '../../common/Opening.js';
import * as infoAlert from '../../features/alert/infoAlertSlice';
import OpeningSearchResultTable from '../../features/table/OpeningSearchResultTable.js';

const SearchMovetextDialog = ({ props }) => {
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    const openings = Opening.byMovetext(event.target.elements.movetext.value);
    setOpenings(openings);
    if (openings.length === 0) {
      dispatch(closeSearchMovetextDialog());
      dispatch(infoAlert.show({ info: 'No results were found. Please try again.' }));
    }
  }

  return (
    <Dialog open={state.searchMovetextDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Movetext
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => {
              setOpenings([]);
              dispatch(closeSearchMovetextDialog());
            }}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            required
            name="movetext"
            label="Movetext"
            margin="normal"
          />
          <Button
            fullWidth
            type="submit"
            variant="outlined"
          >
            Search
          </Button>
        </form>
        <OpeningSearchResultTable props={{ openings: openings }} />
      </DialogContent>
    </Dialog>
  );
}

export default SearchMovetextDialog;
