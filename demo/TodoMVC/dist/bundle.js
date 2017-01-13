/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var puremvc = window.puremvc;
	var AppConstants = __webpack_require__(1);
	var StartupCommand = __webpack_require__(2);

	var AppFacade = function AppFacade() {
	  this.facade = puremvc.Facade.getInstance(AppConstants.CORE_NAME);
	  this.facade.registerCommand(AppConstants.STARTUP, StartupCommand);
	  this.facade.sendNotification(AppConstants.STARTUP);
	};
	new AppFacade();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var AppConstants = {
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var puremvc = window.puremvc;
	var PrepControllerCommand = __webpack_require__(3);
	var PrepModelCommand = __webpack_require__(6);
	var PrepViewCommand = __webpack_require__(7);

	var StartupCommand = function (_puremvc$MacroCommand) {
	  _inherits(StartupCommand, _puremvc$MacroCommand);

	  function StartupCommand() {
	    _classCallCheck(this, StartupCommand);

	    return _possibleConstructorReturn(this, (StartupCommand.__proto__ || Object.getPrototypeOf(StartupCommand)).apply(this, arguments));
	  }

	  _createClass(StartupCommand, [{
	    key: 'initializeMacroCommand',
	    value: function initializeMacroCommand() {
	      this.addSubCommand(PrepControllerCommand);
	      this.addSubCommand(PrepModelCommand);
	      this.addSubCommand(PrepViewCommand);
	    }
	  }]);

	  return StartupCommand;
	}(puremvc.MacroCommand);

	module.exports = StartupCommand;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var puremvc = window.puremvc;
	var AppConstants = __webpack_require__(1);
	var TodoCommand = __webpack_require__(4);

	var PrepControllerCommand = function (_puremvc$SimpleComman) {
	  _inherits(PrepControllerCommand, _puremvc$SimpleComman);

	  function PrepControllerCommand() {
	    _classCallCheck(this, PrepControllerCommand);

	    return _possibleConstructorReturn(this, (PrepControllerCommand.__proto__ || Object.getPrototypeOf(PrepControllerCommand)).apply(this, arguments));
	  }

	  _createClass(PrepControllerCommand, [{
	    key: 'execute',
	    value: function execute(note) {
	      this.facade.registerCommand(AppConstants.ADD_TODO, TodoCommand);
	      this.facade.registerCommand(AppConstants.REMOVE_TODOS_COMPLETED, TodoCommand);
	      this.facade.registerCommand(AppConstants.DELETE_TODO, TodoCommand);
	      this.facade.registerCommand(AppConstants.UPDATE_TODO, TodoCommand);
	      this.facade.registerCommand(AppConstants.TOGGLE_TODO_STATUS, TodoCommand);
	      this.facade.registerCommand(AppConstants.FILTER_TODOS, TodoCommand);
	    }
	  }]);

	  return PrepControllerCommand;
	}(puremvc.SimpleCommand);

	module.exports = PrepControllerCommand;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var puremvc = window.puremvc;
	var TodoProxy = __webpack_require__(5);
	var AppConstants = __webpack_require__(1);

	var TodoCommand = function (_puremvc$SimpleComman) {
	  _inherits(TodoCommand, _puremvc$SimpleComman);

	  function TodoCommand() {
	    _classCallCheck(this, TodoCommand);

	    return _possibleConstructorReturn(this, (TodoCommand.__proto__ || Object.getPrototypeOf(TodoCommand)).apply(this, arguments));
	  }

	  _createClass(TodoCommand, [{
	    key: 'execute',
	    value: function execute(note) {
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
	  }]);

	  return TodoCommand;
	}(puremvc.SimpleCommand);

	module.exports = TodoCommand;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var puremvc = window.puremvc;
	var AppConstants = __webpack_require__(1);

	var TodoProxy = function (_puremvc$Proxy) {
	  _inherits(TodoProxy, _puremvc$Proxy);

	  function TodoProxy() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, TodoProxy);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TodoProxy.__proto__ || Object.getPrototypeOf(TodoProxy)).call.apply(_ref, [this].concat(args))), _this), _this.todos = [], _this.stats = [], _this.filter = AppConstants.FILTER_ALL, _this.LOCAL_STORAGE = 'todo-puremvc', _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(TodoProxy, [{
	    key: 'onRegister',
	    value: function onRegister() {
	      this.loadData();
	    }
	  }, {
	    key: 'loadData',
	    value: function loadData() {
	      var storageObject;
	      if (!localStorage.getItem(this.LOCAL_STORAGE)) {
	        this.saveData();
	      }
	      storageObject = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE));
	      this.todos = storageObject.todos;
	      this.filter = storageObject.filter;
	      this.todosModified();
	    }
	  }, {
	    key: 'saveData',
	    value: function saveData() {
	      var storageObject = {
	        todos: this.todos,
	        filter: this.filter
	      };
	      localStorage.setItem(this.LOCAL_STORAGE, JSON.stringify(storageObject));
	    }
	  }, {
	    key: 'computeStats',
	    value: function computeStats() {
	      this.stats.totalTodo = this.todos.length;
	      this.stats.todoCompleted = this.getCompletedCount();
	      this.stats.todoLeft = this.stats.totalTodo - this.stats.todoCompleted;
	    }
	  }, {
	    key: 'filterTodos',
	    value: function filterTodos(filter) {
	      var i, filtered;
	      this.filter = filter;
	      this.saveData();

	      i = this.todos.length, filtered = [];

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

	      console.log(filtered);

	      this.sendNotification(AppConstants.TODOS_FILTERED, {
	        todos: filtered,
	        stats: this.stats,
	        filter: this.filter
	      });
	    }
	  }, {
	    key: 'todosModified',
	    value: function todosModified() {
	      this.computeStats();
	      this.filterTodos(this.filter);
	    }
	  }, {
	    key: 'removeTodosCompleted',
	    value: function removeTodosCompleted() {
	      var i = this.todos.length;
	      while (i--) {
	        if (this.todos[i].completed) {
	          this.todos.splice(i, 1);
	        }
	      }
	      this.todosModified();
	    }
	  }, {
	    key: 'deleteTodo',
	    value: function deleteTodo(id) {
	      var i = this.todos.length;
	      while (i--) {
	        if (this.todos[i].id === id) {
	          this.todos.splice(i, 1);
	        }
	      }
	      this.todosModified();
	    }
	  }, {
	    key: 'toggleCompleteStatus',
	    value: function toggleCompleteStatus(status) {
	      var i = this.todos.length;
	      while (i--) {
	        this.todos[i].completed = status;
	      }
	      this.todosModified();
	    }
	  }, {
	    key: 'updateTodo',
	    value: function updateTodo(todo) {
	      var i = this.todos.length;
	      while (i--) {
	        if (this.todos[i].id === todo.id) {
	          this.todos[i].title = todo.title;
	          this.todos[i].completed = todo.completed;
	        }
	      }
	      this.todosModified();
	    }
	  }, {
	    key: 'addTodo',
	    value: function addTodo(newTodo) {
	      newTodo.id = this.getUuid();
	      this.todos.unshift(newTodo);
	      this.todosModified();
	    }
	  }, {
	    key: 'getCompletedCount',
	    value: function getCompletedCount() {
	      var i = this.todos.length,
	          completed = 0;

	      while (i--) {
	        if (this.todos[i].completed) {
	          completed++;
	        }
	      }
	      return completed;
	    }
	  }, {
	    key: 'getUuid',
	    value: function getUuid() {
	      var i,
	          random,
	          uuid = '';

	      for (i = 0; i < 32; i++) {
	        random = Math.random() * 16 | 0;
	        if (i === 8 || i === 12 || i === 16 || i === 20) {
	          uuid += '-';
	        }
	        uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
	      }
	      return uuid;
	    }
	  }]);

	  return TodoProxy;
	}(puremvc.Proxy);

	TodoProxy.NAME = 'TodoProxy';


	module.exports = TodoProxy;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var puremvc = window.puremvc;
	var TodoProxy = __webpack_require__(5);

	var PrepModelCommand = function (_puremvc$SimpleComman) {
	  _inherits(PrepModelCommand, _puremvc$SimpleComman);

	  function PrepModelCommand() {
	    _classCallCheck(this, PrepModelCommand);

	    return _possibleConstructorReturn(this, (PrepModelCommand.__proto__ || Object.getPrototypeOf(PrepModelCommand)).apply(this, arguments));
	  }

	  _createClass(PrepModelCommand, [{
	    key: 'execute',
	    value: function execute() {
	      this.facade.registerProxy(new TodoProxy());
	    }
	  }]);

	  return PrepModelCommand;
	}(puremvc.SimpleCommand);

	module.exports = PrepModelCommand;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _TodoFormMediator = __webpack_require__(8);

	var _TodoFormMediator2 = _interopRequireDefault(_TodoFormMediator);

	var _RoutesMediator = __webpack_require__(11);

	var _RoutesMediator2 = _interopRequireDefault(_RoutesMediator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var puremvc = window.puremvc;

	var PrepViewCommand = function (_puremvc$SimpleComman) {
	  _inherits(PrepViewCommand, _puremvc$SimpleComman);

	  function PrepViewCommand() {
	    _classCallCheck(this, PrepViewCommand);

	    return _possibleConstructorReturn(this, (PrepViewCommand.__proto__ || Object.getPrototypeOf(PrepViewCommand)).apply(this, arguments));
	  }

	  _createClass(PrepViewCommand, [{
	    key: 'execute',
	    value: function execute(note) {
	      console.log('执行PrepViewCommand');
	      this.facade.registerMediator(new _TodoFormMediator2.default());
	      this.facade.registerMediator(new _RoutesMediator2.default());
	    }
	  }]);

	  return PrepViewCommand;
	}(puremvc.SimpleCommand);

	module.exports = PrepViewCommand;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var puremvc = window.puremvc;
	var AppConstants = __webpack_require__(1);
	var AppEvents = __webpack_require__(9);
	var TodoForm = __webpack_require__(10);

	var TodoFormMediator = function (_puremvc$Mediator) {
	  _inherits(TodoFormMediator, _puremvc$Mediator);

	  function TodoFormMediator() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, TodoFormMediator);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TodoFormMediator.__proto__ || Object.getPrototypeOf(TodoFormMediator)).call.apply(_ref, [this].concat(args))), _this), _this.handleEvent = function (event) {
	      switch (event.type) {
	        case AppEvents.TOGGLE_COMPLETE_ALL:
	          _this.sendNotification(AppConstants.TOGGLE_TODO_STATUS, event.doToggleComplete);
	          break;

	        case AppEvents.DELETE_ITEM:
	          _this.sendNotification(AppConstants.DELETE_TODO, event.todoId);
	          break;

	        case AppEvents.ADD_ITEM:
	          console.log(event.todo);
	          _this.sendNotification(AppConstants.ADD_TODO, event.todo);
	          break;

	        case AppEvents.CLEAR_COMPLETED:
	          _this.sendNotification(AppConstants.REMOVE_TODOS_COMPLETED);
	          break;

	        case AppEvents.TOGGLE_COMPLETE:
	        case AppEvents.UPDATE_ITEM:
	          _this.sendNotification(AppConstants.UPDATE_TODO, event.todo);
	          break;
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(TodoFormMediator, [{
	    key: 'listNotificationInterests',
	    value: function listNotificationInterests() {
	      return [AppConstants.TODOS_FILTERED];
	    }

	    // Code to be executed when the Mediator instance is registered with the View

	  }, {
	    key: 'onRegister',
	    value: function onRegister() {
	      this.setViewComponent(new TodoForm());
	      this.viewComponent.addEventListener(AppEvents.TOGGLE_COMPLETE, this.handleEvent);
	      this.viewComponent.addEventListener(AppEvents.TOGGLE_COMPLETE_ALL, this.handleEvent);
	      this.viewComponent.addEventListener(AppEvents.UPDATE_ITEM, this.handleEvent);
	      this.viewComponent.addEventListener(AppEvents.DELETE_ITEM, this.handleEvent);
	      this.viewComponent.addEventListener(AppEvents.ADD_ITEM, this.handleEvent);
	      this.viewComponent.addEventListener(AppEvents.CLEAR_COMPLETED, this.handleEvent);
	    }

	    // Handle events from the view component

	  }, {
	    key: 'handleNotification',


	    // Handle notifications from other PureMVC actors
	    value: function handleNotification(note) {
	      console.log(note, 'handleNotification');
	      switch (note.getName()) {
	        case AppConstants.TODOS_FILTERED:
	          this.viewComponent.setFilteredTodoList(note.getBody());
	          break;
	      }
	    }
	  }]);

	  return TodoFormMediator;
	}(puremvc.Mediator);

	TodoFormMediator.NAME = "TodoFormMediator";


	module.exports = TodoFormMediator;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var AppEvents = {
	  TOGGLE_COMPLETE_ALL: 'toggle_complete_all',
	  TOGGLE_COMPLETE: 'toggle_complete',
	  CLEAR_COMPLETED: 'clear_completed',
	  DELETE_ITEM: 'delete_item',
	  UPDATE_ITEM: 'update_item',
	  ADD_ITEM: 'add_item',

	  // Create event (cross-browser)
	  createEvent: function createEvent(eventName) {
	    var event;
	    if (document.createEvent) {
	      event = document.createEvent('Events');
	      event.initEvent(eventName, false, false);
	    } else if (document.createEventObject) {
	      event = document.createEventObject();
	    }
	    return event;
	  },

	  // Add event listener (cross-browser)
	  addEventListener: function addEventListener(object, type, listener, useCapture) {
	    if (object.addEventListener) {
	      object.addEventListener(type, listener, useCapture);
	    } else if (object.attachEvent) {
	      object.attachEvent(type, listener);
	    }
	  },

	  // Dispatch event (cross-browser)
	  dispatchEvent: function dispatchEvent(object, event) {
	    if (object.dispatchEvent) {
	      object.dispatchEvent(event);
	    } else if (object.fireEvent) {
	      object.fireEvent(event.type, event);
	    }
	  }
	};

	module.exports = AppEvents;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var puremvc = window.puremvc;

	var AppConstants = __webpack_require__(1);
	var AppEvents = __webpack_require__(9);

	var TodoForm = function TodoForm() {
	  // data
	  this.todos = [];
	  this.stats = {};
	  this.filter = '';

	  // Fixed DOM elements managed by this view component
	  this.todoApp = document.querySelector('#todoapp');
	  this.main = this.todoApp.querySelector('#main');
	  this.toggleAllCheckbox = this.todoApp.querySelector('#toggle-all');
	  this.newTodoField = this.todoApp.querySelector('#new-todo');
	  this.todoList = this.todoApp.querySelector('#todo-list');
	  this.footer = this.todoApp.querySelector('#footer');
	  this.todoCount = this.todoApp.querySelector('#todo-count');
	  this.clearButton = this.todoApp.querySelector('#clear-completed');
	  this.filters = this.todoApp.querySelector('#filters');
	  this.filterAll = this.filters.querySelector('#filterAll');
	  this.filterActive = this.filters.querySelector('#filterActive');
	  this.filterCompleted = this.filters.querySelector('#filterCompleted');

	  // Event listeners for fixed UI elements
	  this.newTodoField.component = this;
	  AppEvents.addEventListener(this.newTodoField, 'keypress', function (event) {
	    console.log(event.keyCode);
	    if (event.keyCode === this.component.ENTER_KEY && this.value) {
	      console.log('按下回车键1');
	      this.component.dispatchAddTodo(event);
	    }
	  });

	  this.clearButton.component = this;
	  AppEvents.addEventListener(this.clearButton, 'click', function (event) {
	    this.component.dispatchClearCompleted(event);
	  });

	  this.toggleAllCheckbox.component = this;
	  AppEvents.addEventListener(this.toggleAllCheckbox, 'change', function (event) {
	    this.component.dispatchToggleCompleteAll(event.target.checked);
	  });

	  console.log('实例化TodoForm');
	};

	TodoForm.prototype.ENTER_KEY = 13;
	TodoForm.prototype.ESC_KEY = 27;
	TodoForm.prototype.addEventListener = function (type, listener, useCapture) {
	  AppEvents.addEventListener(this.todoApp, type, listener, useCapture);
	};

	TodoForm.prototype.createEvent = function (eventName) {
	  return AppEvents.createEvent(eventName);
	};

	TodoForm.prototype.dispatchEvent = function (event) {
	  AppEvents.dispatchEvent(this.todoApp, event);
	};

	TodoForm.prototype.abandonEditTodo = function (event) {
	  var todo, todoId, div, inputEditTodo;
	  inputEditTodo = event.target;
	  todoId = inputEditTodo.getAttribute('data-todo-id');
	  todo = this.getTodoById(todoId);
	  inputEditTodo.value = todo.title;
	  inputEditTodo.completed = todo.completed;
	  div = document.getElementById('li_' + todoId);
	  div.className = 'view';
	  this.newTodoField.focus();
	};

	TodoForm.prototype.dispatchToggleComplete = function (event) {
	  var todo, toggleItemCompleteEvent;
	  todo = this.getTodoById(event.target.getAttribute('data-todo-id'));
	  todo.id = event.target.getAttribute('data-todo-id');
	  todo.completed = event.target.checked;
	  toggleItemCompleteEvent = this.createEvent(AppEvents.TOGGLE_COMPLETE);
	  toggleItemCompleteEvent.todo = todo;
	  this.dispatchEvent(toggleItemCompleteEvent);
	};

	TodoForm.prototype.dispatchToggleCompleteAll = function (checked) {
	  var toggleCompleteAllEvent = this.createEvent(AppEvents.TOGGLE_COMPLETE_ALL);
	  toggleCompleteAllEvent.doToggleComplete = checked;
	  this.dispatchEvent(toggleCompleteAllEvent);
	};

	TodoForm.prototype.dispatchClearCompleted = function () {
	  var clearCompleteEvent = this.createEvent(AppEvents.CLEAR_COMPLETED);
	  this.dispatchEvent(clearCompleteEvent);
	};

	TodoForm.prototype.dispatchDelete = function (id) {
	  var deleteItemEvent = this.createEvent(AppEvents.DELETE_ITEM);
	  deleteItemEvent.todoId = id;
	  this.dispatchEvent(deleteItemEvent);
	};

	TodoForm.prototype.dispatchAddTodo = function (event) {
	  var addItemEvent,
	      todo = {};
	  todo.completed = false;
	  todo.title = this.newTodoField.value.trim();
	  console.log(todo.title);
	  if (todo.title === '') {
	    return;
	  }
	  addItemEvent = this.createEvent(AppEvents.ADD_ITEM);
	  addItemEvent.todo = todo;
	  this.dispatchEvent(addItemEvent);
	};

	TodoForm.prototype.dispatchUpdateTodo = function (event) {
	  var eventType,
	      updateItemEvent,
	      todo = {};
	  todo.id = event.target.id.slice(6);
	  todo.title = event.target.value.trim();
	  todo.completed = event.target.completed;
	  eventType = todo.title === "" ? AppEvents.DELETE_ITEM : AppEvents.UPDATE_ITEM;
	  updateItemEvent = this.createEvent(eventType);
	  updateItemEvent.todo = todo;
	  updateItemEvent.todoId = todo.id;
	  this.dispatchEvent(updateItemEvent);
	};

	TodoForm.prototype.setFilteredTodoList = function (data) {
	  var todo, checkbox, label, deleteLink, divDisplay, inputEditTodo, li, i, todoId, div;

	  // Update instance data
	  this.todos = data.todos;
	  this.stats = data.stats;
	  this.filter = data.filter;

	  // Hide main section if no todos
	  this.main.style.display = this.stats.totalTodo ? 'block' : 'none';

	  console.log(data);

	  // Create Todo list
	  this.todoList.innerHTML = '';
	  this.newTodoField.value = '';
	  for (i = 0; i < this.todos.length; i++) {

	    todo = this.todos[i];

	    // Create checkbox
	    checkbox = document.createElement('input');
	    checkbox.className = 'toggle';
	    checkbox.setAttribute('data-todo-id', todo.id);
	    checkbox.type = 'checkbox';
	    checkbox.component = this;
	    AppEvents.addEventListener(checkbox, 'change', function (event) {
	      this.component.dispatchToggleComplete(event);
	    });

	    // Create div text
	    label = document.createElement('label');
	    label.setAttribute('data-todo-id', todo.id);
	    label.appendChild(document.createTextNode(todo.title));

	    // Create delete button
	    deleteLink = document.createElement('button');
	    deleteLink.className = 'destroy';
	    deleteLink.setAttribute('data-todo-id', todo.id);
	    deleteLink.component = this;
	    AppEvents.addEventListener(deleteLink, 'click', function (event) {
	      this.component.dispatchDelete(event.target.getAttribute('data-todo-id'));
	    });

	    // Create divDisplay
	    divDisplay = document.createElement('div');
	    divDisplay.className = 'view';
	    divDisplay.setAttribute('data-todo-id', todo.id);
	    divDisplay.appendChild(checkbox);
	    divDisplay.appendChild(label);
	    divDisplay.appendChild(deleteLink);
	    AppEvents.addEventListener(divDisplay, 'dblclick', function () {
	      todoId = this.getAttribute('data-todo-id');
	      div = document.getElementById('li_' + todoId);
	      inputEditTodo = document.getElementById('input_' + todoId);
	      inputEditTodo.setAttribute('data-todo-id', todoId);
	      div.className = 'editing';
	      inputEditTodo.focus();
	    });

	    // Create todo input
	    inputEditTodo = document.createElement('input');
	    inputEditTodo.id = 'input_' + todo.id;
	    inputEditTodo.className = 'edit';
	    inputEditTodo.value = todo.title;
	    inputEditTodo.completed = todo.completed;
	    inputEditTodo.component = this;
	    AppEvents.addEventListener(inputEditTodo, 'keypress', function (event) {
	      if (event.keyCode === this.component.ENTER_KEY) {
	        console.log("回车");
	        this.component.dispatchUpdateTodo(event);
	      }
	    });

	    AppEvents.addEventListener(inputEditTodo, 'keydown', function (event) {
	      if (event.keyCode === this.component.ESC_KEY) {
	        this.component.abandonEditTodo(event);
	      }
	    });

	    AppEvents.addEventListener(inputEditTodo, 'blur', function (event) {
	      this.component.dispatchUpdateTodo(event);
	    });

	    // Create Todo ListItem and add to list
	    li = document.createElement('li');
	    li.id = 'li_' + todo.id;
	    li.appendChild(divDisplay);
	    li.appendChild(inputEditTodo);
	    if (todo.completed) {
	      li.className += 'completed';
	      checkbox.checked = true;
	    }
	    this.todoList.appendChild(li);
	  }

	  // Update UI
	  this.footer.style.display = this.stats.totalTodo ? 'block' : 'none';
	  this.updateToggleAllCheckbox();
	  this.updateClearButton();
	  this.updateTodoCount();
	  this.updateFilter();
	};

	TodoForm.prototype.getTodoById = function (id) {
	  var i;
	  for (i = 0; i < this.todos.length; i++) {
	    if (this.todos[i].id === id) {
	      return this.todos[i];
	    }
	  }
	};

	TodoForm.prototype.updateFilter = function () {
	  this.filterAll.className = this.filter === AppConstants.FILTER_ALL ? 'selected' : '';
	  this.filterActive.className = this.filter === AppConstants.FILTER_ACTIVE ? 'selected' : '';
	  this.filterCompleted.className = this.filter === AppConstants.FILTER_COMPLETED ? 'selected' : '';
	};

	TodoForm.prototype.updateToggleAllCheckbox = function () {
	  var i,
	      checked = this.todos.length > 0;
	  for (i = 0; i < this.todos.length; i++) {
	    if (this.todos[i].completed === false) {
	      checked = false;
	      break;
	    }
	  }
	  this.toggleAllCheckbox.checked = checked;
	};

	TodoForm.prototype.updateClearButton = function () {
	  this.clearButton.style.display = this.stats.todoCompleted === 0 ? 'none' : 'block';
	  this.clearButton.innerHTML = 'Clear completed (' + this.stats.todoCompleted + ')';
	};

	TodoForm.prototype.updateTodoCount = function () {
	  var number = document.createElement('strong'),
	      text = ' ' + (this.stats.todoLeft === 1 ? 'item' : 'items') + ' left';
	  number.innerHTML = this.stats.todoLeft;
	  this.todoCount.innerHTML = null;
	  this.todoCount.appendChild(number);
	  this.todoCount.appendChild(document.createTextNode(text));
	};

	module.exports = TodoForm;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AppConstants = __webpack_require__(1);

	var _AppConstants2 = _interopRequireDefault(_AppConstants);

	var _TodoProxy = __webpack_require__(5);

	var _TodoProxy2 = _interopRequireDefault(_TodoProxy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var puremvc = window.puremvc;
	var Router = window.Router;

	var RoutesMediator = function (_puremvc$Mediator) {
	  _inherits(RoutesMediator, _puremvc$Mediator);

	  function RoutesMediator() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, RoutesMediator);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RoutesMediator.__proto__ || Object.getPrototypeOf(RoutesMediator)).call.apply(_ref, [this].concat(args))), _this), _this.router = null, _this.handleFilterAll = function () {
	      _this.facade.sendNotification(_AppConstants2.default.FILTER_TODOS, _AppConstants2.default.FILTER_ALL);
	    }, _this.handleFilterActive = function () {
	      _this.facade.sendNotification(_AppConstants2.default.FILTER_TODOS, _AppConstants2.default.FILTER_ACTIVE);
	    }, _this.handleFilterCompleted = function () {
	      _this.facade.sendNotification(_AppConstants2.default.FILTER_TODOS, _AppConstants2.default.FILTER_COMPLETED);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(RoutesMediator, [{
	    key: 'onRegister',
	    value: function onRegister() {
	      var todoProxy = this.facade.retrieveProxy(_TodoProxy2.default.NAME),
	          defaultRoute = this.getRouteForFilter(todoProxy.filter),
	          options = { resource: this, notfound: this.handleFilterAll },
	          routes = {
	        '/': this.handleFilterAll,
	        '/active': this.handleFilterActive,
	        '/completed': this.handleFilterCompleted
	      };

	      this.router = new Router(routes).configure(options);
	      this.router.init(defaultRoute);
	    }
	  }, {
	    key: 'getRouteForFilter',
	    value: function getRouteForFilter(filter) {
	      var route;
	      switch (filter) {
	        case _AppConstants2.default.FILTER_ALL:
	          route = '/';
	          break;

	        case _AppConstants2.default.FILTER_ACTIVE:
	          route = '/active';
	          break;

	        case _AppConstants2.default.FILTER_COMPLETED:
	          route = '/completed';
	          break;
	      }
	      return route;
	    }
	  }]);

	  return RoutesMediator;
	}(puremvc.Mediator);

	RoutesMediator.NAME = 'RoutesMediator';


	module.exports = RoutesMediator;

/***/ }
/******/ ]);