import React from 'react';
import { Legend, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function Chart(data) {
  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart
          width={500}
          data={data.axis}
        >
          <XAxis dataKey="n" />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="balance" stroke="#007a99" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
