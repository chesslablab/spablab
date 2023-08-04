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
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
import EventAutocomplete from 'features/autocomplete/EventAutocomplete.js';
import * as nav from 'features/nav/navSlice';
import * as progressDialog from 'features/progressDialogSlice';

const EventsStatsDialog = ({props}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = React.useState([]);

  const handleViewStats = async (event) => {
    event.preventDefault();
    dispatch(progressDialog.open());
    await fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/stats/event`, {
      method: 'POST',
      body: JSON.stringify({
        [event.target.elements.Event.name]: event.target.elements.Event.value,
        [event.target.elements.Result.name]: event.target.elements.Result.value
      })
    }).then(res => {
      dispatch(progressDialog.close());
      if (res.status === 200) {
        res.json().then(data => {
          setResult(data);
        });
      } else if (res.status === 204) {
        dispatch(nav.eventsStatsDialog({ open: false }));
        dispatch(infoAlert.show({ mssg: 'No results were found, please try again.' }));
      } else {
        dispatch(nav.eventsStatsDialog({ open: false }));
        dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
      }
    });
  };

  return (
    <Dialog open={state.nav.dialogs.eventsStats.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        Events Stats
        <IconButton onClick={() => {
          setResult([]);
          dispatch(nav.eventsStatsDialog({ open: false }));
        }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleViewStats}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <EventAutocomplete />
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

export default EventsStatsDialog;
