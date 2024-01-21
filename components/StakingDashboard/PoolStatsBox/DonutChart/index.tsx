import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'

const DonutChart = ({fallen, customWidth, customHeight}: any) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const data = [100-fallen, fallen]

    const width = customWidth
    const height = customHeight
    const radius = Math.min(width, height) / 2

    const svg = d3
      .select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('gradientTransform', 'rotate(90)')

    // Add color stops to the gradient
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#BCAAFF')
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#B364D1')

    const gradient1 = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradient1')
      .attr('gradientTransform', 'rotate(90)')

    // Add color stops to the gradient
    gradient1.append('stop').attr('offset', '0%').attr('stop-color', '#FB792F')
    gradient1.append('stop').attr('offset', '60%').attr('stop-color', '#F3C755')
    gradient1
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#F5C341')

    var colorScale = d3
      .scaleOrdinal()
      .domain(
        data.map(function (d: any, i: any) {
          return i
        }),
      )
      .range(['url(#gradient)', 'url(#gradient1)'])

    const pie = d3
      .pie()
      .sort(null)
      .value((d: any) => d)
      .padAngle(0.08)

    const arc: any = d3
      .arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .cornerRadius(8)

    const arcs = svg
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d, i: any): any {
        return colorScale(i)
      })
  }, [])

  return <svg ref={chartRef}></svg>
}

export default DonutChart
