import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import * as infoAlert from '../../features/alert/infoAlertSlice';
import * as playersStatsDialog from '../../features/dialog/playersStatsDialogSlice';
import * as progressDialog from '../../features/dialog/progressDialogSlice';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 25,
});

const PlayersStatsDialog = ({props}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = React.useState([]);

  const handleViewStats = async (event) => {
    event.preventDefault();
    dispatch(progressDialog.open());
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/stats/player`, {
      method: 'POST',
      body: JSON.stringify({
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
        dispatch(playersStatsDialog.close());
        dispatch(infoAlert.show({ info: 'No results were found, please try again.' }));
      } else {
        dispatch(playersStatsDialog.close());
        dispatch(infoAlert.show({ info: 'Whoops! Something went wrong, please try again.' }));
      }
    });
  };

  return (
    <Dialog open={state.playersStatsDialog.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        Players Stats
        <IconButton onClick={() => {
          setResult([]);
          dispatch(playersStatsDialog.close());
        }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleViewStats}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="White"
                options={state.playersStatsDialog.autocomplete.players.map((option) => option.name)}
                filterOptions={filterOptions}
                renderInput={(params) => <TextField {...params} label="White" variant="filled" name="White" />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="Black"
                options={state.playersStatsDialog.autocomplete.players.map((option) => option.name)}
                filterOptions={filterOptions}
                renderInput={(params) => <TextField {...params} label="Black" variant="filled" name="Black" />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                required
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
            View Stats
          </Button>
        </form>
        {
          result.length > 0
            ? <ResponsiveContainer width="100%" aspect={4.0/2.0}>
                <BarChart
                  width={500}
                  height={300}
                  data={result}
                  margin={{
                    top: 30,
                    right: 30,
                    left: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ECO" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#6082b6" />
                </BarChart>
              </ResponsiveContainer>
            : null
        }
      </DialogContent>
    </Dialog>
  );
};

export default PlayersStatsDialog;
