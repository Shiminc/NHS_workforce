import {chart, svg, innerChart, chart_heatmap, margin, xScale, yScale, colorScale, initiatiateColor} from './globalVar.js'


export function createAxis (){
    const yAxis = d3.axisLeft()
                .scale(yScale)
                .tickSize(2)
                .tickSizeOuter(0)


    const xAxis = d3.axisBottom()
                .scale(xScale)
                .tickSize(2)
                .tickSizeOuter(0)

    const bottomAxis = svg.append('g')
                    .attr('class','axis-x')
                    .call(xAxis)
                    .attr('transform',`translate(${margin.horizontal} , ${chart.height-margin.vertical})`)
            .attr('font-size', '2px')



    const leftAxis = svg.append('g')
                    .attr("class", "axis-y")
                    .call(yAxis)
            .attr('transform',`translate(${margin.horizontal} , ${margin.vertical})`)
            .attr('font-size', '2px')

    const yLabel = svg.append('text')
                    .text('y')
                    .attr('transform',`translate(${margin.horizontal} , ${margin.vertical-1})`)
                    .attr('text-anchor','end')
                    .attr('dominant-baseline','text-bottom')
                  .attr('font-size', '4px')

    const xLabel =svg.append('text')
                    .text('x')
                    .attr('transform',`translate(${chart.width-margin.horizontal} , ${chart.height-margin.vertical})`)
                    .attr('text-anchor','end')
                    .attr('dominant-baseline','text-bottom')
                  .attr('font-size', '4px')
} 
