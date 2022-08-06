import React, { PureComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const initData = (dim, balance) => {
  let data = [];
  dim.forEach((item, i) => data.push({ name: item, val: balance[i]}));
  return data;
};

const HeuristicsBar = () => {
  const state = useSelector(state => state);
  if (state.heuristicsBar.heuristics) {
    const data = initData(
      state.heuristicsBar.heuristics.dimensions,
      state.heuristicsBar.heuristics.balance
    );
    return (
      <ResponsiveContainer height="25%" width="100%">
        <BarChart
          data={data}
          margin={{
            top: 15,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" hide={true} />
          <Tooltip />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="val" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return null;
}

export default HeuristicsBar;
