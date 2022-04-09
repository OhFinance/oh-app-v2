import React, { useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Area, ComposedChart, Line, Tooltip, XAxis } from 'recharts';
import { ChartTimeRange } from '~/stores/useChartStore';
import { ChartPnL } from './chartPnL';

export type ChartProps = {
  data: null | { time: number; open: number; close: number; high: number }[];
  isLoading: boolean;
  width: number;
  height: number;
  onChartTimeChanged?: (timeRange: ChartTimeRange) => void;
};

function convertDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return `${date.getMonth()}/${date.getFullYear().toString().substr(-2)}`;
}
function convertValue(value: number) {
  return `${Math.floor(value / 10e2)}M`;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: string }[];
  label?: number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-consoleBGInner border-2 border-selectionHighlight text-accentText rounded-md p-2">
        <p className="label">{payload[0].value}</p>
        <p className="intro">{convertDate(label ?? 0)}</p>
      </div>
    );
  }

  return null;
};

const dividers: { [range in ChartTimeRange]: number } = {
  hourly: 0,
  daily: 86400,
  weekly: 604800,
  monthly: 2419200,
  yearly: 0,
  all: 0,
};

export function Chart({ data, isLoading, width, height, onChartTimeChanged }: ChartProps) {
  const [divider, setDivider] = useState(0);

  function buttonClicked(event: React.MouseEvent<HTMLButtonElement>) {
    const range = event.currentTarget.dataset.time as ChartTimeRange;
    setDivider(dividers[range]);
  }

  const buttonStyle =
    'w-12 h-8 mt-2 ml-4 text-white bg-button hover:bg-buttonHighlight disabled:bg-buttonDisabled rounded-full';

  const chartData = useMemo(() => {
    if (divider === 0) {
      return data;
    }
    return data?.filter((value) => value.time % divider === 0);
  }, [data, divider]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Button pills */}
      <div className="w-full h-10 flex flex-row pt-2">
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
          <div className={`pt-3 pl-4 text-accentText pointer-events-none`}>
            <Skeleton />
          </div>
        )}
      </div>
      {/* P&L Indicator */}
      <ChartPnL />
      {/* Chart */}
      {!data ? (
        <div className={`text-center text-accentText pt-44`} style={{ width, height }}>
          <Skeleton />
        </div>
      ) : (
        <div className="mt-6 w-full flex-row">
          <ComposedChart
            width={width}
            height={height - 70}
            data={chartData as object[]}
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
            <Tooltip content={<CustomTooltip />} />
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
