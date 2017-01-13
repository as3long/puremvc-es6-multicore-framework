var puremvc = window.puremvc;
var AppConstants = require('../../AppConstants');
var TodoCommand = require('./TodoCommand');

class PrepControllerCommand extends puremvc.SimpleCommand {
  execute(note) {
    this.facade.registerCommand(AppConstants.ADD_TODO, TodoCommand);
    this.facade.registerCommand(AppConstants.REMOVE_TODOS_COMPLETED, TodoCommand);
    this.facade.registerCommand(AppConstants.DELETE_TODO, TodoCommand);
    this.facade.registerCommand(AppConstants.UPDATE_TODO, TodoCommand);
    this.facade.registerCommand(AppConstants.TOGGLE_TODO_STATUS, TodoCommand);
    this.facade.registerCommand(AppConstants.FILTER_TODOS, TodoCommand);
  }
}

module.exports = PrepControllerCommand;