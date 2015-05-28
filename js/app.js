var app = angular.module('fcfApp', []);

var data = {
  name: "Eloise Goodwill",
  subtitle: "...is saving for college",
  imagePath: "img/eloise-profile.jpg",
  panels: [{
    primary: "Madeline and Tyler have started saving to send Eloise to college and you can help!",
    snippet: "Contributions grow over time in a tax-advantaged investment account.",
    button: "How does it work?",
    modalUrl: "#modal1"
  }, {
    primary: "Eloise is using the <a href='edvest.com'>Edvest 529 plan</a> to save for college.",
    snippet: "Giving a gift now will help her for when she needs it the most.",
    button: "What is a 529 Plan?",
    modalUrl: "#modal2"
  }],
  investments: [{
    copy: "Investing in balanced funds is the proven way to maximize rate of return over time. This calculator shows the kind of growth you can achieve when you begin investing early and commit to making yearly contributions."
  }, {
    copy: "Enter a number to the input below. If you were to invest that amount each year, the graph will show the expected returns over the course of 18 years with an average rate of return of 7%."
  }],
  pledgeInfos: [{
    copy: "Submitting this form will only notify Madeline and Tyler that you intend to donate--no payment or financial information is necessary."
  }, {
    copy: "After you submit the form, you will be redirected to Square Cash to make a deposit to the account Madelin and Tyler have set up for Eloise's 529 plan."
  }],
  giftAmountTitle: "What your gift can help with",
  giftAmounts: [
    {
      title: "Tuition",
      description: "One year at an in-state public school is <a style='color:white' href='http://www.collegedata.com/cs/content/content_payarticle_tmpl.jhtml?articleId=10064' target='_blank'>$9140</a>.",
      icon: "mdi-action-account-balance"
    },
    {
      title: "Room and Board",
      description: "Room and board can average <a style='color:white' href='http://www.collegedata.com/cs/content/content_payarticle_tmpl.jhtml?articleId=10064' target='_blank'>$9800</a> per year.",
      icon: "mdi-action-home"
    },
    {
      title: "Books and Supplies",
      description: "Books and supplies cost <a style='color:white' href='http://www.collegedata.com/cs/content/content_payarticle_tmpl.jhtml?articleId=10064' target='_blank'>$1200</a> per year.",
      icon: "mdi-action-home"
    }
  ],
  form: {
    title: "How you can contribute",
    subtitle: "Fill out the form below to make your pledge.",
    description: "Madeline and Tyler have set up a Square Cash account to receive gifts for the 529 plan. Filling out this form will only notify them of your intent to pledge. Once they receive the funds in their Square Cash account and they're notified of your pledge, they will dispense it into their 529 Plan for Eloise.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    message: "Add a custom message!",
    pledge: "Pledge for 2015!",
    pledgeLink: "//cash.me/$rtylerend"
  }, footer: {

  },
  returns: returnsData
};

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
  $scope.data = data;
  $scope.returns = returnsData;
  window.scope = $scope;
});

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

app.filter('last', function () {
  return function (array) {
    console.log(array)
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

        returnRate = d3.random.normal(1.07, .02)

        var setValue = function(val) {
          var ev = d3.event;
          var self = this;

          delay(function() {
            var contribution = +input[0][0].innerText;
              returnsData[0] = contribution;
              for (var i = 1; i < 18; i++) {
                returnsData[i] = contribution + Math.ceil(returnRate() * returnsData[i-1]);
                // returnsData[i] =  Math.ceil(returnRate() * returnsData[i-1]);
                // returnsData[i] = (1.08 * returnsData[i-1]) < 100 ? (1.08 * returnsData[i-1]).toFixed(2) : Math.floor(1.08 * returnsData[i-1])
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
            // returnsData[i] =  Math.ceil(returnRate() * returnsData[i-1]);
            // returnsData[i] = (1.08 * returnsData[i-1]) < 100 ? (1.08 * returnsData[i-1]).toFixed(2) : Math.floor(1.08 * returnsData[i-1])
          }
          update(svg, returnsData);

          // placeCaretAtEnd(document.getElementById('contribution'));
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
  // el.focus();
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

// var returnRate = function () { return 1.07 };
// for (var i = 0; i < 18; i++) {
//   if (i == 0) {
//     returnsData[i] = 100;
//   } else {
//     returnsData[i] = 100 + Math.ceil(returnRate() * returnsData[i-1]);
//   }
// }


var update = function (svg, data) {
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = svg[0][0].clientWidth// - margin.left - margin.right,
    height = svg[0][0].clientHeight// - margin.top - margin.bottom,
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
    // .append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top ')');

  var bar = chart.selectAll('g')
    .data(data);

  // bar.select('*').remove();
  bar.enter().append('g').attr('transform',
    function(d, i) {
      return "translate(" + i * barWidth + ", 0)";
    });

  // bar.selectAll('*').remove();
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
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };

      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
      read(); // initialize

      // Write data to the model
      function read() {
        var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if ( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
      }
    }
  };
}]);