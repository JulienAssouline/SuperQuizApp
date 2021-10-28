import React from 'react';

import {pie, arc} from 'd3-shape';
import {Svg, G, Path} from 'react-native-svg';

const DonutChart = ({score}) => {
  const w = 400;
  const h = 400;

  const margin = {
    top: 40,
    bottom: 10,
    right: 40,
    left: 35,
  };
  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const radius = Math.min(width, height) / 2;

  const arcMath = arc()
    .innerRadius(radius * 0.85)
    .outerRadius(radius - 1)
    .cornerRadius(4);

  const pieChart = pie()
    .padAngle(0)
    .sort(null)
    .value(d => d.value);

  const percentageScore = (score / 3) * 100;

  const arcs = pieChart([
    {value: percentageScore, fg: true},
    {value: 100 - percentageScore, fg: false},
  ]);

  const findColor = value => {
    if (Math.round(value) === 100) return '#00FF00';
    if (Math.round(value) === 67) return '#FFA500';
    if (Math.round(value) === 33) return '#FF0000';
    return '#D3D3D3';
  };

  return (
    <Svg width={w} height={h}>
      <G transform={`translate(${w / 2},${h / 2})`}>
        {arcs.map((d, i) => (
          <Path
            key={i}
            fill={d.data.fg ? findColor(d.data.value) : '#D3D3D3'}
            strokeWidth={2}
            d={arcMath(d)}
          />
        ))}
      </G>
    </Svg>
  );
};

export default DonutChart;
