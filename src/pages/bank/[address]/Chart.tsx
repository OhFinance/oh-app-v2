import Skeleton from 'components/Skeleton';
import { BarPrice, CandlestickData, createChart } from 'lightweight-charts';
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

      let lineData = data.map((v) => ({ time: v.time, value: v.high }));
      const lineSeries = chart.addAreaSeries({
        priceFormat: {
          type: 'custom',
          formatter: (price: BarPrice) =>
            price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        },
      });
      lineSeries.setData(lineData);

      return () => {
        chart.remove();
      };
    }
  }, [node, data, timeframe]);
  if (data === null) {
    return (
      <Skeleton
        width="100%"
        height="100%"
        style={{
          marginTop: '1rem',
        }}
        variant="rect"
        animation="wave"
      />
    );
  }
  return <Container ref={node}></Container>;
});
