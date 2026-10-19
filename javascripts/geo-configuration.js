
export const width = 1230*0.8
export const height = 620*0.8
export const margin_top = 200/2
export const margin_bottom = 200

export const projection = d3.geoEqualEarth()
        .translate([width/2,height/2])
        .scale(200)

export const geoPathGenerator = d3.geoPath()
    .projection(projection)

    // for Graticule
export const graticuleGenerator = d3.geoGraticule()

export function draw_graticules(svg) {
    const graticules = svg
    .append('g')
    .attr('fill','transparent')
    .attr('stroke','gray')
    .attr('stroke-opacity',0.2)

    graticules.append('path')
    .datum(graticuleGenerator)
        .attr('d', geoPathGenerator)

    // to add the outer part
    graticules.append('path')
    .datum(graticuleGenerator.outline)
        .attr('d',geoPathGenerator)
}

export function showToolTip(e,d){
        const centroid = geoPathGenerator.centroid(d)
        // console.log(centroid)
        // append the rect first so the rect background won't obscure the text
        let rectBackground=d3.select('#svg-map-g').append('rect')
        .attr('rx','0.3%')

        const textContainer = d3.select('#svg-map-g').append('text')
        .attr('id','toolTip-text')
        .attr('x',centroid[0])
        .attr('y',centroid[1] )
        .attr('font-size',10)
        .attr('font-family', 'sans-serif')

        textContainer.append('tspan')
        .attr('class','area')
        .attr('dominant-baseline','hanging')
        // .text(d['Country or Area'])
        .text(d.properties.name)

        textContainer.append('tspan')
        .attr('class','numbers')
        .attr('x',centroid[0])
        .attr('dy','1.2em')
        .text(d['All staff total'])

            //get the dimension of the rect-background based on the space text takes on
        let text = this.parentNode.querySelector('text');
        let box = text.getBBox();
        rectBackground.attr('id','toolTip-background')
        .attr('x',centroid[0]-3)
        .attr('y',centroid[1]-3)
        // .attr('transform',`translate (${-4}, ${margin_top-4})`)
        .attr("width", box.width + 6)
        .attr("height", box.height + 6)
        .style("fill","white")
        .attr('fill-opacity',1)

    }

export function hideToolTip(e,d) {
    //remove the tooltips
    d3.select("#toolTip-text")
    .remove();
    d3.select("#toolTip-background")
    .remove();
    }

// const staff_array = ['HCHS doctors - All grades',
//              'Non doctor clinical staff total','Support to clinical staff total','Infrastructure support total']

