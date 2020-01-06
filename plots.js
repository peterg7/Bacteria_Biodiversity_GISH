function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  // initialize page with first subject loaded
  optionChanged(sampleNames[0]);
})
}

// called by 'onchange' in index.html
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    //PANEL.append("h6").text(result);
    Object.entries(result).forEach(([key, value]) =>
      {PANEL.append("h6").text(key.toUpperCase() + ': ' + value);});
  });
}

function buildCharts(sample) {
  // Create a Bar Chart
  d3.json("samples.json").then((data) => {
    var species = data.samples.filter(sampleObj => sampleObj.id == sample)[0];
    var topTenValues = species.sample_values.slice(0,10);
    var topTenIDs = species.otu_ids.slice(0,10).map(id => "OTU " + id);
    var topTenLabels = species.otu_labels.slice(0,10);

    var trace = {
      x: topTenValues.reverse(),
      y: topTenIDs.reverse(),
      mode: 'markers',
      text: topTenLabels.reverse(),
      type: "bar",
      orientation: "h"
    };
    var data = [trace];
    Plotly.newPlot("bar", data);
  });

  // Create Bubble Chart
  d3.json("samples.json").then((data) => {
    var species = data.samples.filter(sampleObj => sampleObj.id == sample)[0];
    var otu_ids = species.otu_ids;
    var sample_vals = species.sample_values;
    var labels = species.otu_labels;

    var desired_maximum_marker_size = 40;
    var size = sample_vals.map(num => num * 20);

    var trace = {
      x: otu_ids,
      y: sample_vals,
      text: labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale: [[0, 'rgb(0,0,255)'], [1,'rgb(255,0,0)']],
        size: size,
        sizeref: 2.0 * Math.max(sample_vals) / (desired_maximum_marker_size ** 2),
        sizemode: 'area'
      }

    }

    var data = [trace];
    var layout = {
      xaxis: { title: "OTU ID" } 
    };

    Plotly.newPlot("bubble", data, layout)
  });

  // Create Gauge Chart
  d3.json("samples.json").then((data) => {
    var washes = data.metadata.filter(sampleObj => sampleObj.id == sample)[0].wfreq;
    console.log(washes);
    var trace = {
      type: "pie",
      hole: 0.4,
      rotation: 90,
      showlegend: false,
      values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
      text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      direction: 'clockwise',
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ['','','','','','','','','','white'],
      },
      labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9', ''],
      hoverinfo: "label"
    };

    var h = 0.5, k = 0.5;
    var degrees = (180/10 * washes), radius = .3;
    var radians = degrees * Math.PI / 180;
    var x = -1 * radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    

    var layout = {
      shapes: [{
        type: 'line',
        x0: h,
        y0: k,
        x1: h + x,
        y1: k + y,
        line: {
          color: 'black',
          width: 3
        }
      }],
      title: "Belly Button Washing Frequency",
      xaxis: {visible: false, range: [-1, 1]},
      yaxis: {visible: false, range: [-1, 1]},
      annotations: [{
        text: "Scrubs per Week",
          font: {
          size: 13,
          color: 'rgb(116, 101, 130)',
        },
        showarrow: false,
        align: 'center',
        x: 0.5,
        y: 1.15,
        xref: 'paper',
        yref: 'paper',
      }]
    };
    var data = [trace];
    Plotly.newPlot("gauge", data, layout);
  });
}

init();