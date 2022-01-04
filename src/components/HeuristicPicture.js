import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { Legend, LineChart, Line, XAxis, YAxis } from 'recharts';

const getDimensions = (items) => {
  return Object.keys(items).map(item => {
    let word = item.split("\\").pop();
    return word.substring(0, word.length - 10);
  });
};

const initData = (dim) => {
  let data = {};
  dim.forEach(item => data[item] = []);
  return data;
};

const buildCharts = (data) => {
  return Object.keys(data).map(key =>
    <Grid key={key} item xs={3}>
      <LineChart width={200} height={150} data={data[key]}>
        <XAxis dataKey="n" />
        <YAxis domain={[-1, 1]} />
        <Legend />
        <Line type="monotone" dataKey={key} stroke="#007a99" dot={false} strokeWidth={2} />
      </LineChart>
    </Grid>
  );
};

let dim = [];

let data = {};

const HeuristicPicture = () => {
  const state = useSelector(state => state);
  if (state.heuristicPictureDialog.heuristic_picture) {
    dim = getDimensions(state.heuristicPictureDialog.heuristic_picture.dimensions);
    data = initData(dim);
    state.heuristicPictureDialog.heuristic_picture.balance.forEach((item, i) => {
      dim.forEach((dimension, j) => {
        data[dimension].push({
          [dimension]: item[j]
        });
      });
    });
    return <Grid container spacing={3}>
      {buildCharts(data)}
    </Grid>;
  }

  return null;
}

export default HeuristicPicture;
