export const drawMap = (world) =>{
    const width = 1230
    const height = 620

    const svg = d3.select("#world-map")
        .append('svg')
        .attr('viewBox',`0 0 ${width} ${height}`)

    const projection = d3.geoEqualEarth()
        .translate([width/2,height/2])
        .scale(200)

    const geoPathGenerator = d3.geoPath()
    .projection(projection)

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
    

    svg.selectAll('.country-path')
    .data(world.features)
    .join('path')
        .attr('class','country-path')
        .attr('d',geoPathGenerator)
        .attr('fill','white')
        .attr('stroke','black')
        .attr('stroke-opacity',0.4)
}