var Alexa = require('alexa-sdk');

var states = {
    STARTMODE: '_STARTMODE'  // Prompt the user to start or restart the SCRUM standup.
    USERSTATUSMODE:  '_USERSTATUSMODE'
};

// VARIABLES to generate project and user information
var randnum = require('random-number-between');
var userIdsStartNo = 200;
var userIdsEndNo = 300;
var maxNoOfUsersPerProject = 5;

for(var projcodeitr = 1; projcodeitr <= 2; projcodeitr++){

  var projData = new.Object();
  var projcode = 100 + projcodeitr;
  var noOfUsersInThisProj = randnum(1, maxNoOfUsersPerProject, 1);
  var userIdsInthisProj = [];

  projData["id"] = projcode;
  projData["name"] = "Project " + projcode;
  projData["users_count"] = noOfUsersInThisProj;
  projData["users"] = userIdsInthisProj;
}
var project100 = {
  id: 100,
  name:"Project 100",
  users_count:5,
  users: [200,201,202,203,204]
}

var project101 = {
  id: 101,
  name:"Project 101",
  users_count:3,
  users: [300,301,201]
}


var projects = {"100":project100,"101":project101};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context,callback);

    alexa.registerHandlers(newSessionHandlers, handlers);
    alexa.execute();
};

var newSessionHandlers = {

     // This will short-cut any incoming intent or launch requests and route them to this handler.
    'NewSession': function() {
        if(Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
            this.attributes['endedSessionCount'] = 0;
            this.attributes['currentProjectId'] = 0;
        }
        this.handler.state = states.STARTMODE;
        this.emit(':ask', 'Welcome to Daily Status. Would you like to start SCRUM stand up meeting?'
                + ' Say 1 to continue or 0 to quit.');
    }
};

var startProjectStanupHandlers = Alexa.CreateStateHandler(states.STARTMODE, {

  'NewSession': function () {
       this.emit('NewSession'); // Uses the handler in newSessionHandlers
   },

   'AMAZON.NoIntent': function() {
       this.emit(':tell', 'Ok, see you next time!');
   },

   'SessionEndedRequest': function () {
        this.attributes['endedSessionCount'] += 1;
    },

    'Unhandled': function() {
        var message = 'Say 1 to continue, or 0 to end the game.';
        this.emit(':ask', message, message);
    }

}

var handlers = {

    'LaunchRequest': function() {

      if(Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
          this.attributes['endedSessionCount'] = 0;

      }
      this.handler.state = states.STARTMODE;
    }


};
