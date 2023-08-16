import React from 'react';
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
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
import BlackPlayerAutocomplete from 'features/autocomplete/BlackPlayerAutocomplete.js';
import EventAutocomplete from 'features/autocomplete/EventAutocomplete.js';
import WhitePlayerAutocomplete from 'features/autocomplete/WhitePlayerAutocomplete.js';
import * as sanMode from 'features/mode/sanModeSlice';
import SearchGamesTable from 'features/mode/san/table/SearchGamesTable.js';
import * as progressDialog from 'features/progressDialogSlice';

const SearchGamesDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = React.useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    dispatch(progressDialog.open());
    await fetch(`https://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/search`, {
      method: 'POST',
      body: JSON.stringify({
        [event.target.elements.Event.name]: event.target.elements.Event.value,
        [event.target.elements.Date.name]: event.target.elements.Date.value,
        [event.target.elements.ECO.name]: event.target.elements.ECO.value,
        [event.target.elements.White.name]: event.target.elements.White.value,
        [event.target.elements.Black.name]: event.target.elements.Black.value,
        [event.target.elements.Result.name]: event.target.elements.Result.value,
        [event.target.elements.movetext.name]: event.target.elements.movetext.value
      })
    })
    .then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          setResult(data);
        });
      } else if (res.status === 204) {
        dispatch(sanMode.searchGamesDialog({ open: false }));
        dispatch(infoAlert.show({ mssg: 'No results were found, please try again.' }));
      }
    })
    .catch(error => {
      dispatch(sanMode.searchGamesDialog({ open: false }));
      dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
    })
    .finally(() => {
      dispatch(progressDialog.close());
    });
  };

  return (
    <Dialog open={state.sanMode.dialogs.searchGames.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        Search Games
        <IconButton onClick={() => dispatch(sanMode.searchGamesDialog({ open: false }))}>
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
              <EventAutocomplete />
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
              <WhitePlayerAutocomplete />
            </Grid>
            <Grid item xs={12} md={4}>
              <BlackPlayerAutocomplete />
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={1}
                name="movetext"
                label="SAN Movetext"
                variant="filled"
                inputProps={{
                  spellCheck: false
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            size="large"
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Search
          </Button>
        </form>
        <SearchGamesTable props={{ result: result }} />
      </DialogContent>
    </Dialog>
  );
};

export default SearchGamesDialog;
