import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

export interface IGroupedData {
  label: string
  values: number[]
}

interface Props {
  data: IGroupedData[]
}

function sum(values: number[]) {
  return values.reduce((prev, value) => prev + value, 0)
}

export function StackedBarChart({ data }: Props) {
  const axisBottomRef = useRef<SVGGElement>(null)
  const axisLeftRef = useRef<SVGGElement>(null)

  const header = 'label,value1,value2'
  const body = data
    .map(({ label, values }) => [label, ...values].join(','))
    .join('\n')
  const csv = d3.csvParse([header, body].join('\n'))

  const margin = { top: 10, right: 0, bottom: 20, left: 30 }
  const width = 300 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom

  const subgroups = header.split(',')
  const labels = csv.map((data) => data.label || '')
  const max = Math.max(
    ...csv.map((data) => sum([data.value1, data.value2].map(Number))),
  )

  const scaleX = d3.scaleBand().domain(labels).range([0, width]).padding(0.4)
  const scaleY = d3.scaleLinear().domain([0, max]).range([height, 0])
  const color = d3
    .scaleOrdinal<string>()
    .domain(subgroups)
    .range(['#e41a1c', '#377eb8', '#4daf4a'])
  const stacked = d3.stack().keys(subgroups)(csv)

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX))
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY))
    }
  }, [scaleX, scaleY])

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
        <g ref={axisLeftRef} />
        {stacked.map((data, index) => {
          return (
            <>
              index == 1 && (
              <g key={`group-${index}`} fill={color(data.key)}>
                {data.map((d, index) => {
                  const label = String(d.data.label)
                  const y0 = scaleY(d[0])
                  const y1 = scaleY(d[1])

                  return (
                    <rect
                      key={`rect-${index}`}
                      x={scaleX(label)}
                      y={y1}
                      width={scaleX.bandwidth()}
                      height={y0 - y1 || 0}
                      rx={4}
                      ry={4}
                    />
                  )
                })}
              </g>
              ) index == 2 && (
              <g key={`group-${index}`} fill={color(data.key)}>
                {data.map((d, index) => {
                  const label = String(d.data.label)
                  const y0 = scaleY(d[0])
                  const y1 = scaleY(d[1])

                  return (
                    <rect
                      key={`rect-${index}`}
                      x={scaleX(label)}
                      y={y1}
                      width={scaleX.bandwidth()}
                      height={y0 - y1 || 0}
                      rx={4}
                      ry={4}
                    />
                  )
                })}
              </g>
              )
            </>
          )
        })}
      </g>
    </svg>
  )
}
