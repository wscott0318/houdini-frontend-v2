import React , { Component} from 'react';
import * as d3 from 'd3';
const colors = [ '#8ce8ad', '#57e188'];

interface DonutChartProps {
  data: { name: string; value: number }[];
}

class DonutChart extends Component {

    constructor(props: DonutChartProps) {
        super(props);
        this.chRef = React.createRef();
    }

    // Chart load after component Mount
    componentDidMount() {
      this.drawChart();
    }

    // DrawChart 
    drawChart(){
        const {data} = this.props;
        const width = 198;
        const height = width;
        const margin = 15;
        let radius = Math.min(width, height) / 2  - margin;
        // legend Position

        // Create SVG
        const svg  = d3.select(this.chRef.current)
          .append('svg')
          .attr("width", "198px")
          .attr("height", "198px")
          .attr('viewBox', '0 0 ' + width + ' ' + width )
          .append("g")
          .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

        let pie = d3.pie()
            .value( d => d.value )
        let data_ready = pie(data)

        // Donut partition  
        svg
          .selectAll('whatever')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('d', d3.arc()
              .innerRadius(radius/ 1.75)  // This is the size of the donut hole
              .outerRadius(radius)
              .cornerRadius(8)
          )
          .attr('fill',  (d) => colors[d.index] )
          .style("opacity", "0.8");
    }
    render() {
        return <>
            <div ref={this.chRef}></div>
        </>
    }


}

export default DonutChart;