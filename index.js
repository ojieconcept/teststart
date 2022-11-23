import React from "react";
import ReactDOM from "react-dom";
//import * as d3 from "d3";
import {
  scaleLinear,
  timeFormat,
  extent,
  scaleTime,
  bin,
  timeMonths,
  sum,
  max,
} from "d3";
import { UseData } from "./useData";
import { AxisBottom } from "./axisBottom";
import { AxisLeft } from "./axisLeft";
import { Marks } from "./Marks";

const width = 600;
const height = 600;
const margin = { top: 20, right: 20, bottom: 35, left: 70 };
const marginOffset = 32;

const App = () => {
  const data = UseData();

  if (!data) {
    return <pre>loading......</pre>;
  }
  //console.log(data[0]);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d["Total Dead and Missing"];
  const xValue = (d) => d["Reported Date"];

  const xAxisLabel = "Time";
  const yAxisLabel = "Total Dead and Missing";

  const xAxistickFormat = timeFormat("%m/%d/%Y");

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxistickFormat}
          tickOffset={3}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={0} />
        <text
          className="label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + marginOffset}
        >
          {xAxisLabel}
        </text>
        <text
          className="label"
          x={0}
          textAnchor="middle"
          transform={`translate(${-marginOffset}, ${
            innerHeight / 2
          }) rotate (-90)`}
        >
          {yAxisLabel}
        </text>
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          toolTipFormat={(d) => d}
          innerHeight={innerHeight}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
