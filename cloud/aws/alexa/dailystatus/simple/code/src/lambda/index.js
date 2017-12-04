'use strict';

const Alexa = require('alexa-sdk');

const welcomeOutput = "Welcome to Daily Status by Kishore Veleti.";
const welcomeSayOutput = "You have 3 options to ask me about your project. You can say start session scrum, OR start session summary, or start session user. Now I am listening for your response.";
const welcomeRepromptOutput = welcomeSayOutput;

 const projectCodeWelcomeMessage = "To start, please specify your project number. You need to say, project number is 100. Now I am listening for your response.";

exports.handler = function(event, context, callback) {

  var alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {

  'LaunchRequest': function () {
        this.response.speak(welcomeOutput + " " + welcomeSayOutput).listen(welcomeRepromptOutput);
        //this.emit(':ask',welcomeSayOutput);
        this.emit(':responseReady');
  },

  'InputUserInitialOptionRequest': function () {
        var userOption = this.event.request.intent.slots.userInitialOption.value;
        this.attributes['UserCurrentOption'] = userOption;

        var messageForProjCode = "You said " + userOption + ". " + projectCodeWelcomeMessage;
        this.response.speak(messageForProjCode).listen(projectCodeWelcomeMessage);;
        this.emit(':responseReady');
  },

  'InputProjectCodeAccept': function () {
        var userProjectCode = this.event.request.intent.slots.userProjectCode.value;
        this.attributes['userProjectCode'] = userProjectCode;

        if(this.attributes['UserCurrentOption'] == "scrum") {
          var msgNoOfTeamMembers = "For project code number " + this.attributes['userProjectCode']
          + " , I found 2 team members.";
          msgNoOfTeamMembers = msgNoOfTeamMembers + " Now starting daily status for each user. To start, you need to say, daily update for user number 200. Now I am listening for your response."
          this.response.speak(msgNoOfTeamMembers).listen(msgNoOfTeamMembers);;
          this.emit(':responseReady');
        }
        else if(this.attributes['UserCurrentOption'] == "summary") {
          var msgScrumSummary = "For project code number " + this.attributes['userProjectCode']
          + " , in the latest sprint, I found 2 team members and 5 user stories. To continue with main memu please say go to main menu. Now I am listening for your response.";
          this.response.speak(msgScrumSummary).listen(msgScrumSummary);;
          this.emit(':responseReady');
        }
        else if(this.attributes['UserCurrentOption'] == "user") {
          var msgScrumSummary = "For project code number " + this.attributes['userProjectCode']
          + " , to know user stories, please specify project user number. You need to say, project user number is 200. Now I am listening for your response.";
          this.response.speak(msgScrumSummary).listen(msgScrumSummary);;
          this.emit(':responseReady');
        }
        else  {
          var msgScrumSummary = "For project number " + this.attributes['userProjectCode']
          + " , I do not know the selected option. To continue with main memu please say go to main menu.";
          this.response.speak(msgScrumSummary).listen(msgScrumSummary);;
          this.emit(':responseReady');
        }
  },
  'InputBackToMainMenuAccept': function () {
       this.emit('InputUserInitialOptionRequest');
   },
  'InputProjectScrumEachUerIdAccept': function () {
      var userId = this.event.request.intent.slots.userIdForDailyUpdate.value;
      this.attributes['UserCurrentUserId'] = userId;

      var messageForUserDailyUpdate = "For user number " + userId + ", in project " + this.attributes['userProjectCode'];
      messageForUserDailyUpdate = messageForUserDailyUpdate + " there are 2 stories. 1 story not yet started and 1 story in progress."
      messageForUserDailyUpdate = messageForUserDailyUpdate + " Checking with user number " + userId + ", did you completed story number 1000?"
      this.response.speak(messageForUserDailyUpdate).listen(messageForUserDailyUpdate);;
      this.emit(':responseReady');
   },
  'AMAZON.CancelIntent': function () {
       this.response.speak('Thanks for your updates. This is a dummy Alexa skill by Kishore Veleti, develped to validate the idea of Agile daily SCRUM through Alexa. Thanks for testing me, Goodbye!');
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
