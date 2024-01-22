import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

interface IGroupedData {
  label: string
  values: number[]
}

interface Props {
  data: IGroupedData[]
  widthCustom: number
  heightCustom: number
}

function sum(values: number[]) {
  return values.reduce((prev, value) => prev + value, 0)
}

export function StackedBarChart({ data, widthCustom, heightCustom }: Props) {
  const axisBottomRef = useRef<SVGGElement>(null)
  const axisLeftRef = useRef<SVGGElement>(null)

  const header = 'label,value1,value2'
  const body = data
    .map(({ label, values }) => [label, ...values].join(','))
    .join('\n')
  const csv = d3.csvParse([header, body].join('\n'))

  const margin = { top: 10, right: 0, bottom: 20, left: 30 }
  const width = widthCustom - margin.left - margin.right
  const height = heightCustom - margin.top - margin.bottom

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
  const stacked = d3.stack().keys(subgroups)(csv as any)

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX).tickSize(0))
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY).tickSize(0))
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
        <defs>
          <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stop-color="#9687FF" />
            <stop offset="100%" stop-color="#334AD3" />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad2" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stop-color="#595ACF80" />
            <stop offset="100%" stop-color="#595ACF00" />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="grad3" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="33%" stop-color="#FB792F" />
            <stop offset="66%" stop-color="#F3C755" />
            <stop offset="100%" stop-color="#F5C341" />
          </linearGradient>
        </defs>
        {stacked.map((data, index) => {
          console.log(index, 'stacked.map')
          if (index == 1)
            return (
              <>
                {/* <g key={`group-${index}`} fill={color(data.key)}> */}
                <g key={`group-${index}`}>
                  {data.map((d, index) => {
                    const label = String(d.data.label)
                    let y0 = scaleY(d[0])
                    let y1 = scaleY(d[1])
                    // let temp = y0
                    // y0 = y0 - (y1 - y0)
                    // y1 = temp
                    const height = d.data.value2
                    console.log(d, index, 'data.map')
                    console.log(height, 'height')
                    return (
                      <>
                        <g style={{ display: 'flex', alignItems: 'center' }}>
                          <rect
                            key={`rect-${index}-1`}
                            x={scaleX(label)}
                            y={y1}
                            width={scaleX.bandwidth()}
                            height={height || 0}
                            rx={4}
                            ry={4}
                            fill={'url(#grad1)'}
                          />
                          <rect
                            key={`rect-${index}-2`}
                            x={scaleX(label)}
                            y={y1}
                            width={scaleX.bandwidth()}
                            height={y0 - y1 || 0}
                            rx={4}
                            ry={4}
                            fill="url(#grad2)"
                          />
                          <text
                            key={`rect-${index}`}
                            x={scaleX(label)}
                            y={y1 - 5}
                            fill="white"
                            fontSize={'10'}
                            dominant-baseline="middle"
                          >
                            {height}
                          </text>
                        </g>
                      </>
                    )
                  })}
                </g>
              </>
            )
        })}
      </g>
    </svg>
  )
}
