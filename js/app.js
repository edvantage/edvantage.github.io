var app = angular.module('fcfApp', []);

var data = {
  name: "Eloise Goodwill",
  subtitle: "is saving for college!",
  imagePath: "img/eloise.jpg",
  panels: [{
    primary: "Madeline and Tyler have started saving to send Eloise to college and you can help!",
    snippet: "Any contribution you make can multiply as it grows in a tax-advantaged investment account.",
    button: "How does it work?",
    modalUrl: "#modal1"
  }, {
    primary: "Eloise is using the <a href='edvest.com'>Edvest 529 plan</a> to save for college.",
    snippet: "Giving a gift now will help her for when she needs it the most.",
    button: "What's a 529 Plan?",
    modalUrl: "#modal2"
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
    description: "When you click submit, we'll record your contribution and you can make the contribution to a Square Cash account we set up for Sam's college fund. This way your gift will multiply!",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    message: "Add a custom message!",
    pledge: "Pledge for 2015!",
    pledgeLink: "//cash.me/$alexkonrad"
  }, footer: {

  },
};

app.controller('ApplicationController', function($scope) {
  $scope.data = data;
});

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });