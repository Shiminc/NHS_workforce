import {chart, svg, innerChart, chart_heatmap, margin, xScale, yScale, colorScale, initiatiateColor, ARDcolor} from './globalVar.js'

export function createA(data){

    const lineGenerator_A = d3.line()
    .x(d=>xScale((d.x)))
    .y(d=>yScale((d.y)))

    const line_chart_A = innerChart.append('path')
    .attr('class','line-A')
    .attr('d', lineGenerator_A(data))
    .attr('fill','none')
    .attr('stroke',ARDcolor)
    .attr('stroke-width','0.5px')





}
