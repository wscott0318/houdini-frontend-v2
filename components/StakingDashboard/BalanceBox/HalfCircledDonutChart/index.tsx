import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HalfCircledDonutChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const data:any = [
      { label: 'Slice 1', value: 20 },
      { label: 'Slice 2', value: 80 },
    ];

    const svg = d3.select(svgRef.current);
  
    // Define the chart dimensions
    const width = 198;
    const height = 198;
    const radius = Math.min(width, height) / 2;
  
    // Create the arc generator
    const arc: any = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .cornerRadius(8);
  
    // Create the pie generator
    const pie = d3.pie()
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .value((d: any) => d.value)
      .padAngle(0.08);

    // Define the data for the chart
    
  
    // Append the chart to the SVG element
    svg.attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i]);
  }, []);
  

  return <svg className='absolute' ref={svgRef}></svg>;
};

export default HalfCircledDonutChart;