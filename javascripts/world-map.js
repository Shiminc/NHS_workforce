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
    

    svg.selectAll('.country-path')
    .data(geodata.features)
    .join('path')
        .attr('class','country-path')
        .attr('d',geoPathGenerator)
        .attr('fill',d => colorScaleQuantile(d['All staff total']))
        .attr('stroke','black')
        .attr('stroke-opacity',0.4)
}