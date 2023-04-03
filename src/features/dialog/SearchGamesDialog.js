import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import * as infoAlert from '../../features/alert/infoAlertSlice';
import * as searchGamesDialog from '../../features/dialog/searchGamesDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import DatabaseResultTable from '../../features/table/DatabaseResultTable.js';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

const SearchGamesDialog = ({props}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = React.useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    dispatch(progressDialog.open());
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/search`, {
      method: 'POST',
      body: JSON.stringify({
        [event.target.elements.Event.name]: event.target.elements.Event.value,
        [event.target.elements.Date.name]: event.target.elements.Date.value,
        [event.target.elements.ECO.name]: event.target.elements.ECO.value,
        [event.target.elements.White.name]: event.target.elements.White.value,
        [event.target.elements.Black.name]: event.target.elements.Black.value,
        [event.target.elements.Result.name]: event.target.elements.Result.value
      })
    }).then(res => {
      dispatch(progressDialog.close());
      if (res.status === 200) {
        res.json().then(data => {
          setResult(data);
        });
      } else if (res.status === 204) {
        dispatch(searchGamesDialog.close());
        dispatch(infoAlert.show({ info: 'No results were found, please try again.' }));
      } else {
        dispatch(searchGamesDialog.close());
        dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
      }
    });
  };

  return (
    <Dialog open={state.searchGamesDialog.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        Search Games
        <IconButton onClick={() => dispatch(searchGamesDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Alert
          style={{ marginBottom: 15 }}
          className="info-alert"
          severity="info"
        >
          Click on the <b>Search</b> button, and find up to 25 random games matching the criteria on a database of thousands of games.
        </Alert>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Autocomplete
                  id="Event"
                  options={state.searchGamesDialog.autocomplete.events.map((option) => option.Event)}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="Event" variant="filled" name="Event" />}
                />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="Date"
                label="Year"
                variant="filled"
                type="number"
                inputProps={{ min: "1750", max: "2023", step: "1"}}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="ECO"
                label="ECO Code"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="White"
                options={state.searchGamesDialog.autocomplete.players.map((option) => option.name)}
                filterOptions={filterOptions}
                renderInput={(params) => <TextField {...params} label="White" variant="filled" name="White" />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="Black"
                options={state.searchGamesDialog.autocomplete.players.map((option) => option.name)}
                filterOptions={filterOptions}
                renderInput={(params) => <TextField {...params} label="Black" variant="filled" name="Black" />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                name="Result"
                label="Result"
                variant="filled"
                defaultValue=""
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
            sx={{ mt: 2 }}
          >
            Search
          </Button>
        </form>
        <DatabaseResultTable props={{ result: result }} />
      </DialogContent>
    </Dialog>
  );
};

export default SearchGamesDialog;
