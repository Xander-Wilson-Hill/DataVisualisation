'use strict';

let barContainer = d3.select('div#bar1');
let bubbleContainer = d3.select('div#bubble1');

let barSvg = barContainer.append('svg')
	.attr('width', 800)
	.attr('height', 500)
	.classed('barchart', true);

let bubbleSvg = bubbleContainer.append('svg')
	.attr('width', 800)
	.attr('height', 500)
	.classed('bubblechart', true);


let dogs = [{breed:'Golden Retriever', count:8653, weight: 39.5, height: 56},
	{breed:'Alaskan Malamute', count:261, weight: 36, height: 61},
	{breed:'Newfoundland', count:577, weight: 67.5, height: 68.5},
	{breed:'Siberian Husky', count:391, weight: 21.5, height: 55.5},
	{breed:'Shiba Inu', count:434, weight: 9, height: 38},
	{breed:'Keeshond', count:82, weight: 17.5, height: 44},
	{breed:'Australian Shepherd', count:255, weight: 24, height: 52},
	{breed:'Border Collie', count:1718, weight: 16, height: 51},
	{breed:'German Shepherd', count:7067, weight: 31, height: 60},
	{breed:'Swiss Shepherd', count:110, weight: 32.5, height: 60.5}]



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
	