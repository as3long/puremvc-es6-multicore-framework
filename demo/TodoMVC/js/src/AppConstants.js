const AppConstants = {
  // The multiton key for this app's single core
  CORE_NAME: 'TodoMVC',

  // Notifications 
  STARTUP: 'startup',
  ADD_TODO: 'add_todo',
  DELETE_TODO: 'delete_todo',
  UPDATE_TODO: 'update_todo',
  TOGGLE_TODO_STATUS: 'toggle_todo_status',
  REMOVE_TODOS_COMPLETED: 'remove_todos_completed',
  FILTER_TODOS: 'filter_todos',
  TODOS_FILTERED: 'todos_filtered',

  // Filter routes
  FILTER_ALL: 'all',
  FILTER_ACTIVE: 'active',
  FILTER_COMPLETED: 'completed'
};

module.exports = AppConstants;