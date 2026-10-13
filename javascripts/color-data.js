export const roleColor = [
    // {'role':'Other professionally qualified clinical staff','color': '#003f5c'},
    {'role':'Other professionally qualified clinical staff','color': '#0083c0'},
    {'role':'HCHS doctors','color': '#4d6b03'},
    {'role':'Support to clinical staff','color': '#7a4f99'},
    {'role':'NHS infrastructure support','color': '#ef527a'},	
    {'role':'Unknown classification','color': '#ffa600'},
    {'role':'Professionally qualified clinical staff','color': '#003f5c'},
				

]

export const colorScale = d3.scaleOrdinal()
    .domain(roleColor.map(d=>d.role))
    .range(roleColor.map(d=>d.color))

export const roleColorFurther = [
    {'role': 'Support Staff','color':'#ffa600'},
    {'role':'Professionally qualified clinical staff','color': '#c7c7c7'},
    {'role':'Non-doctor professionally qualified clinical staff','color': '#0083c0'},
    {'role':'HCHS doctors','color': '#4d6b03'},
    {'role':'Support to clinical staff','color': '#7a4f99'},
    {'role':'NHS infrastructure support','color': '#ef527a'},	
    {'role':'Unknown classification','color': '#ffa600'},
]

export const colorScaleFurther = d3.scaleOrdinal()
    .domain(roleColorFurther.map(d=>d.role))
    .range(roleColorFurther.map(d=>d.color))