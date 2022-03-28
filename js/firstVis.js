// Generates our first visualization
function firstVis() {

    // Defining values
    let margin = {
        top: 60,
        left: 50,
        right: 30,
        bottom: 35
      },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;


    // Generates the graph
    function chart(selector, data) {

        // Get svg from selector
        let svg = d3.select(selector);

        // Sets color scale
        let color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])
            .domain(['white','black','hispanic','asian','other']);

        let largestRadius = 125;

        // All arrays follow the order: [Roxbury, South Boston Waterfront, Downtown, Dorchester]
        // Radius size of each circle in pixels
        let radii = [];
        // Population of each city
        let populations = [];
        // Racial breakdown, each element is an array in form: [white,black,hispanic,asian,other]
        let percentages = [];
        // Center point coordinates for Dorchester circle
        let x = 400, y = 250;
        
        // Coordinates of all circles
        //              Roxbury        South Bos    Downtwn       Dorch
        let coords = [[x+165,y+125],[x+133.75,y-64],[x+172.5,y-5],[x,y]];

        // Loops through the 4 data objects and fills arrays
        for(let i = 0; i < 4; i++) {
            let el = data[i];
            populations.push(el.population);
            percentages.push([el.white,el.black,el.hispanic,el.asian,el.other]);
        }

        // Calculates radius in pixels for all circles
        // Preserves ratio of areas: ratio of areas = ratio of populations
        for(let i = 0; i < 3; i++) {
            let ratio = Math.sqrt(populations[i] / populations[3]);
            radii.push((largestRadius * ratio));
        }
        radii.push(largestRadius);

        // Draws all 4 circles
        for(let x = 0; x < 4; x++) {
            svg = d3.select(selector);
            svg = svg.append('g')
                .attr('transform', 'translate(' + coords[x][0] + ',' + coords[x][1] + ')');
    
            var pie = d3.pie();
    
            var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radii[x]);
    
            var arcs = svg.selectAll("arc")
                .data(pie(percentages[x]))
                .enter()
                .append("g")
                .attr("class", "arc")
    
            arcs.append("path")
                .attr("fill", function(d, i) {
                    return color(i);
                })
                .attr("d", arc);
        }

        // Adding title
        svg = d3.select(selector);
        svg.append("text")
            .attr("x", 300 + width / 2)
            .attr("y", 100)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Racial Breakdown of Boston Neighborhoods, Scaled by Population Size");
        
        // Most likely add labels and stuff here too
        return chart;
    }
    return chart;
}