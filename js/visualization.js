// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

  console.log("aaa");
  
  let roxbury = d3.select('#Roxbury')
    .style('display', 'visible');

  let southBoston = d3.select('#SouthBostonWaterfront')
    .style('display', 'visible');

  let downtown = d3.select('#Downtown')
    .style('display', 'visible');

  let dorchester = d3.select('#Dorchester')
    .style('display', 'visible');
  var data = [roxbury, southBoston, downtown, dorchester];

    d3.select("ul#tabs")
	.selectAll("li")
	.data(data)
  .enter()
  .append('li')
  .text(function(d){ return d; })
  .on('click', function(d, i){onlyShowByID('id' + i); });

d3.select("#vis-holder")
	.selectAll("div")
  .data(data)
  .enter()
  .append('div')
  .attr('id', function(d, i){ return 'id' + i })
  .text(function(d){ return 'This is chart ' + d;})
  // d3.select('#vis-holder-2')
  //   .selectAll('div')
  //   .style('visibility','hidden');
  function onlyShowByID(id) {
    console.log(id);
    d3.select('#' + id)
      .style('display', 'flex');
    // d3.select('#vis-holder-2')
    //   .selectAll('div')
    //   .style('visibility','hidden');
  };
  // onlyShowByID('SouthBostonWaterfront');

  d3.json('data/TACCdata.json').then(data => {

    console.log('testing');

    let vis1 = firstVis()
      ('#vis-svg-1', data[0]);

    let vis2 = barCharts()
      ('#vis-svg-2', data[1][0]);

      let vis3 = barCharts()
      ('#vis-svg-2', data[1][1]);

      let vis4 = barCharts()
      ('#vis-svg-2', data[1][2]);

      let vis5 = barCharts()
      ('#vis-svg-2', data[1][0]);
    
  });

  


})());
