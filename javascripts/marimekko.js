const roleRenameColor = [
    {'role':'Non doctor clinical staff total','rename':'Other clinical staff','color': '#0083c0'},
    {'role':'HCHS doctors - All grades','rename':'Doctors','color': '#4d6b03'},
    {'role':'Support to clinical staff total', 'rename':'Clinical support','color': '#7a4f99'},
    {'role':'Infrastructure support total','rename':'Infrastructure support','color': '#ef527a'},	
]

const colorScale = d3.scaleOrdinal()
    .domain(roleRenameColor.map(d=>d.role))
    .range(roleRenameColor.map(d=>d.color))

const renameScale = d3.scaleOrdinal()
    .domain(roleRenameColor.map(d=>d.role))
    .range(roleRenameColor.map(d=>d.rename))    

const countryColorScale = d3.scaleOrdinal()
    .domain(['Malaysia','Philippines', 'Myanmar','Romania', 'Poland', 'Ireland','Portugal', 'Italy', 'Bangladesh', 'Sri Lanka',  'Pakistan', 'India', 'Egypt',  'Nigeria','Sudan','Ghana', 'Zimbabwe','Other', 'United Kingdom'])
    .range(['#1F77B4','#AEC7E8','#7F7F7F','#FF7F0E','#FFBB7B','#2CA02C','#98DF8A','#17BECF','#D62728','#FF9896','#9467BD','#C5B0D5','#8C564B','#E377C2','#F7B6D2','#BCBD22','#DBDB8D','#C7C7C7','white'])

export function hideToolTip(e,d) {
    //remove the tooltips
    d3.select("#toolTip-text")
    .remove();
    d3.select("#toolTip-background")
    .remove();
    }

export function showToolTip(e,d){
    if (d['Country or Area']!='United Kingdom'){
        const position_y = e.target.getAttribute('y')

        console.log(parseFloat(position_y))
        const [mouseX, mouseY] = d3.pointer(e, this);

        let rectBackground=d3.select('#marimekko-svg-g').append('rect')
        .attr('rx','0.3%')

        const textContainer = d3.select('#marimekko-svg-g').append('text')
        .attr('id','toolTip-text')
        .attr('x',d.x0 + 2)
        .attr('y',parseFloat(position_y) + 2)
        .attr('font-size',10)
        .attr('font-family', 'sans-serif')
        .attr('dominant-baseline','hanging')
        
        textContainer.append('tspan')
        // .attr('y',position_y + 15)
        .text(d['Country or Area'])

        textContainer.append('tspan')
        .attr('x',d.x0 + 2)
        .attr('dy','1.3em')
        .text(`${(d['proportion']*100).toFixed(2)}%`)


        let text = this.parentNode.querySelector('#toolTip-text');
        let box = text.getBBox();
        rectBackground.attr('id','toolTip-background')
        .attr('x',d.x0)
        .attr('y',parseFloat(position_y)+1)
        .attr("width", box.width + 3)
        .attr("height", box.height)
        .style("fill","white")
        .attr('fill-opacity',1)
    }
    }

export const drawMarimekko = (data) =>{
    const width = 1000;
    const height = 400;
    const margin = {
        top: 20, 
        right: 50,
        bottom: 20, 
        left: 180
    }
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;


    const sum = d3.sum(data.map(d=>d.total))
    
    // calculate position of each square and update in the data
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
                    .attr('id','marimekko-svg-g')

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
                .attr('stroke','black')
                .on('mouseenter',showToolTip)
                .on('mouseleave',hideToolTip)

        svg.append('text')
                .attr('x',-20)
                .attr('y',staff_type.y0 +20)
                // .text(`${renameScale(staff_type.staff)}: ${staff_type.total}`)
                .text(`${renameScale(staff_type.staff)}`)
                .style('dominant-baseline','hanging')
                .attr('font-family','sans-serif')
                .attr('font-size','15px')
                .attr('text-anchor','end')

        svg.append('text')
                .attr('x',20)
                .attr('y',staff_type.y0 + 20)
                .text(`${(uk_number.proportion*100).toFixed(2)}% from United Kingdom`)
                .style('dominant-baseline','hanging')
                .attr('font-family','sans-serif')
                .attr('font-size','15px')

    })
        

}

