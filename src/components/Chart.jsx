import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import PropTypes from 'prop-types';
import React from 'react';
import { Chart as ReactChart, ChartCanvas } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { AreaSeries, LineSeries } from 'react-stockcharts/lib/series';
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip';
import { last } from 'react-stockcharts/lib/utils';

let _Chart = ({
  className,
  type,
  data: initialData,
  width,
  height,
  ratio,
  interpolation,
  gridProps,
  seriesName,
  seriesType,
}) => {
  const margin = { left: 0, right: 0, top: 0, bottom: 0 };

  const gridHeight = height - margin.top - margin.bottom;
  const gridWidth = width - margin.left - margin.right;

  const showGrid = true;
  const yGrid = showGrid ? { innerTickSize: -1 * gridWidth } : {};
  const xGrid = showGrid ? { innerTickSize: -1 * gridHeight } : {};

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 150)]);
  const xExtents = [start, end];

  const Series = seriesType === 'line' ? LineSeries : AreaSeries;
  return (
    <ChartCanvas
      className={className}
      height={height}
      ratio={ratio}
      width={width}
      margin={{ left: margin.left, right: margin.right, top: margin.top, bottom: margin.bottom }}
      type={type}
      seriesName={seriesName ?? 'MSFT'}
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <ReactChart id={1} yExtents={(d) => [d.high, d.low]}>
        <XAxis axisAt="bottom" orient="bottom" {...gridProps} {...xGrid} />
        <YAxis axisAt="right" orient="right" ticks={5} {...gridProps} {...yGrid} />
        <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat('%Y-%m-%d')} />
        <MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />

        <Series
          yAccessor={(d) => d.close}
          interpolation={interpolation}
          stroke="#ff7f0e"
          fill="#ff7f0e"
        />
        <OHLCTooltip origin={[-40, 0]} />
      </ReactChart>

      <CrossHairCursor />
    </ChartCanvas>
  );
};

_Chart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
};

_Chart.defaultProps = {
  type: 'svg',
};

export const Chart = fitWidth(_Chart);
