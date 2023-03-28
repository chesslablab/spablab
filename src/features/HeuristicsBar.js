import React from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const initData = (dim, balance) => {
  let data = [];

  dim.forEach((item, i) => {
    if (balance[i] !== 0) {
      data.push({ name: item, val: balance[i] });
    }
  });

  data.sort((a, b) => {
    return b.val - a.val;
  });

  return data;
};

const HeuristicsBar = () => {
  const state = useSelector(state => state);
  if (
    state.settingsDialog.fields.heuristics === 'on' && 
    state.heuristicsBar.heuristics
  ) {
    const data = initData(
      state.heuristicsBar.heuristics.dimensions,
      state.heuristicsBar.heuristics.balance
    );

    const gradientOffset = () => {
      const dataMax = Math.max(...data.map((i) => i.val));
      const dataMin = Math.min(...data.map((i) => i.val));
      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin >= 0) {
        return 1;
      }

      return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
      <ResponsiveContainer height="20%" width="100%">
        <AreaChart
          data={data}
          margin={{
            top: 15,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" hide={true} />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#e8e8e8" stopOpacity={1} />
              <stop offset={off} stopColor="#202020" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="val"
            stroke="#8884d8"
            strokeWidth={2}
            fill="url(#splitColor)"
            dot={{ stroke: "#8884d8", strokeWidth: 4, r: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return null;
}

export default HeuristicsBar;
