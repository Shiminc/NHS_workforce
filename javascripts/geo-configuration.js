import {colorScaleFurther } from './color-data.js' 

export const width = 1230
export const height = 620

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
        let rectBackground=d3.select('#svg-map').append('rect')

        const textContainer = d3.select('#svg-map').append('text')
        .attr('id','toolTip-text')
        .attr('x',centroid[0])
        .attr('y',centroid[1])
        .attr('font-size',12)
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
        // .attr('transform',`translate (${r}, ${-r})`)
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


export function showBreakDown(e,d){
    const centroid = geoPathGenerator.centroid(d)
    let data = {'name':'NHS staff',
        'children':[
            {'name':'Professionally qualified clinical staff',
                'children':[{'name':'HCHS doctors',
                    'children':[
                        {'name':'Consultant','staff number':d['HCHS doctors - Consultant']},
                        {'name':'Specialty Registrar','staff number':d['HCHS doctors - Specialty Registrar']},
                        {'name':'Core Training','staff number':d['HCHS doctors - Core Training']},
                        {'name':'Specialty Doctor','staff number':d['HCHS doctors - Specialty Doctor']},
                        {'name':'Foundation Doctor Year 2','staff number':d['HCHS doctors - Foundation Doctor Year 2']},
                        {'name':'Foundation Doctor Year 1','staff number':d['HCHS doctors - Foundation Doctor Year 1']},
                        {'name':'Associate Specialist','staff number':d['HCHS doctors - Associate Specialist']},
                        {'name':'Staff Grade','staff number':d['HCHS doctors - Staff Grade']},
                        {'name':'Hospital Practitioner/Clinical Assistant','staff number':d['Hospital Practitioner / Clinical Assistant']},
                        {'name':'Other HCHS Doctor Grades','staff number':d['HCHS doctors - Other HCHS Doctor Grades']},


                    ]
                },
                    {'name':'Non-doctor professionally qualified clinical staff',
                        'children':[
                            {'name':'Nurses & health visitors', 'staff number':d['Nurses & health visitors']},
                            {'name':'Midwives','staff number':d['Midwives']},
                            {'name':'Ambulance staff','staff number':d['Ambulance staff']},
                            {'name':'Scientific, therapeutic & technical staff','staff number':d['Scientific, therapeutic & technical staff']}
                        ]
                    }
                ]
            },
            {'name':'Support Staff',
                'children':
                    [{'name': 'Support to clinical staff',
                        'children':[
                            {'name':'Support to doctors, nurses & midwives','staff number':d['Support to doctors, nurses & midwives']},
                            {'name':'Support to ambulance staff','staff number':d['Support to ambulance staff']},
                            {'name':'Support to ST&T staff','staff number':d['Support to ST&T staff']}
                        ]},
                     {'name': 'NHS infrastructure support',
                        'children':[
                            {'name':'Senior managers','staff number':d['Senior managers']},
                            {'name':'Managers','staff number':d['Managers']},
                            {'name':'Central functions','staff number':d['Central functions']},
                            {'name':'Hotel, property & estates','staff number':d['Hotel, property & estates']},

                        ]
                     }
                    ]
                
            },
                
            {'name':' Unknown classification', 'staff number': d['Unknown classification']}

        ]}

    const root =d3.hierarchy(data);
    const descendants = root.descendants();
    const leaves = root.leaves(); 
    console.log('root')
    console.log(root)

    const popup_width = 500;
    const popup_height = 500;
    const radius = Math.min(popup_width,popup_height) / 2;

    const root_sun = root
    root_sun.sum(d=>d['staff number'])
    root_sun.sort((a,b)=>b.value-a.value)
    console.log(root_sun)

    // Compute the partition layout. Note polar coordinates: x is angle and y is radius.
    const radialPartition = d3.partition()
             .size([2*Math.PI,radius])
    const root_graph = radialPartition(root_sun)

        // Construct an arc generator.
    const arcGenerator = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(0.005)
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1);

    console.log(colorScaleFurther('Support Staff'))
    const sunburst = d3.select('#svg-map').append('g')
        .attr('transform',`translate(${centroid[0]},${centroid[1]})`)
        .attr("id",'sunburst-chart')
    
    console.log(root_graph.descendants())
    sunburst.selectAll('path')  // <-- 1
    .data(root_graph.descendants())  // <-- 2
    .join('path')  // <-- 4
    .attr("d", arcGenerator) 
    .attr('fill',d=>{
        console.log(d.id)
                switch (d.depth){
                    case 1:
                      return colorScaleFurther(d.data.name)
                    case 2:
                      return colorScaleFurther(d.data.name)
                    case 3:
                      return d3.interpolate(colorScaleFurther(d.parent.data.name),'white')(0.5)
                    default:
                        return "white"
                }
})
    const label = sunburst.selectAll("text")
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
    .attr('text-rendering','optimizeLegibility')
    .attr('text-anchor','middle')
    .attr('dominant-baseline','middle')
    .attr('fill','black')
    .attr('font-family','sans-serif')
    .attr('font-size','18px')
    .text(d=>{
      if (d.data.name == 'Hospital Practitioner / Clinical Assistant' ||d.data.name == 'Other HCHS Doctor Grades'||d.data.name == 'Staff Grade'||d.data.name=='Unknown classification') return '';
      else if (d.value<9000 & d.value>3000) return `${d.data.name}: ${(d.value/d.parent.value * 100).toFixed(1)}%`
      else return d.data.name})
    .append('tspan')
    .attr("x",0)
    .attr("dy","1em")
    .text(d => {
      if (!d.depth) return `${d.value}`
      else if (d.data.name == 'Hospital Practitioner / Clinical Assistant' ||d.data.name == 'Other HCHS Doctor Grades'||d.data.name == 'Staff Grade'||d.data.name=='Unknown classification') return '';
      else if (d.value<9000 & d.value>3000) return ''

      return `${(d.value/d.parent.value * 100).toFixed(1)}%`
    })

}