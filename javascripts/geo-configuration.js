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
            {'name':'Support staff',
                'children':
                    [{'name': 'Support to clinical staff',
                        'children':[
                            {'name':'Support to doctors, nurses & midwives','staff number':d['Support to doctors, nurses & midwives']},
                            {'name':'Support to ambulance staff','staff number':d['Support to ambulance staff']},
                            {'name':'Support to ST&T staff','staff number':d['Support to ST&T staff']}
                        ]},
                     {'name': 'NHS Infrastructure support',
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
    console.log(root)

    //         data[key] = (d[key])
    //     )
    
    
}