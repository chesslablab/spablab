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
import * as infoAlert from '../../features/alert/infoAlertSlice';
import * as databaseDialog from '../../features/dialog/databaseDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';
import DatabaseResultTable from '../../features/table/DatabaseResultTable.js';

const DatabaseDialog = ({props}) => {
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
        dispatch(databaseDialog.close());
        dispatch(infoAlert.show({ info: 'No results were found, please try again.' }));
      } else {
        dispatch(databaseDialog.close());
        dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
      }
    });
  };

  return (
    <Dialog open={state.databaseDialog.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Database
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(databaseDialog.close())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Alert
          className="info-alert"
          severity="info"
          style={{ margin: 15 }}
        >
          Are you feeling lucky? Every time the Search button is clicked, up to 25 random records are shown matching the criteria.
        </Alert>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="Event"
                label="Event"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="Date"
                label="Year"
                type="number"
                margin="normal"
                inputProps={{ min: "1750", max: "2021", step: "1" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="ECO"
                label="ECO Code"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="White"
                label="White"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="Black"
                label="Black"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                name="Result"
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
        <DatabaseResultTable props={{ result: result }} />
      </DialogContent>
    </Dialog>
  );
};

export default DatabaseDialog;
