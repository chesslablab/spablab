import React from 'react';
import { useSelector } from 'react-redux';
import { Legend, LineChart, Line, XAxis, YAxis } from 'recharts';

const getDimensions = (items) => {
  return Object.keys(items).map(item => item.split("\\").pop());
};

const initData = (dim) => {
  let data = {};
  dim.forEach(item => data[item] = []);
  return data;
};

const buildCharts = (data) => {
  return Object.keys(data).map(key =>
    <LineChart key={key} width={300} height={200} data={data[key]}>
      <XAxis dataKey="n" />
      <YAxis />
      <Legend />
      <Line type="monotone" dataKey={key} stroke="#007a99" dot={false} strokeWidth={2} />
    </LineChart>
  );
};

let dim = [];

let data = {};

const Chart = () => {
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
    return <div>{buildCharts(data)}</div>;
  }

  return null;
}

export default Chart;
