import {colorScaleFurther} from './color-data.js' 

export const drawTree = (root, descendants, leaves) => {
    const width = 2000;
    const height = 750;
    const margin = {
        top: 20, 
        right: 800,
        bottom: 20, 
        left: 500
    }
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

 
    // normal tree
    // const treeLayoutGenerator = d3.tree()
    //     .size([innerWidth, innerHeight]);
    
    // dendogram
    const treeLayoutGenerator = d3.cluster()
        .size([innerWidth, innerHeight/2])
    treeLayoutGenerator(root);
    // console.log('tree')
    // console.log(root)
    // console.log(root.links())
    // console.log(descendants)

    const linkGenerator = d3.link(d3.curveBumpY)
    // for horizontal tree
    .x((d)=>d.y)
    .y((d)=>d.x)

    // start drawing
    const svg = d3.select("#tree-chart")
                .append('svg')
                    .attr('viewBox',`0 0 ${width} ${height}`)
                .append('g')
                    .attr('transform',`translate(${margin.left},${margin.top})`)

    // draw tree branch
    svg.selectAll('.tree-link')
    .data(root.links())
    .join('path')
        .attr('class','tree-link')
        .attr('d',d=>linkGenerator(d))
        .attr('fill','none')
        .attr('stroke',d=>colorScaleFurther(d.source))
        .attr('stroke-opacity',0.6)
        .attr('stroke-width',2)

    // add labels
    svg.selectAll('.label-tree')
    .data(descendants)
    .join('text')
        .attr('class','label-tree')
        .attr('x', d => d.children ? d.y-2 : d.y+2)
        .attr('y', d => d.x)
        .attr('text-anchor', d => d.children ? 'end':'start')
        .attr('alignment-baseline','middle')
        .style('font-size','16px')
        .text(d =>d.id)
        // add white storke behind text so to cover the path the word is on
        .attr('paint-order','stroke')
        .attr('stroke','white')
        .attr('stroke-width',5)

    // add nodes
    svg.selectAll('.node-tree')
    .data(descendants)
    .join('circle')
    .attr('class','node-tree')
    .attr('cx',d=>d.y)
    .attr('cy',d=>d.x)
    .attr('r', 1)
    .attr('fill',d=>colorScaleFurther(d.parent)) 
    
    console.log(leaves)
    console.log(d3.max(leaves.map(d=>d.data.staff_numbers)))
    const xScale = d3.scaleLinear()
        .domain([0,d3.max(leaves.map(d=>d.data.staff_numbers))])
        .range([0,innerWidth/2]);
    // add bars
    svg.selectAll('.leave-bar')
    .data(leaves)
    .join('rect')
    .attr('class','.leave-bar')
    .attr('x',d=>d.y + 300)
    .attr('y',d=>d.x - 10)
    .attr('width', d => xScale(d.data.staff_numbers))
    .attr('height', '20px')
    .attr('fill',d=>colorScaleFurther(d.data.parent) )

    // add label
    svg.selectAll('.leave-bar')
    .data(leaves)
    .join('text')
    .attr('class','.bar-value')
    .attr('x',d=>d.y + 300 + xScale(d.data.staff_numbers) + 20)
    .attr('y',d=>d.x +5)
    .text(d=>d.data.staff_numbers) 
    .style('font-size','16px')
    .attr('alignment-baseline','middle')

}