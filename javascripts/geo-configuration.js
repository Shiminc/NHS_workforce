export const width = 1230*2
export const height = 620*2

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