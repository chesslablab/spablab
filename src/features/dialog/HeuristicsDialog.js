import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Legend, LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import {
  Alert,
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Slide
} from '@mui/material/';
import html2canvas from 'html2canvas';
import CloseIcon from '@mui/icons-material/Close';
import * as heuristicsDialog from '../../features/dialog/heuristicsDialogSlice';

const handleDownloadImage = async () => {
  const heuristics = document.getElementsByClassName('heuristic-picture')[0];
  const canvas = await html2canvas(heuristics, {
    logging: false,
    width: heuristics.clientWidth,
    height: heuristics.clientHeight
  });
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png', 1);
  a.download = "heuristics.png";
  a.click();
  a.remove();
};

const initData = (dim) => {
  let data = {};
  dim.forEach(item => data[item] = []);
  return data;
};

const charts = (data) => {
  return Object.keys(data).map(key =>
    <Grid key={key} item xs={12} sm={6} md={3}>
      <ResponsiveContainer width="100%" aspect={4.0/3.0}>
        <LineChart data={data[key]}>
          <YAxis domain={[-1, 1]} />
          <Legend />
          <Line type="monotone" dataKey={key} stroke="#007a99" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Grid>
  );
};

const Heuristics = () => {
  const state = useSelector(state => state);
  if (state.heuristicsDialog.heuristics) {
    const data = initData(state.heuristicsDialog.heuristics.dimensions);
    state.heuristicsDialog.heuristics.balance.forEach((item, i) => {
      state.heuristicsDialog.heuristics.dimensions.forEach((dimension, j) => {
        data[dimension].push({
          [dimension]: item[j]
        });
      });
    });
    return <Grid
      className="heuristic-picture"
      container
      spacing={3}
    >
      {charts(data)}
    </Grid>;
  }

  return null;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HeuristicsDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Dialog
      fullScreen
      open={state.heuristicsDialog.open}
      onClose={() => dispatch(heuristicsDialog.close())}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
       <Toolbar>
         <IconButton
           edge="start"
           color="inherit"
           onClick={() => dispatch(heuristicsDialog.close())}
           aria-label="close"
         >
           <CloseIcon />
         </IconButton>
         <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
           Heuristics
         </Typography>
         <Button color="inherit" onClick={() => handleDownloadImage()}>
           Download
         </Button>
         <Button autoFocus color="inherit" onClick={() => dispatch(heuristicsDialog.close())}>
           Close
         </Button>
       </Toolbar>
     </AppBar>
     <Alert
       className="info-alert"
       severity="info"
       style={{ margin: 15 }}
     >
       A chess game can be plotted in terms of balance. +1 is the best
       possible evaluation for White and -1 the best possible evaluation for
       Black. Both forces being set to 0 means they're balanced.
     </Alert>
     <Heuristics />
    </Dialog>
  );
};

export default HeuristicsDialog;
