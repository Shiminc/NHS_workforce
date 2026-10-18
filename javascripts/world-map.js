import {width, height,geoPathGenerator,draw_graticules,showToolTip, hideToolTip} from './geo-configuration.js'
import {showBreakDown} from './sunburst-tooltip.js'
import {create_colorScaleQuantile, create_colorScaleLog} from './color-choropleth.js'

export const drawMap = (geodata) =>{
    const colorScaleQuantile = create_colorScaleQuantile(geodata)
    const [colorScalelog, scaleLog,countryColorScale] = create_colorScaleLog(geodata)
    const svg = d3.select("#map-chart")
        .append('svg')
        .attr('id','svg-map')
        .attr('viewBox',`0 0 ${width} ${height}`)

    draw_graticules(svg)
    
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
}