import {chart, svg, innerChart, chart_heatmap, margin, xScale, yScale, colorScale, initiatiateColor} from './globalVar.js'

export function createPoint (data){
    const point  = innerChart
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', d=>xScale(d.x))
        .attr('cy', d=>yScale(d.y))
        .attr('r', 0.8)
}
