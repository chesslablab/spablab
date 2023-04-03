import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';
import * as infoAlert from '../../features/alert/infoAlertSlice';
import * as openingsStatsDialog from '../../features/dialog/openingsStatsDialogSlice';

const OpeningsStatsDialog = ({props}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [result, setResult] = React.useState([]);

  return (
    <Dialog open={state.openingsStatsDialog.open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        Top 50 Openings
        <IconButton onClick={() => dispatch(openingsStatsDialog.close())}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ResponsiveContainer width="100%" aspect={4.0/2.0}>
          <BarChart
            width={500}
            height={300}
            data={state.openingsStatsDialog.stats.winRateForWhite}
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
            data={state.openingsStatsDialog.stats.winRateForBlack}
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
            data={state.openingsStatsDialog.stats.drawRate}
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
