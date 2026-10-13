import {createHeatmap} from './viz_heatmap.js'
import {createAxis} from './create_axis.js'
import {createA} from './viz_A.js'
import {createR} from './viz_R.js'
import {createD} from './viz_D.js'
import {createPoint} from './viz_point.js'

d3.json('./data/viz_coordinates.json').then(
  dataset => {
  const heatmap_data = dataset.filter(
                data => (data.heatmap == 1));
  const data_A = dataset.filter(
                data => (data.alphabet == 'A'));
  const data_R = dataset.filter(
                data => (data.alphabet == 'R'));
  const data_D = dataset.filter(
                data => (data.alphabet == 'D'));

  const point_data = dataset.filter(
                data => (data.heatmap == 0));
  
  // put any function here
   createHeatmap(heatmap_data)
   createAxis()
   createA(data_A)
   createR(data_R)
   createD(data_D)
   createPoint(point_data)


 })
.catch(error => console.log(error));