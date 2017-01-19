let puremvc = window.puremvc;
import AppConstants from './AppConstants';
import StartupCommand from './controller/command/StartupCommand';

let AppFacade = function () {
  this.facade = puremvc.Facade.getInstance(AppConstants.CORE_NAME);
  this.facade.registerCommand(AppConstants.STARTUP, StartupCommand);
  this.facade.sendNotification(AppConstants.STARTUP);
}
new AppFacade();