import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
//import * as d3 from "d3";
import { csv, scaleBand, scaleLinear, max } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/ojieconcept/e6f3298143b0e266c4bdb744c022c20e/raw/49443fa7d90b395fdbb8b9565fcbe32fc62c3872/world_population_2021.csv";

const width = 500;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      //d.Population = parseFloat(d["2020"]);
      d.Population = +d["2020"];
      return d;
    };
    csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);

  // useEffect(() => {
  //   d3.csv(csvUrl).then((data) => {
  //     setData(data);
  //   });
  // }, []);

  if (!data) {
    return <pre>loading......</pre>;
  }
  //console.log(data[0]);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max[(data, (d) => d.Population)]])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map((tickValue) => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="black" />
            <text
              style={{ textAnchor: "middle" }}
              y={innerHeight + 3}
              dy="0.71em"
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
          <text
            key={tickValue}
            style={{ textAnchor: "end" }}
            x={-3}
            y={yScale(tickValue) + yScale.bandwidth() / 2}
            dy="0.32em"
          >
            {tickValue}
          </text>
        ))}
        {data.map((d) => (
          <rect
            key={d.Country}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          />
        ))}
      </g>
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
