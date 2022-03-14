import React from 'react';
import { useSelector } from 'react-redux';
import { Legend, LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { Grid } from '@mui/material';

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
