import {chart, svg, innerChart, chart_heatmap, margin, xScale, yScale, colorScale, initiatiateColor, ARDcolor} from './globalVar.js'

export function createR(data){

    const lineGenerator_R = d3.line()
    .x(d=>xScale((d.x)))
    .y(d=>yScale((d.y)))
    .defined(d=>d.curve==0)

    const line_chart_R = innerChart.append('path')
    .attr('class','line-R')
    .attr('d', lineGenerator_R(data))
    .attr('fill','none')
    .attr('stroke',ARDcolor)
    .attr('stroke-width','0.5px')


    const curveGenerator_R = d3.line()
    .x(d=>xScale((d.x)))
    .y(d=>yScale((d.y)))
    .curve(d3.curveCatmullRom)
    .defined(d=>d.curve==1)

    const curve_chart_R = innerChart.append('path')
    .attr('class','curve-R')
    .attr('d', curveGenerator_R(data))
    .attr('fill','none')
    .attr('stroke',ARDcolor)
    .attr('stroke-width','0.5px')
}
