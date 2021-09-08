import React from 'react';
import { Area, ComposedChart, Line } from 'recharts';

export type ChartProps = { data: unknown[]; isLoading: boolean; width: number; height: number };

/* function convertDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return `${date.getMonth()}/${date.getFullYear().toString().substr(-2)}`;
}
function convertValue(value: number) {
  return `${Math.floor(value / 10e2)}M`;
} */

export function Chart({ data, isLoading, width, height }: ChartProps) {
  return isLoading ? (
    <div className={`text-center text-pink-500 pt-48`} style={{ width, height }}>
      Loading...
    </div>
  ) : (
    <ComposedChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#db2777" stopOpacity={0.1} />
          <stop offset="95%" stopColor="#00000" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      {/* <XAxis dataKey="time" tickFormatter={convertDate} /> */}
      {/* <YAxis tickFormatter={convertValue} /> */}
      {/* <Tooltip /> */}
      {/* <CartesianGrid vertical={false} stroke="#DDD" /> */}

      <Line
        type="monotone"
        strokeLinecap="round"
        strokeWidth={2}
        dataKey="close"
        stroke="#db2777"
        dot={false}
        legendType="none"
      />
      <Area
        type="monotone"
        dataKey="close"
        stroke={'false'}
        strokeWidth={2}
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </ComposedChart>
  );
}
