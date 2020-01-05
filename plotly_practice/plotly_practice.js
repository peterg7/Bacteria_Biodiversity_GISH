// Create a Line Chart
Plotly.newPlot("plotArea", [{x:[1,2,3], y:[10,20,30]}]);


// Create a Bar Chart
var trace = {
   x: ["burrito", "pizza", "chicken"],
   y: [10, 18, 5],
   type: "bar"
};

// Define layout of chart
var layout = {
    title: "Luncheon Survey",
    xaxis: {title: "Food Option"},
    yaxis: {title: "Number of Respondents"}
};

Plotly.newPlot("plotArea", trace, layout);

// Example
var trace = {
 x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", 
 	"ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
 y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
 type: "bar"
};
var data = [trace];
var layout = {
 title: "'Bar' Chart",
 xaxis: { title: "Drinks"},
 yaxis: { title: "% of Drinks Ordered"}
};

Plotly.newPlot("plotArea", data, layout);

// Create a Pie Chart
var trace = {
  labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita",
     "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
  values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: 'pie'
};
var data = [trace];
var layout = {
  title: "'Bar' Chart",
};

Plotly.newPlot("plotArea", data, layout);

// The map function
var numbers = [1,2,3,4,5];
var doubled = numbers.map(function(num){
    return num * 2;
});
console.log(doubled);

cities = [
    {
      "Rank": 1,
      "City": "San Antonio ",
      "State": "Texas",
      "Increase_from_2016": "24208",
      "population": "1511946"
    },
    {
      "Rank": 2,
      "City": "Phoenix ",
      "State": "Arizona",
      "Increase_from_2016": "24036",
      "population": "1626078"
    },
    {
      "Rank": 3,
      "City": "Dallas",
      "State": "Texas",
      "Increase_from_2016": "18935",
      "population": "1341075"
    }
];

cityNames = cities.map(function(city){
    return city.City;
});
console.log(cityNames);

// The filter function
var numbers = [1,2,3,4,5];
var larger = numbers.filter(function(num){
    return num > 1;
});

console.log(larger);

// Arrow Functions
var numbers = [1,2,3,4,5];
var doubled = numbers.map(num => num * 2);
console.log(doubled);

// Sorting methods
var familyAge = [3,2,39,37,9];
sortedAge = familyAge.sort((a,b) => a - b);
console.log(sortedAge);

// Slice method
var integers = [0,1,2,3,4,5];
slice1 = integers.slice(0,2); 



