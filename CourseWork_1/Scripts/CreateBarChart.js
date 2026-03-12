'use strict';

let barContainer = d3.select('div#bar1');

let barSvg = barContainer.append('svg')
	.attr('width', 800)
	.attr('height', 500)
	.classed('barchart', true);


d3.csv("Datasets/TimeAgainstTotal.csv").then(function (data) {

    const parseDate = d3.timeParse("%Y");
    data.forEach(d => {
    d.Year = parseDate(d.Year);
    d.Total = +d.Total;});
	


let bars = barSvg.selectAll('rect.bar')
	.data(dogs, d=>d.breed)
	.join('rect')
	.classed('bar', true)
	.attr('x', (d, i)=>i*40+5)
	.attr('y', (d, i)=>500-(d.count*0.25))
	.attr('height', d=>d.count*0.25)
	.attr('width', 40)
	.style('fill', d=>d.count<400?'#ba4a53':null)
	.style('stroke', d=>d.count<400?'#381619':null);

	})