import {csvToHierarchy} from './tranform-data.js';

import {drawSunburst} from './sunburst.js';
import {drawTree} from './tree-chart.js';
import {drawMap} from './world-map.js';

function dataConverter (data) {
  data.forEach(d=> {
  d.staff_numbers = +d.staff_numbers;
  })
  return data;
} 





d3.csv("./data/workforce_hierarchy_complete.csv")
.then(data => {
  const dataset = dataConverter(data)
  const [root, descendants, leaves] = csvToHierarchy(dataset);
  drawTree(root, descendants, leaves)
  drawSunburst(root);

})
.catch(error => console.log(error));

d3.json("./data/geodata_updated.json")
.then(data => {
  console.log('earth')
  console.log(data)
  drawMap(data)
})
.catch(error => console.log(error));
