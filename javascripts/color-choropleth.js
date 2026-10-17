export function create_colorScaleQuantile(geodata){
    const geodata_exclude_uk = geodata.features.filter((features_array)=>features_array['Country or Area']!='United Kingdom')
    const colorScaleQuantile = d3.scaleQuantile(geodata_exclude_uk.map(d=>d['All staff total']),  d3.schemeBlues[9])
    return colorScaleQuantile
} 

export function create_colorScaleLog(geodata){
    // const geodata_exclude_0 = geodata.features.filter((features_array)=>features_array['All staff total']>0)
    // const geodata_exclude = geodata_exclude_0.filter((features_array)=>features_array['Country or Area']!='United Kingdom')

    const geodata_exclude = geodata.features.filter((features_array)=>features_array['All staff total']>0)

    const min_value = d3.min(geodata_exclude.map(d=>d['All staff total']))
    const max_value = d3.max(geodata_exclude.map(d=>d['All staff total']))
    const scaleLog = d3.scaleLog().domain([min_value,max_value])

    const countryColorScale = d3.scaleSequential(d3.interpolateBlues)
    .domain([min_value,max_value])

    const colorScalelog = d3.scaleSequential(d3.interpolateBlues)
        .domain([scaleLog(min_value),scaleLog(max_value)])
    return [colorScalelog,scaleLog,countryColorScale]
} 

