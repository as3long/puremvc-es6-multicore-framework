var puremvc = window.puremvc;
var TodoProxy = require('../../model/proxy/TodoProxy');
var AppConstants = require('../../AppConstants');

class TodoCommand extends puremvc.SimpleCommand {
  execute(note) {
    var proxy = this.facade.retrieveProxy(TodoProxy.NAME);
    console.log('TodoCommand', note.getName());
    switch (note.getName()) {
      case AppConstants.ADD_TODO:
        proxy.addTodo(note.getBody());
        break;

      case AppConstants.DELETE_TODO:
        proxy.deleteTodo(note.getBody());
        break;

      case AppConstants.UPDATE_TODO:
        proxy.updateTodo(note.getBody());
        break;

      case AppConstants.TOGGLE_TODO_STATUS:
        proxy.toggleCompleteStatus(note.getBody());
        break;

      case AppConstants.REMOVE_TODOS_COMPLETED:
        proxy.removeTodosCompleted();
        break;

      case AppConstants.FILTER_TODOS:
        proxy.filterTodos(note.getBody());
        break;

      default:
        console.log('TodoCommand received an unsupported Notification');
        break;
    }
  }
}

module.exports = TodoCommand;