// chart setting
export const chart_heatmap = {
  'height' : 90,
  'width' : 410
}

export const margin = {
    'horizontal': 20,
    'vertical':20

}

export const chart = {
    'width': `${chart_heatmap.width + margin.horizontal*2}`,
    'height': `${chart_heatmap.height + margin.vertical*2}`,
}

export const svg = d3.select('#logo')
        .append('svg')
            .attr('id','logo')
            .attr('viewBox',`0 0 ${chart.width} ${chart.height}`)
            // .style('border','0.5px solid black');



export const innerChart = svg.append('g')
            .attr('class','innerChart')
            .attr('transform', d=> `translate(${margin.horizontal}, ${margin.vertical})`)


export const ARDcolor = '#e6550d'



export const xScale = d3.scaleLinear()
        .domain([0,41])
        .range([0,chart_heatmap.width])
    
export const yScale = d3.scaleLinear()
        .domain([0,9])
        .range([chart_heatmap.height,0])

// export const colorScale = d3.scaleOrdinal()
//                         .domain([0,8])
//                         .range(d3.schemeOranges[9]);
    

// spell out the domain to make sure the color match one by one rather than the above. if use above, if you have to initiatialise to match the colour by for example console.log
export const colorScale = d3.scaleOrdinal()
                        .domain([0,1,2,3,4,5,6,7,8])
                        .range(d3.schemeOranges[9]);

export function initiatiateColor() {
    //https://stackoverflow.com/questions/32422325/d3-scale-category20-is-too-smart-for-me
    //needed to ensure d3 assign the color correctly. initiatiation if you use the commented colorScale. So better to spell out all the value, so d3 match it.
    console.log('0',colorScale(0))
    console.log('1',colorScale(1))
    console.log('2',colorScale(2))
    console.log('3',colorScale(3))
    console.log('4',colorScale(4))
    console.log('5',colorScale(5))
    console.log('6',colorScale(6))
    console.log('7',colorScale(7))
    console.log('8',colorScale(8))

}

    // function fill_color (d){

    //     if (d.alphabet===1){
    //         console.log(d.y)
    //         console.log(colorScale(d.y))
    //         return colorScale(d.y)
    //     } else {
    //         return 'skyblue'
    //     }
    // }