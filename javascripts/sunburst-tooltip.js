import {geoPathGenerator, width, height} from './geo-configuration.js'
import {colorScaleSunburstTooltip } from './color-data.js' 

// const shorternNameScale = d3.scaleOrdinal(
//     ['Professionally qualified clinical staff','Support Staff','HCHS doctors','Support to clinical staff','NHS infrastructure support','Non-doctor professionally qualified clinical staff'],
//     ['Clinical staff','Support staff','Doctors','Clinical support','Infrastructure support', 'Other clinical staff'])

function removeBreakDown(e,d){
    d3.select("#sunburst-tooltip")
    .remove();

    }

export function showBreakDown(e,d){
    const centroid = geoPathGenerator.centroid(d)
    const country = d['Country or Area']
    const country_total = d['All staff total']
    let data = {'name':'NHS staff',
        'children':[
            {'name':'Clinical staff',
                'children':[{'name':'Doctors',
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
                    {'name':'Other clinical staff',
                        'children':[
                            {'name':'Nurses & health visitors', 'staff number':d['Nurses & health visitors']},
                            {'name':'Midwives','staff number':d['Midwives']},
                            {'name':'Ambulance staff','staff number':d['Ambulance staff']},
                            {'name':'Scientific, therapeutic & technical staff','staff number':d['Scientific, therapeutic & technical staff']}
                        ]
                    }
                ]
            },
            {'name':'Support staff',
                'children':
                    [{'name': 'Clinical support',
                        'children':[
                            {'name':'Support to doctors, nurses & midwives','staff number':d['Support to doctors, nurses & midwives']},
                            {'name':'Support to ambulance staff','staff number':d['Support to ambulance staff']},
                            {'name':'Support to ST&T staff','staff number':d['Support to ST&T staff']}
                        ]},
                     {'name': 'Infrastructure support',
                        'children':[
                            {'name':'Senior managers','staff number':d['Senior managers']},
                            {'name':'Managers','staff number':d['Managers']},
                            {'name':'Central functions','staff number':d['Central functions']},
                            {'name':'Hotel, property & estates','staff number':d['Hotel, property & estates']},

                        ]
                     }
                    ]
                
            },
                
            {'name':'Unknown classification', 'staff number': d['Unknown classification']}

        ]}

    const root =d3.hierarchy(data);
    console.log('root')
    console.log(root)

    const popup_width = 300;
    const popup_height = 300;
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



    const sunburst = d3.select('#svg-map-g').append('g')
        .attr('transform',`translate(${centroid[0]},${centroid[1]})`)
        .attr("id",'sunburst-tooltip')
        .on('mouseleave',removeBreakDown)

    console.log(root_graph.descendants())
    sunburst.selectAll('path')  // <-- 1
    .data(root_graph.descendants())  // <-- 2
    .join('path')  // <-- 4
    .attr("d", arcGenerator) 
    .attr('fill',d=>{
                switch (d.depth){
                    case 1:
                      return colorScaleSunburstTooltip(d.data.name)
                    case 2:
                      return colorScaleSunburstTooltip(d.data.name)
                    case 3:
                      return d3.interpolate(colorScaleSunburstTooltip(d.parent.data.name),'white')(0.5)
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
    .attr('fill',d=>{
        if (d.depth >0 & d.depth <3) return 'white'
        else return 'black'})
    .attr('font-family','sans-serif')
    .attr('font-size','6px')

    label.append('tspan')
    .attr('opacity',d=>{
        if (d.depth <4) return 1
        else return 0})
    .text(d=>{
        if (d.depth == 0) return country
        else if (d.data.name!='Unknown classification') {
            if (d.value/d.parent.value > 0.1) return d.data.name}
        }
    )
    label.append('tspan')
    .attr("x",0)
    .attr("dy","1em")
    .attr('opacity',1)
    .text(d => {
      if (d.depth==0) return country_total
        else if (d.data.name!='Unknown classification') {
            if (d.value/d.parent.value > 0.1) return `${(d.value/d.parent.value * 100).toFixed(1)}%`    
        } 
        }
    )

}

