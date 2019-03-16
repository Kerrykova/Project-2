
var satisfactiondata;

// d3.json(`/satisfactiondata`).then(function(response){
//   satisfactionsample = response;
//   // Use d3 to select the panel with id of `#sample-metadata`
//   panel = d3.select("#sample-metadata");
//   // Use `.html("") to clear any existing metadata
//   d3.select("#sample-metadata").html("");
//   // Use `Object.entries` to add each key and value pair to the panel
//   // Hint: Inside the loop, you will need to use d3 to append new
//   // tags for each key-value in the metadata.
//   Object.entries(metasample).forEach(([key, value]) => {
//       var cell = panel.append("div");
//       cell.text(`${key}: ${value}`);
//   });
// }

function buildSatCharts(satisfaction) {
// @TODO: Use `d3.json` to fetch the sample data for the plots
d3.json(`/satisfactiondata`).then(function(response){
  // @TODO: Build a Bubble Chart using the sample data
  satisfactionData = response;
  // console.log(satisfactionData);
  var sat2015list = [];
  var sat2016list = [];
  var sat2017list = [];

  satisfactionData.forEach(element => {
    if (element.year === 2015){
      sat2015list.push(element)
    }
    if (element.year === 2016) {
      sat2016list.push(element)
    }
    if (element.year === 2017) {
      sat2017list.push(element)
    }

  });

  console.log(sat2015list)
  console.log(sat2016list)
  console.log(sat2017list)

  var safety_day_mapped2015 = sat2015list.map(sat2015list => sat2015list.safety_day);
  var safety_day_mapped2016 = sat2016list.map(sat2016list => sat2016list.safety_day);
  var safety_day_mapped2017 = sat2017list.map(sat2017list => sat2017list.safety_day);

  var safety_night_mapped2015 = sat2015list.map(sat2015list => sat2015list.safety_night);
  var safety_night_mapped2016 = sat2016list.map(sat2016list => sat2016list.safety_night);
  var safety_night_mapped2017 = sat2017list.map(sat2017list => sat2017list.safety_night);

  
  var safety_parks_mapped2015 = sat2015list.map(sat2015list => sat2015list.safety_parks);
  var safety_parks_mapped2016 = sat2016list.map(sat2016list => sat2016list.safety_parks);
  var safety_parks_mapped2017 = sat2017list.map(sat2017list => sat2017list.safety_parks);

  // console.log(safety_day_mapped2015);
  // console.log(safety_night_mapped);
  // console.log(safety_parks_mapped);

  function wordCount(data) {
  //   // An object to hold word frequency
    var wordFrequency = {};
  
  //   // Iterate through the array
    for (var i = 0; i < data.length; i++) {
      var currentWord = data[i];
      // If the word has been seen before...
      if (currentWord in wordFrequency) {
  //       // Add one to the counter
        wordFrequency[currentWord] += 1;
      }
      else {
        // Set the counter at 1
        wordFrequency[currentWord] = 1;
      }
    }
    // console.log(wordFrequency);
    var agree = wordFrequency.Agree;
    var str_agree = wordFrequency["Strongly Agree"];
    var str_disagree = wordFrequency["Strongly Disagree"];
    var neutral = wordFrequency.Neutral;
    var disagree = wordFrequency.Disagree;
    var total = agree + neutral + disagree + str_agree + str_disagree;
    var total_sat = agree +str_agree;
    // console.log (total);

    var total_sat_percent = (total_sat / total)*100

    // console.log(total_sat_percent);
    return total_sat_percent;
  }
  wordCount(safety_day_mapped2015)
  var safety_day2015 = wordCount(safety_day_mapped2015);
  wordCount(safety_day_mapped2016);
  var safety_day2016 = wordCount(safety_day_mapped2016);
  wordCount(safety_day_mapped2017);
  var safety_day2017 = wordCount(safety_day_mapped2017);

  wordCount(safety_night_mapped2015);
  var safety_night2015 = wordCount(safety_night_mapped2015);
  wordCount(safety_night_mapped2016);
  var safety_night2016 = wordCount(safety_night_mapped2016);
  wordCount(safety_night_mapped2017);
  var safety_night2017 = wordCount(safety_night_mapped2017);

  wordCount(safety_parks_mapped2015);
  var safety_parks2015 = wordCount(safety_parks_mapped2015);
  wordCount(safety_parks_mapped2016);
  var safety_parks2016 = wordCount(safety_parks_mapped2016);
  wordCount(safety_parks_mapped2017);
  var safety_parks2017 = wordCount(safety_parks_mapped2017);

  // console.log(safety_day2016)

  // SAFETY LINE CHART

  var safety_day_line = {
    x: [2015, 2016, 2017],
    y: [safety_day2015, safety_day2016, safety_day2017],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Day Safety'
  };

  var safety_night_line = {
    x: [2015, 2016, 2017],
    y: [safety_night2015, safety_night2016, safety_night2017],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Night Safety'
  };

  var safety_parks_line = {
    x: [2015, 2016, 2017],
    y: [safety_parks2015, safety_parks2016, safety_parks2017],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Park Safety'
  };

  var safety_data = [safety_day_line, safety_night_line, safety_parks_line];
  var layout = {
    title: 'Percent of Residents who Feel Safe by Year',
    xaxis: {
      title: 'Year',
      nticks: (3)
      // showgrid: false,
      // zeroline: false
    },
    yaxis: {
      title: 'Percent Satisfied',
      range: [50, 100],
      // showline: false
    }
  };
  var satgraph = document.getElementById('sample-safetydata')

  Plotly.newPlot(satgraph, safety_data, layout);


// ANIMAL OUTCOME LINE CHART

// var dog = {
// x: [2015, 2016, 2017],
// y: [],
// type: 'scatter',
// name: 'Dog'
// };

// var cat = {
// x: [2015, 2016, 2017],
// y: [],
// type: 'scatter',
// name: 'Cat'
// };

// var livestock = {
// x: [2015, 2016, 2017],
// y: [],
// type: 'scatter',
// name: 'Livestock'
// };

// var bird = {
// x: [2015, 2016, 2017],
// y: [],
// type: 'scatter',
// name: 'Bird'
// };

// var animal_outcome_data = [dog, cat, livestock, bird];
// var layout = {
// title: 'Percent of Animals Adopted and Returned to Owner',
// xaxis: {
//   title: 'Year',
//   // showgrid: false,
//   // zeroline: false
// },
// yaxis: {
//   title: 'Percent Adopted and Returned to Owner',
//   range: [0, 100],
//   // showline: false
// }
// };

// Plotly.newPlot('sample-animaldata', animal_outcome_data, layout);
});
}

function init() {
  buildSatCharts();
};
// Initialize the dashboard
init();
