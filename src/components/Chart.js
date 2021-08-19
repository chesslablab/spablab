import React from 'react';
import { useSelector } from 'react-redux';
import { Legend, LineChart, Line, XAxis, YAxis } from 'recharts';

let data = {
  material: [],
};

const Chart = () => {
  const state = useSelector(state => state);

  if (state.heuristicPictureDialog.heuristic_picture) {
    state.heuristicPictureDialog.heuristic_picture.balance.forEach((item) => {
      data.material.push({
        material: item[0]
      });
    });
  } else {
    data = {
      material: []
    };
  }

  return(
    <LineChart width={400} height={400} data={data.material}>
      <XAxis dataKey="n" />
      <YAxis />
      <Legend />
      <Line type="monotone" dataKey="material" stroke="#007a99" dot={false} strokeWidth={2} />
    </LineChart>
  );
}

export default Chart;
