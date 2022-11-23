import React from "react";
export const AxisLeft = ({ yScale, innerWidth, tickOffset }) => (
  <>
    {yScale.ticks().map((tickValue) => (
      <g className="ticks" transform={`translate (0,${yScale(tickValue)})`}>
        <line x2={innerWidth} />
        <text
          key={tickValue}
          style={{ textAnchor: "end" }}
          x={tickOffset}
          dy="0.32em"
        >
          {tickValue}
        </text>
      </g>
    ))}
    ;
  </>
);
