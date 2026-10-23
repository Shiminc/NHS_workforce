export const roleRenameColor = [
    {'role':'Non doctor clinical staff total','rename':'Other clinical staff','color': '#0083c0'},
    {'role':'HCHS doctors - All grades','rename':'Doctors','color': '#4d6b03'},
    {'role':'Support to clinical staff total', 'rename':'Clinical support','color': '#7a4f99'},
    {'role':'Infrastructure support total','rename':'Infrastructure support','color': '#ef527a'},	
]

export const colorScale = d3.scaleOrdinal()
    .domain(roleRenameColor.map(d=>d.role))
    .range(roleRenameColor.map(d=>d.color))

export const renameScale = d3.scaleOrdinal()
    .domain(roleRenameColor.map(d=>d.role))
    .range(roleRenameColor.map(d=>d.rename))    

export const countryColorScale = d3.scaleOrdinal()
    .domain(['Malaysia','Philippines', 'Myanmar','Romania', 'Poland', 'Ireland','Portugal', 'Italy', 'Bangladesh', 'Sri Lanka',  'Pakistan', 'India', 'Egypt',  'Nigeria','Sudan','Ghana', 'Zimbabwe','Other', 'United Kingdom'])
    .range(['#1F77B4','#AEC7E8','#7F7F7F','#FF7F0E','#FFBB7B','#2CA02C','#98DF8A','#17BECF','#D62728','#FF9896','#9467BD','#C5B0D5','#8C564B','#E377C2','#F7B6D2','#BCBD22','#DBDB8D','#C7C7C7','white'])

export const drawMarimekko = (data) =>{
    console.log('marimekko',data)
    const width = 1000;
    const height = 800;
    const margin = {
        top: 20, 
        right: 50,
        bottom: 20, 
        left: 50
    }
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;


    const sum = d3.sum(data.map(d=>d.total))
    
    // const outsideData = data
    //     .map(({ staff, total }) => ({ staff, total, 
    //         proportion:(total/sum).toFixed(2),
    //         height:innerHeight*(total/sum).toFixed(2)}))
    //     // .sort((a,b) => b.total - a.total)
    
    //     console.log(outsideData)
    
    let currentY = 0
    let currentX = 0
    data.forEach((e) =>{
        e.proportion = parseFloat(e.total/sum)
        e.height = parseFloat(innerHeight*e.proportion) 
        e.y0 = currentY
        e.y1 = currentY + e.height
        currentY = currentY + e.height

        currentX = 0
        e.data.forEach((country_row) =>{
            country_row.proportion = parseFloat(country_row.number/e.total)
            country_row.width = parseFloat(country_row.proportion * innerWidth)
            country_row.x0 = currentX
            country_row.x1 = country_row.x0 + country_row.width
            currentX =  currentX + country_row.width
        })
    })
    

    const svg = d3.select("#marimekko-chart")
                .append('svg')
                    .attr('viewBox',`0 0 ${width} ${height}`)
                .append('g')
                    .attr('transform',`translate(${margin.left},${margin.top})`)


    data.forEach((staff_type)=>{
        let uk_number = staff_type.data[0]
        svg
            .selectAll(`.bar-${renameScale(staff_type.staff)}`)
            .data(staff_type.data)
            .join('rect')
                .attr('class',d=>`bar-${renameScale(staff_type.staff)} bar-${d['Country or Area']}`)
                .attr('x',d=>d.x0)
                .attr('y',staff_type.y0)
                .attr('width', d=>d.width)
                .attr('height', staff_type.height)
                .attr('fill',d=>countryColorScale(d['Country or Area']))
                .attr('stroke',colorScale(staff_type.staff))
        
                
        svg.append('text')
                .attr('x',20)
                .attr('y',staff_type.y0 +20)
                .text(`${renameScale(staff_type.staff)}: ${staff_type.total}`)
                .style('dominant-baseline','hanging')
                .attr('font-family','sans-serif')
                .attr('font-size','25px')
        svg.append('text')
                .attr('x',20)
                .attr('y',staff_type.y0 + 50)
                .text(`${(uk_number.proportion*100).toFixed(2)}% from United Kingdom`)
                .style('dominant-baseline','hanging')
                .attr('font-family','sans-serif')
                .attr('font-size','15px')

    })
        

}

