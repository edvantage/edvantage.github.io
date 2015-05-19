var app = angular.module('fcfApp', []);

var data = {
  name: "Eloise Goodwill",
  subtitle: "Saving for college with First College Fund",
  imagePath: "img/eloise.jpg",
  panels: [{
    primary: "This year, to help Eloise reach her goals, make a gift to her college fund.",
    snippet: "Any contribution you make can multiply as it grows in a tax-advantaged investment account.",
    button: "How does it work?",
    modalUrl: "#modal1"
  }, {
    primary: "An <a href='edvest.com'>Edvest</a> 529 College Savings Plan allows contributions to grow tax-free",
    snippet: "Giving a gift now will help her for when she needs it the most.",
    button: "What's a 529 Plan?",
    modalUrl: "#modal2"
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
    pledge: "Pledge!",
    pledgeLink: "//cash.me/$alexkonrad"
  }, footer: {

  },
};

app.controller('ApplicationController', function($scope) {
  $scope.data = data;
});

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });