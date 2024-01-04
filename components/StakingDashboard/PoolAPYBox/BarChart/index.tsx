import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Data for the chart
    const data = [10, 20, 30, 40, 50];

    // Dimensions of the chart
    const width = 500;
    const height = 300;

    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create the bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 50)
      .attr('y', (d) => height - d)
      .attr('width', 40)
      .attr('height', (d) => d)
      .attr('fill', 'steelblue');
  }, []);

  return <div ref={chartRef}></div>;
};

export default BarChart;
