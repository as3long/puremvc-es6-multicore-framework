var puremvc = window.puremvc;
var AppConstants = require('../../AppConstants');

class TodoProxy extends puremvc.Proxy {
  static NAME = 'TodoProxy';
  todos = [];
  stats = [];
  filter = AppConstants.FILTER_ALL;
  LOCAL_STORAGE = 'todo-puremvc';
  onRegister() {
    this.loadData();
  }

  loadData() {
    var storageObject;
    if (!localStorage.getItem(this.LOCAL_STORAGE)) {
      this.saveData();
    }
    storageObject = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE));
    this.todos = storageObject.todos;
    this.filter = storageObject.filter;
    this.todosModified();
  }

  saveData() {
    var storageObject = {
      todos: this.todos,
      filter: this.filter
    };
    localStorage.setItem(this.LOCAL_STORAGE, JSON.stringify(storageObject));
  }

  computeStats() {
    this.stats.totalTodo = this.todos.length;
    this.stats.todoCompleted = this.getCompletedCount();
    this.stats.todoLeft = this.stats.totalTodo - this.stats.todoCompleted;
  }

  filterTodos(filter) {
    var i, filtered;
    this.filter = filter;
    this.saveData();

    i = this.todos.length,
      filtered = [];
    
    console.log(this.todos, filter);

    while (i--) {
      if (filter === AppConstants.FILTER_ALL) {
        filtered.push(this.todos[i]);
      } else if (this.todos[i].completed === true && filter === AppConstants.FILTER_COMPLETED) {
        filtered.push(this.todos[i]);
      } else if (this.todos[i].completed === false && filter === AppConstants.FILTER_ACTIVE) {
        filtered.push(this.todos[i]);
      }
    }

    console.log(filtered)

    this.sendNotification(AppConstants.TODOS_FILTERED, {
      todos: filtered,
      stats: this.stats,
      filter: this.filter
    });
  }
  todosModified() {
    this.computeStats();
    this.filterTodos(this.filter);
  }
  removeTodosCompleted() {
    var i = this.todos.length;
    while (i--) {
      if (this.todos[i].completed) {
        this.todos.splice(i, 1);
      }
    }
    this.todosModified();
  }

  deleteTodo(id) {
    var i = this.todos.length;
    while (i--) {
      if (this.todos[i].id === id) {
        this.todos.splice(i, 1);
      }
    }
    this.todosModified();
  }

  toggleCompleteStatus(status) {
    var i = this.todos.length;
    while (i--) {
      this.todos[i].completed = status;
    }
    this.todosModified();
  }

  updateTodo(todo) {
    var i = this.todos.length;
    while (i--) {
      if (this.todos[i].id === todo.id) {
        this.todos[i].title = todo.title;
        this.todos[i].completed = todo.completed;
      }
    }
    this.todosModified();
  }

  addTodo(newTodo) {
    newTodo.id = this.getUuid();
    this.todos.unshift(newTodo);
    this.todosModified();
  }

  getCompletedCount() {
    var i = this.todos.length,
      completed = 0;

    while (i--) {
      if (this.todos[i].completed) {
        completed++;
      }
    }
    return completed;
  }
  getUuid() {
    var i, random, uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }
}

module.exports = TodoProxy;