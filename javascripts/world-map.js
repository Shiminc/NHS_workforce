import {width, height, margin_top, margin_bottom, geoPathGenerator,draw_graticules,showToolTip, hideToolTip} from './geo-configuration.js'
import {showBreakDown} from './sunburst-tooltip.js'
import {create_colorScaleQuantile, create_colorScaleLog} from './color-choropleth.js'

export const drawMap = (geodata) =>{
    const colorScaleQuantile = create_colorScaleQuantile(geodata)
    const [colorScalelog, scaleLog,countryColorScale,min_color,max_color,median_color,min_value,max_value,median_value,twentyfive_value,seventyfive_value,twentyfive_color, seventyfive_color] = create_colorScaleLog(geodata)
    console.log(min_value,max_value,median_value)
    const svg = d3.select("#map-chart")
        .append('svg')
        .attr('id','svg-map')
        .attr('viewBox',`0 0 ${width} ${height + margin_top + margin_bottom}`)
        .append('g')
        .attr('transform',`translate(0,${margin_top})`)
        .attr('id','svg-map-g')
        
    draw_graticules(svg)

    // legend
    const legend = d3.select('#svg-map').append('foreignObject')
        .attr('x',margin_top)
        .attr('y',height + margin_top*1.2)
        .attr('width', width)
        .attr('height', 150)

    legend.append('xhtml:div')
        .attr('class','legend-label')
        .style('width', `${width/3}px`)
        .style('height', '20px')
        .text('Number of staff')

    legend.append('xhtml:div')
        .attr('id','legend-color')
        .style('width', `${width/3}px`)
        .style('height', '20px')
        .style('background',`linear-gradient(to right, white 0%, ${twentyfive_color} 25%, ${median_color} 50%, ${seventyfive_color} 75%, ${max_color} 100%)`)

    const legend_label= legend.append('xhtml:div')
        .attr('class','legend-label')
        .style('height', '20px')
        .style('width', '100px')

    legend_label.append('span')
        .text('0')


    legend_label.append('span')
        .style('position','absolute')
        .style('left',`${(width/6)/2}px`)
        .text(`${twentyfive_value.toFixed(0)}`)

    legend_label.append('span')
        .style('position','absolute')
        .style('left',`${width/6}px`)
        .text(`${median_value.toFixed(0)}`)


    legend_label.append('span')
        .style('position','absolute')
        .style('left',`${(width/6)/2*3}px`)
        .text(`${seventyfive_value.toFixed(0)}`)

    legend_label.append('span')
        .style('position','absolute')
        .style('left',`${width/3}px`)
        .text(`${max_value.toFixed(0)}`)

    const legend_label_explainer= legend.append('xhtml:div')
        .attr('class','legend-label-explainer')
        .style('height', '20px')
        .style('width', '100px')
    
    
    legend_label_explainer.append('span')
        .style('position','absolute')
        .style('left',`${(width/6)/2}px`)
        .text('25th percentile')
    

    legend_label_explainer.append('span')
        .style('position','absolute')
        .style('left',`${(width/6)}px`)
        .text('50th percentile')

    legend_label_explainer.append('span')
        .style('position','absolute')
        .style('left',`${(width/6)/2*3}px`)
        .text('75th percentile')

    legend_label_explainer.append('span')
        .style('position','absolute')
        .style('left',`${width/3}px`)
        .text('100th percentile')

    svg.selectAll('.country-path')
    .data(geodata.features)
    .join('path')
        .attr('class','country-path')
        .attr('d',geoPathGenerator)
        // .attr('fill',d => {
        //     if (d['Country or Area']=='United Kingdom') return 'red';
        //     else return colorScaleQuantile(d['All staff total'])
        // })
        .attr('fill',d => {
            if (d['All staff total']==0) return 'white';
            else return colorScalelog(scaleLog(d['All staff total']))
        })
        // .attr('fill',d => {
        //     if (d['All staff total']==0) return 'white';
        //     else if (d['Country or Area']=='United Kingdom') return 'red'
        //     else return countryColorScale((d['All staff total']))
        // })
        .attr('stroke','black')
        .attr('stroke-opacity',0.4)
        .on('mouseenter',showToolTip)
        .on('mouseleave',hideToolTip)
        .on('dblclick',showBreakDown)


        // const zoomHandler = d3.zoom()
        // .scaleExtent([1,3])
        // .translateExtent([[-width/2,-height/2],
        // [3*width/2,3*height/2]])
        // .on('zoom',(e) =>{
        //     console.log(e)
        //     svg.attr('transform',e.transform)
        // })
        // d3.select("#map-chart")
        // .call(zoomHandler)
}