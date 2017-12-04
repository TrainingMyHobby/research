'use strict';

const Alexa = require('alexa-sdk');

const welcomeOutput = "Welcome to Daily Status.";
const welcomeSayOutput = "You have 3 options to ask me about your project. You can say start session scrum, OR start session summary, or start session user.";
const welcomeRepromptOutput = welcomeSayOutput;

exports.handler = function(event, context, callback) {

  var alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers,projectHandlers);
  alexa.execute();
};

var msgQueue = []

function publishMessageQueue() {

  var finalMsg = ''
  for (var i = 0; i < msgQueue.length; i++) {
    finalMsg = finalMsg + ' ' + msgQueue[i];
  }

  this.response.speak(finalMsg);
  this.emit(':responseReady');
}

function InitiateProjectCode() {
    msgQueue.push(projectCodeWelcomeMessage);
    publishMessageQueue();
    //this.response.speak(projectCodeWelcomeMessage).listen(projectCodeWelcomeMessage);
    //this.emit(':responseReady');
}

const handlers = {

  'LaunchRequest': function () {
        //this.emit(':tell', welcomeOutput);
        //this.response.speak(welcomeOutput + " " + welcomeSayOutput).listen(welcomeRepromptOutput);
        msgQueue.push(welcomeOutput);
        msgQueue.push(welcomeSayOutput);
        //this.emit(':ask',welcomeSayOutput);
        //this.emit(':responseReady');
        publishMessageQueue();
  },

  'InputUserInitialOptionRequest': function () {
        var userOption = this.event.request.intent.slots.userInitialOption.value;
        this.attributes['UserCurrentOption'] = userOption;
        //this.response.speak("You said " + userOption);
        msgQueue.push("You said " + userOption);
        //this.emit('InitiateProjectCode');
        InitiateProjectCode();
  },

  'AMAZON.CancelIntent': function () {
       this.response.speak('Goodbye!');
       this.emit(':responseReady');
   },
   'AMAZON.HelpIntent': function () {
        this.emit('LaunchRequest');
    },
   'AMAZON.StopIntent': function () {
       this.response.speak('Sorry, there is no response from you, see you later!. Goodbye!');
       this.emit(':responseReady');
   }

};

var projectCodeWelcomeMessage = "Please say project code number, followed by project code. For example, project code number 100";
const projectHandlers = {

  /*'InitiateProjectCode': function () {
      this.response.speak(projectCodeWelcomeMessage).listen(projectCodeWelcomeMessage);
      this.emit(':responseReady');
  },
  */

  'InputProjectCodeAccept' : function () {
    var userProjectCode = this.event.request.intent.slots.userProjectCode.value;
    this.attributes['UserCurrentProjectCode'] = userProjectCode;
    this.emit(':tell', "You said your project code as " + userProjectCode);
  }
};
