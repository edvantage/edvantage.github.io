var app = angular.module('fcfApp', []);

var data = {
  name: "Sammy Cott",
  subtitle: "Saving for college with First College Fund",
  panels: [{
    primary: "This year, to help Sam reach his goals, make a gift to his college fund.",
    snippet: "Any contribution you make can multiply as it grows in a tax-advantaged investment account.",
    button: "How does it work?"
  }, {
    primary: "An <a href='edvest.com'>Edvest</a> 529 College Savings Plan allows contributions to grow tax-free",
    snippet: "Any contribution you make can multiply as it grows in a tax-advantaged investment account.",
    button: "How does it work?"
  }],
  giftAmountTitle: "What your gift can help with",
  giftAmounts: [
    {
      title: "Tuition",
      description: "One year at an in-state public school is <a style='color:white' href='http://www.collegedata.com/cs/content/content_payarticle_tmpl.jhtml?articleId=10064' target='_blank'>almost $10,000</a>.",
      icon: "mdi-action-account-balance"
    },
    {
      title: "Room and Board",
      description: "Room and board can average <a style='color:white' href='http://www.collegedata.com/cs/content/content_payarticle_tmpl.jhtml?articleId=10064' target='_blank'>around $10,000</a> per year.",
      icon: "mdi-action-home"
    },
    {
      title: "Books and Supplies",
      description: "Books and supplies cost <a style='color:white' href='http://www.collegedata.com/cs/content/content_payarticle_tmpl.jhtml?articleId=10064' target='_blank'>over $1,000</a> per year.",
      icon: "mdi-action-home"
    },
    {
      title: "Other expenses",
      description: "Travel and personal expenses can cost <a style='color:white' href='http://www.collegedata.com/cs/content/content_payarticle_tmpl.jhtml?articleId=10064' target='_blank'>around $2,500</a> per year.",
      icon: "mdi-action-home"
    }
  ],
  form: {
    title: "How you can contribute",
    subtitle: "Fill out the form below to make your pledge.",
    description: "When you click submit, we'll record your contribution and you can make the contribution to a Square Cash account we set up for Sam's college fund. This way your gift will multiply!",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    message: "Add a custom message!",
    pledge: "Pledge!"
  }
};

app.controller('ApplicationController', function($scope) {
  $scope.data = data;
});

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });