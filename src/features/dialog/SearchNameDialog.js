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
import { closeSearchNameDialog } from './searchNameDialogSlice';
import Opening from '../../common/Opening.js';
import { showInfoAlert } from '../../features/alert/infoAlertSlice';
import OpeningSearchResultTable from '../../features/table/OpeningSearchResultTable.js';

const SearchNameDialog = ({ props }) => {
  const state = useSelector(state => state);
  const [openings, setOpenings] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    const openings = Opening.byName(event.target.elements.name.value);
    setOpenings(openings);
    if (openings.length === 0) {
      dispatch(closeSearchNameDialog());
      dispatch(showInfoAlert({ info: 'No results were found. Please try again.' }));
    }
  }

  return (
    <Dialog open={state.searchNameDialog.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Name
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => {
              setOpenings([]);
              dispatch(closeSearchNameDialog());
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
            name="name"
            label="Name"
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

export default SearchNameDialog;
