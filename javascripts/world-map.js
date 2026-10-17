export const drawMap = (geodata) =>{
    const width = 1230*2
    const height = 620*2

    const svg = d3.select("#map-chart")
        .append('svg')
        .attr('viewBox',`0 0 ${width} ${height}`)

    const projection = d3.geoEqualEarth()
        .translate([width/2,height/2])
        .scale(200)

    const geoPathGenerator = d3.geoPath()
    .projection(projection)


    console.log(d3.max(geodata.features.map(d=>d['All staff total'])))
    console.log(geodata.features.map(d=>d['All staff total']))
    const colorScaleQuantile = d3.scaleQuantile(geodata.features.map(d=>d['All staff total']),
        d3.schemeBlues[9])

    const graticuleGenerator = d3.geoGraticule()

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
    

    function showToolTip(e,d){
        const centroid = geoPathGenerator.centroid(d)

        // append the rect first so the rect background won't obscure the text
        let rectBackground=d3.select(this.parentNode).append('rect')

        const textContainer = d3.select(this.parentNode).append('text')
        .attr('id','toolTip-text')
        .attr('x',centroid[0])
        .attr('y',centroid[1])
        .attr('font-size',12)
        .attr('font-family', 'sans-serif')

        textContainer.append('tspan')
        .attr('class','area')
        .attr('dominant-baseline','hanging')
        .text(d['Country or Area'])

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
        // .attr('transform',`translate (${r}, ${-r})`)
        .attr("width", box.width + 6)
        .attr("height", box.height + 6)
        .style("fill","white")
        .attr('fill-opacity',1)

    }
    svg.selectAll('.country-path')
    .data(geodata.features)
    .join('path')
        .attr('class','country-path')
        .attr('d',geoPathGenerator)
        .attr('fill',d => colorScaleQuantile(d['All staff total']))
        .attr('stroke','black')
        .attr('stroke-opacity',0.4)
        .on('mouseenter',showToolTip)
        // .on('mouseleave',hideToolTip)
}