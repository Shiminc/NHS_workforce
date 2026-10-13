import {colorScale,colorScaleFurther } from './color-data.js' 

export const drawSunburst = (root) => {
    
  
    const width = 200;
    const height = 200;
    const radius = Math.min(width,height) / 2;

    console.log('radius')
    console.log(radius)
    const root_sun = root
    root_sun.sum(d=>d.staff_numbers)
    root_sun.sort((a,b)=>b.value-a.value)
    console.log('root_sun')
    console.log(root_sun)
    // the root has already been passed through hierarchy() in tranform-data
    console.log('hierarchy.height')
    console.log(root_sun.height)

    // Compute the partition layout. Note polar coordinates: x is angle and y is radius.
    const radialPartition = d3.partition()
             .size([2*Math.PI,radius])
    const root_graph = radialPartition(root_sun)
    console.log('root_graph')
    console.log(root_graph)
    // x0 = starting angle in radians
    // x1 = ending angle in radians
    // y0 = inner radius
    // y1 = outer radius


    // Construct an arc generator.
    const arcGenerator = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(0.005)
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1);

    const svg = d3.select("#sunburst-chart")
        .append("svg")
        .attr("id",'svg-sunburst-chart')
        .attr("viewBox",`0 0 ${width} ${height}`)


    const whole_group = svg.append('g')
        .attr('transform',`translate(${width/2},${height/2})`)
 
    whole_group.selectAll('path')  // <-- 1
    .data(root_graph.descendants())  // <-- 2
    .join('path')  // <-- 4
    .attr("d", arcGenerator)  // <-- 6
    // .attr('fill',d=>{
    //             switch (d.depth){
    //                 case 1:
    //                   return colorScale(d.id)
    //                 case 2:
    //                   return d3.interpolate(colorScale(d.parent.id),'white')(0.5)
    //                 default:
    //                     return "white"
    //             }
    //     })
    .attr('fill',d=>{
                switch (d.depth){
                    case 1:
                      return colorScaleFurther(d.id)
                    case 2:
                      return colorScaleFurther(d.id)
                    case 3:
                      return d3.interpolate(colorScaleFurther(d.parent.id),'white')(0.5)
                    default:
                        return "white"
                }
})

    const label = whole_group.selectAll("text")
    .data(root_graph.descendants())
    .join("text")
    .attr("transform", (d) => {
      // except base node
      // dont understand how the math works
      if (!d.depth) return;
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${
        x < 180 ? 0 : 180
      })`;
    })
    // .attr('transform', function(d){
    //     return `translate(${arcGenerator.centroid(d)}) rotate(270) `
    //                         // return `rotate(${arcGenerator.centroid(d)[0]-90}) translate(${arcGenerator.centroid(d)[1]},0) 
    //                 // rotate (${arcGenerator.centroid(d)[0] < 180 ? 0: 180})`
    //             })
    // .attr('transform', function(d){
    //                 return `translate(${arcGenerator.centroid(d)})`
    //             })
    .attr('text-rendering','optimizeLegibility')
    .attr('text-anchor','middle')
    .attr('dominant-baseline','middle')
    .attr('fill','black')
    .attr('font-family','sans-serif')
    .attr('font-size','1.8px')
    .text(d=>{
      if (d.id == 'Hospital Practitioner / Clinical Assistant' ||d.id == 'Other HCHS Doctor Grades'||d.id == 'Staff Grade'||d.id=='Unknown classification') return '';
      else if (d.value<9000 & d.value>3000) return `${d.id}: ${(d.value/d.parent.value * 100).toFixed(1)}%`
      else return d.id})
    .append('tspan')
    .attr("x",0)
    .attr("dy","1em")
    .text(d => {
      if (!d.depth) return `${d.value}`
      else if (d.id == 'Hospital Practitioner / Clinical Assistant' ||d.id == 'Other HCHS Doctor Grades'||d.id == 'Staff Grade'||d.id=='Unknown classification') return '';
      else if (d.value<9000 & d.value>3000) return ''

      return `${(d.value/d.parent.value * 100).toFixed(1)}%`
    })

}
