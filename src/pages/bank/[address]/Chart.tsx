import { CandlestickData, createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { ChartTimeRange } from 'state/application/reducer';
import styled from 'styled-components';

const Container = styled.div({
  width: '100%',
  height: '100%',
});

export default React.memo(function Chart({
  data,
  timeframe,
}: {
  data: CandlestickData[] | null;
  timeframe: ChartTimeRange;
}) {
  const node = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (node.current && data !== null) {
      let { height, width } = node.current.getBoundingClientRect();
      const chart = createChart(node.current, {
        width,
        height,
        layout: {
          background: {
            color: 'transparent',
          },
          textColor: '#A4AADF',
          fontFamily: "'Roboto', sans-serif",
        },
        grid: {
          horzLines: {
            color: 'RGBA(0, 113, 181, 0.4)',
          },
          vertLines: {
            visible: false,
          },
        },
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderColor: '#0071B5',
        },
      });
      if (timeframe === 'hour') {
        let lineData = data.map((v) => ({ time: v.time, value: v.open }));
        const lineSeries = chart.addAreaSeries();
        lineSeries.setData(lineData);
      } else {
        const candleSeries = chart.addCandlestickSeries();
        candleSeries.setData(data);
      }

      return () => {
        chart.remove();
      };
    }
  }, [node, data]);
  if (data === null) {
    return <h1>Loading...</h1>;
  }
  return <Container ref={node}></Container>;
});
