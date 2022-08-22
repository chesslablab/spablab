import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import { setDatabase } from '../../features/mainButtonsSlice';
import { showInfoAlert } from '../../features/alert/infoAlertSlice';
import { closeDatabaseDialog } from '../../features/dialog/databaseDialogSlice';
import { openProgressDialog } from '../../features/dialog/progressDialogSlice';

const DatabaseDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();

    // TODO: Query the API
    // console.log(event.target.elements.event.value);
    // console.log(event.target.elements.year.value);
    // console.log(event.target.elements.white.value);
    // console.log(event.target.elements.black.value);
    // console.log(event.target.elements.eco.value);
    // console.log(event.target.elements.result.value);

    // dispatch(setDatabase());
    dispatch(closeDatabaseDialog());
    dispatch(showInfoAlert({ info: 'Sorry, the database feature will soon be available. Stay tuned!' }));
  };

  return (
    <Dialog open={state.databaseDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Database
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(closeDatabaseDialog())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="event"
                label="Event"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="year"
                label="Year"
                type="number"
                margin="normal"
                defaultValue="2021"
                inputProps={{ min: "1750", max: "2021", step: "1" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="white"
                label="White"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="black"
                label="Black"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="eco"
                label="ECO Code"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                name="result"
                label="Result"
                defaultValue=""
                margin="normal"
              >
                <MenuItem value="" disabled>
                  Select an option
                </MenuItem>
                <MenuItem key={0} value="1-0">
                  1-0
                </MenuItem>
                <MenuItem key={1} value="1/2-1/2">
                  1/2-1/2
                </MenuItem>
                <MenuItem key={2} value="0-1">
                  0-1
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="outlined"
            type="submit"
          >
            Search
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DatabaseDialog;
