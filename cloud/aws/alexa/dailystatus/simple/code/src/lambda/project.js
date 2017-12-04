
var projectCodeWelcomeMessage = "Please say project code number, followed by project code. For example, project code number 100";

module.exports = {
    const projectHandlers = {

      'InitiateProjectCode': function () {
          this.response.speak(projectCodeWelcomeMessage).listen(projectCodeWelcomeMessage);
          this.emit(':responseReady');
      },

      'InputProjectCodeAccept' : function () {
        var userProjectCode = this.event.request.intent.slots.userProjectCode.value;
        this.attributes['UserCurrentProjectCode'] = userProjectCode;
        this.emit(':tell', "You said your project code as " + userProjectCode);
      }
    }
}
