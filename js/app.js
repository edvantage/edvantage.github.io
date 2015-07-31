var app = angular.module('fcfApp', []);

var returnsData = [];

app.factory('d3Service', ['$document', '$q', '$rootScope',
  function($document, $q, $rootScope) {
    var d = $q.defer();
    function onScriptLoad() {
      $rootScope.$apply(function() { d.resolve(window.d3); });
    }
    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = 'http://d3js.org/d3.v3.min.js';
    scriptTag.onreadystatechange = function () {
      if (this.readyState == 'complete') onScriptLoad();
    }
    scriptTag.onload = onScriptLoad;

    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(scriptTag);

    return {
      d3: function() { return d.promise; }
    };
}]);

app.controller('ApplicationController', function($scope) {

});

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

app.filter('last', function () {
  return function (array) {
    return array[array.length - 1]
  }
});

app.directive('barChart', ['d3Service', function (d3Service) {
  return {
    restrict: 'EA',
    scope: {},
    link: function (scope, element, attrs) {
      d3Service.d3().then(function (d3) {
        var svg = d3.select(element[0])
                    .append('svg')
                    .attr('class', 'chart')
                    .style({width: '100%',
                            height: '410px'});

        returnRate = function () { return 1.07 };

        var setValue = function(val) {
          var ev = d3.event;
          var self = this;

          delay(function() {
            var contribution = +input[0][0].innerText;
              returnsData[0] = contribution;
              for (var i = 1; i < 18; i++) {
                returnsData[i] = contribution + Math.ceil(returnRate() * returnsData[i-1]);
              }
              update(svg, returnsData);
          }, 500)
        };

        var input = d3.select('#contribution')
          .on('keydown', allowNumbers)
          .on('keyup', setValue)

        window.onresize = function() {
          update(svg, returnsData)
        };

        window.updateChart = function() {
          var contribution = +input[0][0].innerText;
          returnsData[0] = contribution;
          for (var i = 1; i < 18; i++) {
            returnsData[i] = contribution + Math.ceil(returnRate() * returnsData[i-1]);
          }
          update(svg, returnsData);
        }

        window.Materialize.scrollFire([{selector: '.contribution-input', offset: 300, callback: 'updateChart()'}])
      });
    },

  }
}]);

window.onload = function() {
  placeCaretAtEnd(document.getElementById('contribution'));
}

var allowNumbers = function () {
  var e = d3.event;

  if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
    (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
    (e.keyCode >= 35 && e.keyCode <= 40)) {
    return;
  }
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
};

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
  clearTimeout (timer);
  timer = setTimeout(callback, ms);
 };
})();

var placeCaretAtEnd = function(el) {
  if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

var update = function (svg, data) {
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = svg[0][0].clientWidth
    height = svg[0][0].clientHeight
    barWidth = width / data.length;

  var x = d3.scale.linear()
    .domain(d3.range(0, 18));

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var y = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([height, 0]);

  var chart = svg
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  var bar = chart.selectAll('g')
    .data(data);

  bar.enter().append('g').attr('transform',
    function(d, i) {
      return "translate(" + i * barWidth + ", 0)";
    });

  bar.selectAll('rect')
    .transition()
    .duration(500)
    .attr('height', 0)
    .attr('y', height);
  bar.selectAll('text').remove();

  bar.append('rect')
    .attr('width', barWidth - 1)
    .attr('height', 0)
    .attr('y', height)
    .transition()
    .duration(500)
    .delay(500)
    .attr('y', function(d) { return height - y(d) < 20 && height - y(d) > 5 ? height - 20 : y(d) })
    .attr('height', function(d) { return height - y(d) < 20 && height - y(d) > 5 ? 20 : height - y(d) })

  bar.append('text')
    .attr('x', barWidth / 2)
    .attr('dy', function (d) { return height - y(d) < 20 && height - y(d) > 5 ? '.1em' : '1em' })
    .attr('y', function(d) { return y(d) + 3 })
    .text(function(d) { return d });

  bar.exit().remove();
}

app.directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return;

      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };

      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
      read();

      function read() {
        var html = element.html();
        if ( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
      }
    }
  };
}]);