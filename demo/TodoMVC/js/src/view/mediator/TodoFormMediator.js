var puremvc = window.puremvc;
var AppConstants = require('../../AppConstants');
var AppEvents = require('../event/AppEvents');
var TodoForm = require('../component/TodoForm');

class TodoFormMediator extends puremvc.Mediator {
  static NAME = "TodoFormMediator";
  listNotificationInterests() {
    return [AppConstants.TODOS_FILTERED];
  }

  // Code to be executed when the Mediator instance is registered with the View
  onRegister() {
    this.setViewComponent(new TodoForm);
    this.viewComponent.addEventListener(AppEvents.TOGGLE_COMPLETE, this.handleEvent);
    this.viewComponent.addEventListener(AppEvents.TOGGLE_COMPLETE_ALL, this.handleEvent);
    this.viewComponent.addEventListener(AppEvents.UPDATE_ITEM, this.handleEvent);
    this.viewComponent.addEventListener(AppEvents.DELETE_ITEM, this.handleEvent);
    this.viewComponent.addEventListener(AppEvents.ADD_ITEM, this.handleEvent);
    this.viewComponent.addEventListener(AppEvents.CLEAR_COMPLETED, this.handleEvent);
  }

  // Handle events from the view component
  handleEvent = (event) => {
    switch (event.type) {
      case AppEvents.TOGGLE_COMPLETE_ALL:
        this.sendNotification(AppConstants.TOGGLE_TODO_STATUS, event.doToggleComplete);
        break;

      case AppEvents.DELETE_ITEM:
        this.sendNotification(AppConstants.DELETE_TODO, event.todoId);
        break;

      case AppEvents.ADD_ITEM:
        console.log(event.todo);
        this.sendNotification(AppConstants.ADD_TODO, event.todo);
        break;

      case AppEvents.CLEAR_COMPLETED:
        this.sendNotification(AppConstants.REMOVE_TODOS_COMPLETED);
        break;

      case AppEvents.TOGGLE_COMPLETE:
      case AppEvents.UPDATE_ITEM:
        this.sendNotification(AppConstants.UPDATE_TODO, event.todo);
        break;
    }

  }

  // Handle notifications from other PureMVC actors
  handleNotification(note) {
    console.log(note, 'handleNotification');
    switch (note.getName()) {
      case AppConstants.TODOS_FILTERED:
        this.viewComponent.setFilteredTodoList(note.getBody());
        break;
    }
  }

}

module.exports = TodoFormMediator;