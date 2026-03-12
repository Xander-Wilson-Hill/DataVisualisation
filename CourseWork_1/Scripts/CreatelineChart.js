// Set dimensions and margins for the chart

const margin = { top: 70, right: 30, bottom: 40, left: 80};
const width = 1200 -margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Set up the x and y scales

const x = d3.scaleTime()
    .range([0, width]);

const y = d3.scaleLinear()
    .range([height, 0]);

// Create the SVG element and append it to the chart container

const svg = d3.select("#LineChart")
    .append("svg")
        .attr("width", width +margin.left + margin.right)
        .attr("height", height + margin.top +margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// Dataset stuffs

d3.csv("Datasets/TimeAgainstTotal.csv").then(function (data) {

    const parseDate = d3.timeParse("%Y");
    data.forEach(d => {
    d.Year = parseDate(d.Year);
    d.Total = +d.Total;
});


// Define the x and y domains

x.domain(d3.extent(data, d => d.Year));
y.domain([0, d3.max(data, d => d.Total)]);


// add x axis

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x)
    .ticks(d3.timeYear.every(1))
    .tickFormat(d3.timeFormat("%Y")))


// add y axis

svg.append("g")
    .call(d3.axisLeft(y)
    .ticks((d3.max(data, d => d.Total))))




// gridlines
    //vertical
    svg.selectAll("xGrid")
    .data(x.ticks().slice(1))
    .join("line")
    .attr("x1", d => x(d))
    .attr("x2", d => x(d))
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "#e0e0e0")
    .attr("stroke-width", 1);

    //Horizontal
    svg.selectAll("yGrid")
    .data(y.ticks((d3.max(data, d => d.total))).slice(1))
    .join("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", d => y(d))
    .attr("y2", d => y(d))
    .attr("stroke", "#e0e0e0")
    .attr("stroke-width", 1);

// Create the line generator 

const line = d3.line()
    .x(d => x(d.Year))
    .y(d => y(d.Total));

// Add the line path to the svg element

svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1)
    .attr("d", line)

});

