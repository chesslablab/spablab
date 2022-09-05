import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import * as infoAlert from '../../features/alert/infoAlertSlice';
import * as openingsStatsDialog from '../../features/dialog/openingsStatsDialogSlice';

const winRateForWhite = require('../../assets/json/win-rate-for-white.json');
const winRateForBlack = require('../../assets/json/win-rate-for-black.json');
const drawRate = require('../../assets/json/draw-rate.json');

const OpeningsStatsDialog = ({props}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = React.useState([]);

  return (
    <Dialog open={state.openingsStatsDialog.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            Top 50 Openings
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => dispatch(openingsStatsDialog.close())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <ResponsiveContainer width="100%" aspect={4.0/2.0}>
          <BarChart
            width={500}
            height={300}
            data={winRateForWhite}
            margin={{
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
        <Typography
          gutterBottom
          align="center"
        >
          Win Rate for White
        </Typography>
        <ResponsiveContainer width="100%" aspect={4.0/2.0}>
          <BarChart
            width={500}
            height={300}
            data={winRateForBlack}
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
        <Typography
          gutterBottom
          align="center"
        >
          Win Rate for Black
        </Typography>
        <ResponsiveContainer width="100%" aspect={4.0/2.0}>
          <BarChart
            width={500}
            height={300}
            data={drawRate}
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
        <Typography
          gutterBottom
          align="center"
        >
          Draw Rate
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default OpeningsStatsDialog;
