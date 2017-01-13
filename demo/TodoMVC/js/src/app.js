var puremvc = window.puremvc;
var AppConstants = require('./AppConstants');
var StartupCommand = require('./controller/command/StartupCommand');

var AppFacade = function () {
  this.facade = puremvc.Facade.getInstance(AppConstants.CORE_NAME);
  this.facade.registerCommand(AppConstants.STARTUP, StartupCommand);
  this.facade.sendNotification(AppConstants.STARTUP);
}
new AppFacade();