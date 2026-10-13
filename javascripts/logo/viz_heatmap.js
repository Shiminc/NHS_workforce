import {chart, svg, innerChart, chart_heatmap, margin, xScale, yScale, colorScale, initiatiateColor} from './globalVar.js'



export function createHeatmap (data){


    const data_base = innerChart.selectAll('g')
            .data(data)
            .join('g')
            .attr('class','logo')

    const square = data_base.append('rect')
        .attr('x',d=>xScale(d.x))
        .attr('y',d=>yScale(d.y))
        // .attr('fill', d => fill_color(d))
        .attr('fill', d => d.alphabet == 1 ? colorScale(d.y) : 'skyblue')
        .attr('width',xScale(1)-xScale(0))
        .attr('height',yScale(0)-yScale(1))
        // .attr('rx',0.5)
        // .attr('ry',0.5)
        .attr('stroke','white')
        .attr('stroke-width',0.5)

    }






