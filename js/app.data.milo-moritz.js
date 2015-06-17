var data = {
  name: "Milo Moritz",
  subtitle: "...is saving for college!!!",
  imagePath: "img/milo-profile.jpg",
  panels: [{
    primary: "The Moritz family have started saving to send Milo to college and you can help!",
    snippet: "Contributions grow over time in a tax-advantaged investment account.",
    button: "How does it work?",
    modalUrl: "#modal1"
  }, {
    primary: "Milo is using the Edvest 529 plan to save for college.",
    snippet: "Giving a gift now will help her for when he needs it the most.",
    button: "What is a 529 Plan?",
    modalUrl: "#modal2"
  }],
  investments: [{
    copy: "Your contributions will be invested in diversified mutual funds that will compound until Milo gets to college. Use the calculator below to see how much an annual contribution will grow to assuming 7% interest."
  }, {
    copy: "Enter a number to the input below. If you were to invest that amount each year, the graph will show the expected returns over the course of 18 years with an average rate of return of 7%."
  }],
  pledgeInfos: [{
    copy: "Submitting this form will only notify the Moritzes that you intend to donate--no payment or financial information is necessary."
  }, {
    copy: "After you submit the form, you will be redirected to Square Cash to make a deposit to the account the Moritzes have set up for Milo's 529 plan."
  }],
  giftAmountTitle: "How you can help",
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
    amount: "Pledge amount",
    title: "How you can contribute",
    subtitle: "Fill out the form below to make your pledge.",
    description: "The Moritzes have set up a Square Cash account to receive gifts for the 529 plan. Filling out this form will only notify them of your intent to pledge. Once they receive the funds in their Square Cash account and they're notified of your pledge, they will dispense it into their 529 Plan for Milo.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    message: "Add a custom message!",
    pledge: "Pledge for 2015!",
    pledgeLink: "//cash.me/$MiloCollegeFund"
  }, footer: {

  },
  returns: returnsData
};

var returnsData = [];