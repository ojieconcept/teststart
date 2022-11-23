import React from "react";
export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset }) => (
  <>
    {xScale.ticks().map((tickValue) => (
      <g
        className="ticks"
        key={tickValue}
        transform={`translate(${xScale(tickValue)}, 0)`}
      >
        <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="black" />
        <text
          style={{ textAnchor: "middle" }}
          y={innerHeight + tickOffset}
          dy="0.71em"
        >
          {tickFormat(tickValue)}
        </text>
      </g>
    ))}
    ;
  </>
);
