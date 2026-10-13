import {chart, svg, innerChart, chart_heatmap, margin, xScale, yScale, colorScale, initiatiateColor, ARDcolor} from './globalVar.js'

export function createD(data){

    const lineGenerator_D = d3.line()
    .x(d=>xScale((d.x)))
    .y(d=>yScale((d.y)))
    .defined(d=>d.curve==0)

    const line_chart_D = innerChart.append('path')
    .attr('class','line-D')
    .attr('d', lineGenerator_D(data))
    .attr('fill','none')
    .attr('stroke',ARDcolor)
    .attr('stroke-width','0.5px')


    const curveGenerator_D = d3.line()
    .x(d=>xScale((d.x)))
    .y(d=>yScale((d.y)))
    .curve(d3.curveCatmullRom)
    .defined(d=>d.curve==1)

    const curve_chart_D = innerChart.append('path')
    .attr('class','curve-D')
    .attr('d', curveGenerator_D(data))
    .attr('fill','none')
    .attr('stroke',ARDcolor)
    .attr('stroke-width','0.5px')
}
