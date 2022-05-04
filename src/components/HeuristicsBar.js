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

const getDimensions = (items) => {
  return Object.keys(items).map(item => {
    let word = item.split("\\").pop();
    return word.substring(0, word.length - 10);
  });
};

const initData = (dim, balance) => {
  let data = [];
  dim.forEach((item, i) => data.push({ name: item, val: balance[i]}));
  return data;
};

const HeuristicsBar = () => {
  const state = useSelector(state => state);
  if (state.heuristicsBar.heuristics) {
    const dim = getDimensions(state.heuristicsBar.heuristics.dimensions);
    const data = initData(dim, state.heuristicsBar.heuristics.balance);
    return (
      <ResponsiveContainer width="100%" aspect={4.0/2.0}>
        <BarChart
          width={500}
          height={250}
          data={data}
          margin={{
            top: 5,
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
