var returnsData = [];
var returnRate = d3.random.normal(1.08, .02)
for (var i = 0; i < 18; i++) {
  if (i == 0) {
    returnsData[i] = 250;
  } else {
    returnsData[i] = 250 + Math.ceil(returnRate() * returnsData[i-1]);
  }
}

function update(data) {
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    barWidth = width / data.length;

  var x = d3.scale.linear()
    .domain(d3.range(0, 18));

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var y = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([height, 0]);

  var chart = d3.select('.chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    // .append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top ')');
    console.log(margin)
    console.log(width, height)

  var bar = chart.selectAll('g')
    .data(data);

  bar.select('*').remove();
  bar.enter().append('g').attr('transform',
    function(d, i) {
      return "translate(" + i * barWidth + ", 0)";
    });

  bar.selectAll('*').remove();

  bar.append('rect')
    .attr('y', function(d) { return y(d) })
    .attr('width', barWidth - 1)
    .attr('height', function(d) { return height - y(d) })

  bar.append('text')
    .attr('x', barWidth / 2)
    .attr('dy', '.75em')
    .attr('y', function(d) { return y(d) + 3 })
    .text(function(d) { return d });

  bar.exit().remove();
}
update(returnsData);

d3.select('#contribution').on('input', function() {
  var contribution = +this.value;
  if (contribution > 0) {
    returnsData[0] = contribution;
    for (var i = 1; i < 18; i++) {
      returnsData[i] = contribution + Math.ceil(returnRate() * returnsData[i-1]);
      // returnsData[i] =  Math.ceil(returnRate() * returnsData[i-1]);
      // returnsData[i] = (1.08 * returnsData[i-1]) < 25 ? (1.08 * returnsData[i-1]).toFixed(2) : Math.floor(1.08 * returnsData[i-1])
    }
    update(returnsData);
  }
});
