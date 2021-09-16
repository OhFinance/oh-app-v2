import React from 'react';
import { Area, ComposedChart, Line, Tooltip, XAxis } from 'recharts';
import { ChartTimeRange } from '~/stores/useChartStore';
import { ChartPnL } from './chartPnL';

export type ChartProps = {
  data: null | unknown[];
  isLoading: boolean;
  width: number;
  height: number;
  onChartTimeChanged: (timeRange: ChartTimeRange) => void;
};

function convertDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return `${date.getMonth()}/${date.getFullYear().toString().substr(-2)}`;
}
function convertValue(value: number) {
  return `${Math.floor(value / 10e2)}M`;
}

export function Chart({ data, isLoading, width, height, onChartTimeChanged }: ChartProps) {
  function buttonClicked(event: React.MouseEvent<HTMLButtonElement>) {
    onChartTimeChanged(event.currentTarget.dataset.time as ChartTimeRange);
  }

  const buttonStyle =
    'w-12 h-8 mt-2 ml-4 text-white bg-button hover:bg-buttonHighlight disabled:bg-buttonDisabled rounded-full';

  return (
    <div className="w-full h-full flex flex-col">
      {/* Button pills */}
      <div className="w-full h-10 flex flex-row">
        <button
          data-time="hourly"
          onClick={buttonClicked}
          disabled={isLoading}
          className={buttonStyle}
        >
          1HR
        </button>
        <button
          data-time="daily"
          onClick={buttonClicked}
          disabled={isLoading}
          className={buttonStyle}
        >
          1D
        </button>
        <button
          data-time="weekly"
          onClick={buttonClicked}
          disabled={isLoading}
          className={buttonStyle}
        >
          1W
        </button>
        <button
          data-time="monthly"
          onClick={buttonClicked}
          disabled={isLoading}
          className={buttonStyle}
        >
          1M
        </button>
        <button
          data-time="yearly"
          onClick={buttonClicked}
          disabled={isLoading}
          className={buttonStyle}
        >
          1YR
        </button>
        <button
          data-time="all"
          onClick={buttonClicked}
          disabled={isLoading}
          className={buttonStyle}
        >
          ALL
        </button>
        {data && isLoading && (
          <div className={`pt-3 pl-4 text-accentText pointer-events-none`}>Loading...</div>
        )}
      </div>
      {/* P&L Indicator */}
      <ChartPnL />
      {/* Chart */}
      {!data ? (
        <div className={`text-center text-accentText pt-44`} style={{ width, height }}>
          Loading...
        </div>
      ) : (
        <div className="mt-6 w-full flex-row">
          <ComposedChart
            width={width - 10}
            height={height - 70}
            data={data}
            margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#db2777" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#00000" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tickFormatter={convertDate} />
            {/* <YAxis tickFormatter={convertValue} /> */}
            <Tooltip />
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
        </div>
      )}
    </div>
  );
}
