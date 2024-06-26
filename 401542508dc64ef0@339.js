import define1 from "./a33468b95d0b15b0@817.js";

function _1(swatches,chart){return(
swatches({color: chart.scales.color})
)}

function _chart(data,d3,brush)
{

  // Specify the chart’s dimensions.
  const width = 928;
  const height = width;
  const padding = 28;
  const columns = data.columns.filter(d => typeof data[0][d] === "number");
  const size = (width - (columns.length + 1) * padding) / columns.length + padding;

  // Define the horizontal scales (one for each row).
  const x = columns.map(c => d3.scaleLinear()
      .domain(d3.extent(data, d => d[c]))
      .rangeRound([padding / 2, size - padding / 2]))

  // Define the companion vertical scales (one for each column).
  const y = x.map(x => x.copy().range([size - padding / 2, padding / 2]));

  // Define the color scale.
  const color = d3.scaleOrdinal()
      .domain(data.map(d => d.test_preparation_course))
      .range(d3.schemeCategory10);

  // Define the horizontal axis (it will be applied separately for each column).
  const axisx = d3.axisBottom()
      .ticks(6)
      .tickSize(size * columns.length);
  const xAxis = g => g.selectAll("g").data(x).join("g")
      .attr("transform", (d, i) => `translate(${i * size},0)`)
      .each(function(d) { return d3.select(this).call(axisx.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));

  // Define the vertical axis (it will be applied separately for each row).
  const axisy = d3.axisLeft()
      .ticks(6)
      .tickSize(-size * columns.length);
  const yAxis = g => g.selectAll("g").data(y).join("g")
      .attr("transform", (d, i) => `translate(0,${i * size})`)
      .each(function(d) { return d3.select(this).call(axisy.scale(d)); })
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
  
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-padding, 0, width, height]);

  svg.append("style")
      .text(`circle.hidden { fill: #000; fill-opacity: 1; r: 1px; }`);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const cell = svg.append("g")
    .selectAll("g")
    .data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
    .join("g")
      .attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);

  cell.append("rect")
      .attr("fill", "none")
      .attr("stroke", "#aaa")
      .attr("x", padding / 2 + 0.5)
      .attr("y", padding / 2 + 0.5)
      .attr("width", size - padding)
      .attr("height", size - padding);

  cell.each(function([i, j]) {
    d3.select(this).selectAll("circle")
      .data(data.filter(d => !isNaN(d[columns[i]]) && !isNaN(d[columns[j]])))
      .join("circle")
        .attr("cx", d => x[i](d[columns[i]]))
        .attr("cy", d => y[j](d[columns[j]]));
  });

  const circle = cell.selectAll("circle")
      .attr("r", 3.5)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(d.test_preparation_course));

  // Ignore this line if you don't need the brushing behavior.
  cell.call(brush, circle, svg, {padding, size, x, y, columns});

  svg.append("g")
      .style("font", "bold 10px sans-serif")
      .style("pointer-events", "none")
    .selectAll("text")
    .data(columns)
    .join("text")
      .attr("transform", (d, i) => `translate(${i * size},${i * size})`)
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(d => d);

  svg.property("value", [])
  return Object.assign(svg.node(), {scales: {color}});
}


function _selection(Generators,chart){return(
Generators.input(chart)
)}

function _brush(d3,data){return(
function brush(cell, circle, svg, {padding, size, x, y, columns}) {
  const brush = d3.brush()
      .extent([[padding / 2, padding / 2], [size - padding / 2, size - padding / 2]])
      .on("start", brushstarted)
      .on("brush", brushed)
      .on("end", brushended);

  cell.call(brush);

  let brushCell;

  // Clear the previously-active brush, if any.
  function brushstarted() {
    if (brushCell !== this) {
      d3.select(brushCell).call(brush.move, null);
      brushCell = this;
    }
  }

  // Highlight the selected circles.
  function brushed({selection}, [i, j]) {
    let selected = [];
    if (selection) {
      const [[x0, y0], [x1, y1]] = selection; 
      circle.classed("hidden",
        d => x0 > x[i](d[columns[i]])
          || x1 < x[i](d[columns[i]])
          || y0 > y[j](d[columns[j]])
          || y1 < y[j](d[columns[j]]));
      selected = data.filter(
        d => x0 < x[i](d[columns[i]])
          && x1 > x[i](d[columns[i]])
          && y0 < y[j](d[columns[j]])
          && y1 > y[j](d[columns[j]]));
    }
    svg.property("value", selected).dispatch("input");
  }

  // If the brush is empty, select all circles.
  function brushended({selection}) {
    if (selection) return;
    svg.property("value", []).dispatch("input");
    circle.classed("hidden", false);
  }
}
)}

function _data(FileAttachment){return(
FileAttachment("StudentsPerformance@1.csv").csv({typed: true})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["StudentsPerformance@1.csv", {url: new URL("39a87bf3149c1a29507668bf163c109504b07ce6833d71cb600f0016016282d6df4eae19cf020d4726d2c05d86422aa2676a73b6f6d0446932819e3fd4b807d3.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["swatches","chart"], _1);
  main.variable(observer("chart")).define("chart", ["data","d3","brush"], _chart);
  main.variable(observer("selection")).define("selection", ["Generators","chart"], _selection);
  main.variable(observer("brush")).define("brush", ["d3","data"], _brush);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  const child1 = runtime.module(define1);
  main.import("swatches", child1);
  return main;
}
