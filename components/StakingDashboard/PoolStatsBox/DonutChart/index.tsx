import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [20, 80];
  
    const width = 150;
    const height = 150;
    const radius = Math.min(width, height) / 2;
  
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
    const color = d3.scaleOrdinal()
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56']);

    const pie = d3.pie().sort(null).value((d: any) => d).padAngle(0.08);

    const arc:any = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .cornerRadius(8);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i):any => {d3.schemeCategory10[i]});
  }, []);
  

  return (
    <svg ref={chartRef}></svg>
  );
};

export default DonutChart;