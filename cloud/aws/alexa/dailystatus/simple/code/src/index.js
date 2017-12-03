var Alexa = require('alexa-sdk');

var projectCodesAndNames = {100:"Project 100",101:"Project 101"};
var projectCodesAndUsers= {100:[200,201],101:[200,300]]};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() {
        this.emit(':tell',"Welcome to Daily Status", );
        this.emit('LaunchIntent');
    },

    'LaunchIntent': function() {
        this.emit(':ask', "What is your JIRA project code?");
    },

    'ProjectCodeAcceptIntent': function() {
      this.emit(':tell', "Welcome Scrum Master for project ", "In your project there are 5 team members");
    },

    'ProjectUserCodeAskIntent': function() {
      this.emit(':ask', "Welcome team members", "One of you please say your project user code");
    },

    'ProjectUserCodeAcceptIntent': function() {
      this.emit(':tell', "Welcome project user ");
    },

    'ProjectUserCurrentStoriesIntent': function() {
      this.emit(':tell', "You have 3 stories in this Sprint.");
    },

    'ProjectUserAStoryNumberSayIntent': function() {

    },

    'ProjectUserAStoryNumberAcceptStatusIntent': function() {

    },

    'ProjectUserCurrentStoriesSummaryIntent': function() {

    }
};
