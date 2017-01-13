(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.puremvc = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

module.exports = _dereq_('./puremvc').default;

},{"./puremvc":13}],2:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observer = _dereq_('../patterns/observer/Observer');

var _Observer2 = _interopRequireDefault(_Observer);

var _View = _dereq_('./View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller(key) {
    _classCallCheck(this, Controller);

    this.view = null;
    this.commandMap = null;
    this.multitonKey = null;

    if (Controller.instanceMap[key] != null) {
      throw new Error(Controller.MULTITON_MSG);
    }

    this.multitonKey = key;
    Controller.instanceMap[this.multitonKey] = this;
    this.commandMap = new Array();
    this.initializeController();
  }

  _createClass(Controller, [{
    key: 'initializeController',
    value: function initializeController() {
      this.view = _View2.default.getInstance(this.multitonKey);
    }
  }, {
    key: 'executeCommand',
    value: function executeCommand(note) {
      var commandClassRef = this.commandMap[note.getName()];
      if (commandClassRef == null) {
        return;
      }

      var commandInstance = new commandClassRef();
      commandInstance.initializeNotifier(this.multitonKey);
      commandInstance.execute(note);
    }
  }, {
    key: 'registerCommand',
    value: function registerCommand(notificationName, commandClassRef) {
      if (this.commandMap[notificationName] == null) {
        this.view.registerObserver(notificationName, new _Observer2.default(this.executeCommand, this));
      }

      this.commandMap[notificationName] = commandClassRef;
    }
  }, {
    key: 'hasCommand',
    value: function hasCommand(notificationName) {
      return this.commandMap[notificationName] != null;
    }
  }, {
    key: 'removeCommand',
    value: function removeCommand(notificationName) {
      if (this.hasCommand(notificationName)) {
        this.view.removeObserver(notificationName, this);
        this.commandMap[notificationName] = null;
      }
    }
  }], [{
    key: 'getInstance',
    value: function getInstance(key) {
      if (null == key) {
        return null;
      }

      if (null == Controller.instanceMap[key]) {
        Controller.instanceMap[key] = new Controller(key);
      }
      return Controller.instanceMap[key];
    }
  }, {
    key: 'removeController',
    value: function removeController(key) {
      delete Controller.instanceMap[key];
    }
  }]);

  return Controller;
}();

Controller.instanceMap = [];
Controller.MULTITON_MSG = "controller key for this Multiton key already constructed";
exports.default = Controller;

},{"../patterns/observer/Observer":11,"./View":4}],3:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  function Model(key) {
    _classCallCheck(this, Model);

    this.proxyMap = null;
    this.multitonKey = null;

    if (Model.instanceMap[key]) {
      throw new Error(Model.MULTITON_MSG);
    }

    this.multitonKey = key;
    Model.instanceMap[key] = this;
    this.proxyMap = [];
    this.initializeModel();
  }

  _createClass(Model, [{
    key: "initializeModel",
    value: function initializeModel() {}

    /**
     * 注册代理
     */

  }, {
    key: "registerProxy",
    value: function registerProxy(proxy) {
      proxy.initializeNotifier(this.multitonKey);
      this.proxyMap[proxy.getProxyName()] = proxy;
      proxy.onRegister();
    }

    /**
     * 取得中介
     */

  }, {
    key: "retrieveProxy",
    value: function retrieveProxy(proxyName) {
      return this.proxyMap[proxyName];
    }

    /**
     * 是否存在中介
     */

  }, {
    key: "hasProxy",
    value: function hasProxy(proxyName) {
      return this.proxyMap[proxyName] != null;
    }

    /**
     * 移除中介
     */

  }, {
    key: "removeProxy",
    value: function removeProxy(proxyName) {
      var proxy = this.proxyMap[proxyName];
      if (proxy) {
        this.proxyMap[proxyName] = null;
        proxy.onRemove();
      }

      return proxy;
    }
  }], [{
    key: "removeModel",
    value: function removeModel(key) {
      delete Model.instanceMap[key];
    }
  }, {
    key: "getInstance",
    value: function getInstance(key) {
      if (null == key) {
        return null;
      }

      if (Model.instanceMap[key] == null) {
        Model.instanceMap[key] = new Model(key);
      }

      return Model.instanceMap[key];
    }
  }]);

  return Model;
}();

Model.instanceMap = [];
Model.MULTITON_MSG = "Model instance for this Multiton key already constructed!";
exports.default = Model;

},{}],4:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observer = _dereq_("../patterns/observer/Observer");

var _Observer2 = _interopRequireDefault(_Observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View(key) {
    _classCallCheck(this, View);

    this.mediatorMap = null;
    this.observerMap = null;
    this.multitonKey = null;

    if (View.instanceMap[key] != null) {
      throw new Error(View.MULTITON_MSG);
    }

    this.multitonKey = key;
    View.instanceMap[this.multitonKey] = this;
    this.mediatorMap = [];
    this.observerMap = [];
    this.initializeView();
  }

  _createClass(View, [{
    key: "initializeView",
    value: function initializeView() {
      return;
    }
  }, {
    key: "registerObserver",
    value: function registerObserver(notificationName, observer) {
      if (this.observerMap[notificationName] != null) {
        this.observerMap[notificationName].push(observer);
      } else {
        this.observerMap[notificationName] = [observer];
      }
    }
  }, {
    key: "notifyObservers",
    value: function notifyObservers(notification) {
      if (this.observerMap[notification.getName()] != null) {
        var observers_ref = this.observerMap[notification.getName()],
            observers = [],
            observer = void 0;

        for (var i = 0, len = observers_ref.length; i < len; i++) {
          observer = observers_ref[i];
          observers.push(observer);
        }

        for (var _i = 0, _len = observers.length; _i < _len; _i++) {
          observer = observers[_i];
          observer.notifyObserver(notification);
        }
      }
    }
  }, {
    key: "removeObserver",
    value: function removeObserver(notificationName, notifyContext) {
      var observers = this.observerMap[notificationName];
      for (var i = 0, len = observers.length; i < len; i++) {
        if (observers[i].compareNotifyContext(notifyContext) == true) {
          observers.splice(i, 1);
          break;
        }
      }

      if (observers.length == 0) {
        delete this.observerMap[notificationName];
      }
    }

    /**
     * 注册中介
     */

  }, {
    key: "registerMediator",
    value: function registerMediator(mediator) {
      if (this.mediatorMap[mediator.getMediatorName()] != null) {
        return;
      }

      mediator.initializeNotifier(this.multitonKey);
      // register the mediator for retrieval by name
      this.mediatorMap[mediator.getMediatorName()] = mediator;

      // get notification interests if any
      var interests = mediator.listNotificationInterests();

      // register mediator as an observer for each notification
      if (interests.length > 0) {
        // create observer referencing this mediators handleNotification method
        var observer = new _Observer2.default(mediator.handleNotification, mediator);
        for (var i = 0, len = interests.length; i < len; i++) {
          this.registerObserver(interests[i], observer);
        }
      }

      mediator.onRegister();
    }

    /**
     * 根据中介名取得中介
     */

  }, {
    key: "retrieveMediator",
    value: function retrieveMediator(mediatorName) {
      return this.mediatorMap[mediatorName];
    }

    /**
     * 移除中介
     */

  }, {
    key: "removeMediator",
    value: function removeMediator(mediatorName) {
      var mediator = this.mediatorMap[mediatorName];
      if (mediator) {
        // for every notification the mediator is interested in...
        var interests = mediator.listNotificationInterests();
        for (var i = 0, len = interests.length; i < len; i++) {
          // remove the observer linking the mediator to the notification
          // interest
          this.removeObserver(interests[i], mediator);
        }

        // remove the mediator from the map
        delete this.mediatorMap[mediatorName];

        // alert the mediator that it has been removed
        mediator.onRemove();
      }

      return mediator;
    }

    /**
     * 是否存在中介
     */

  }, {
    key: "hasMediator",
    value: function hasMediator(mediatorName) {
      return this.mediatorMap[mediatorName] != null;
    }
  }], [{
    key: "removeView",
    value: function removeView(key) {
      delete View.instanceMap[key];
    }
  }, {
    key: "getInstance",
    value: function getInstance(key) {
      if (null == key) {
        return null;
      }

      if (View.instanceMap[key] == null) {
        View.instanceMap[key] = new View(key);
      }

      return View.instanceMap[key];
    }
  }]);

  return View;
}();

View.instanceMap = [];
View.MULTITON_MSG = "View instance for this Multiton key already constructed!";
exports.default = View;

},{"../patterns/observer/Observer":11}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Notifier2 = _dereq_('../observer/Notifier');

var _Notifier3 = _interopRequireDefault(_Notifier2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MacroCommand = function (_Notifier) {
  _inherits(MacroCommand, _Notifier);

  function MacroCommand() {
    _classCallCheck(this, MacroCommand);

    var _this = _possibleConstructorReturn(this, (MacroCommand.__proto__ || Object.getPrototypeOf(MacroCommand)).call(this));

    _this.subCommands = null;

    _this.subCommands = [];
    _this.initializeMacroCommand();
    return _this;
  }

  _createClass(MacroCommand, [{
    key: 'initializeMacroCommand',
    value: function initializeMacroCommand() {}
  }, {
    key: 'addSubCommand',
    value: function addSubCommand(commandClassRef) {
      this.subCommands.push(commandClassRef);
    }
  }, {
    key: 'execute',
    value: function execute(note) {
      while (this.subCommands.length > 0) {
        var ref = this.subCommands.shift();
        var cmd = new ref();
        cmd.initializeNotifier(this.multitonKey);
        cmd.execute(note);
      }
    }
  }]);

  return MacroCommand;
}(_Notifier3.default);

exports.default = MacroCommand;

},{"../observer/Notifier":10}],6:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Notifier2 = _dereq_('../observer/Notifier');

var _Notifier3 = _interopRequireDefault(_Notifier2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleCommand = function (_Notifier) {
  _inherits(SimpleCommand, _Notifier);

  function SimpleCommand() {
    _classCallCheck(this, SimpleCommand);

    return _possibleConstructorReturn(this, (SimpleCommand.__proto__ || Object.getPrototypeOf(SimpleCommand)).apply(this, arguments));
  }

  _createClass(SimpleCommand, [{
    key: 'execute',


    /**
     * 执行
     * param note
     */
    value: function execute(note) {}
  }]);

  return SimpleCommand;
}(_Notifier3.default);

exports.default = SimpleCommand;

},{"../observer/Notifier":10}],7:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Controller = _dereq_('../../core/Controller');

var _Controller2 = _interopRequireDefault(_Controller);

var _Model = _dereq_('../../core/Model');

var _Model2 = _interopRequireDefault(_Model);

var _View = _dereq_('../../core/View');

var _View2 = _interopRequireDefault(_View);

var _Notification = _dereq_('../observer/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Facade = function () {
  function Facade(key) {
    _classCallCheck(this, Facade);

    this.controller = null;
    this.model = null;
    this.view = null;
    this.multitonKey = null;

    if (Facade.instanceMap[key] != null) {
      throw new Error(Facade.MULTITON_MSG);
    }

    this.initializeNotifier(key);
    Facade.instanceMap[key] = this;
    this.initializeFacade();
  }

  _createClass(Facade, [{
    key: 'initializeFacade',
    value: function initializeFacade() {
      this.initializeModel();
      this.initializeController();
      this.initializeView();
    }
  }, {
    key: 'initializeController',
    value: function initializeController() {
      if (this.controller != null) {
        return;
      }

      this.controller = _Controller2.default.getInstance(this.multitonKey);
    }
  }, {
    key: 'initializeModel',
    value: function initializeModel() {
      if (this.model != null) {
        return;
      }

      this.model = _Model2.default.getInstance(this.multitonKey);
    }
  }, {
    key: 'initializeView',
    value: function initializeView() {
      if (this.view != null) {
        return;
      }

      this.view = _View2.default.getInstance(this.multitonKey);
    }
  }, {
    key: 'registerCommand',
    value: function registerCommand(notificationName, commandClassRef) {
      this.controller.registerCommand(notificationName, commandClassRef);
    }
  }, {
    key: 'removeCommand',
    value: function removeCommand(notificationName) {
      this.controller.removeCommand(notificationName);
    }
  }, {
    key: 'hasCommand',
    value: function hasCommand(notificationName) {
      return this.controller.hasCommand(notificationName);
    }
  }, {
    key: 'registerProxy',
    value: function registerProxy(proxy) {
      this.model.registerProxy(proxy);
    }
  }, {
    key: 'retrieveProxy',
    value: function retrieveProxy(proxyName) {
      return this.model.retrieveProxy(proxyName);
    }
  }, {
    key: 'removeProxy',
    value: function removeProxy(proxyName) {
      var proxy = null;
      if (this.model != null) {
        proxy = this.model.removeProxy(proxyName);
      }

      return proxy;
    }
  }, {
    key: 'hasProxy',
    value: function hasProxy(proxyName) {
      return this.model.hasProxy(proxyName);
    }
  }, {
    key: 'registerMediator',
    value: function registerMediator(mediator) {
      if (this.view != null) {
        this.view.registerMediator(mediator);
      }
    }
  }, {
    key: 'retrieveMediator',
    value: function retrieveMediator(mediatorName) {
      return this.view.retrieveMediator(mediatorName);
    }
  }, {
    key: 'removeMediator',
    value: function removeMediator(mediatorName) {
      var mediator = null;
      if (this.view != null) {
        mediator = this.view.removeMediator(mediatorName);
      }

      return mediator;
    }
  }, {
    key: 'hasMediator',
    value: function hasMediator(mediatorName) {
      return this.view.hasMediator(mediatorName);
    }
  }, {
    key: 'sendNotification',
    value: function sendNotification(notificationName, body, type) {
      this.notifyObservers(new _Notification2.default(notificationName, body, type));
    }
  }, {
    key: 'notifyObservers',
    value: function notifyObservers(notification) {
      if (this.view != null) {
        this.view.notifyObservers(notification);
      }
    }
  }, {
    key: 'initializeNotifier',
    value: function initializeNotifier(key) {
      this.multitonKey = key;
    }
  }], [{
    key: 'hasCore',
    value: function hasCore(key) {
      return Facade.instanceMap[key] != null;
    }
  }, {
    key: 'removeCore',
    value: function removeCore(key) {
      if (Facade.instanceMap[key] == null) {
        return;
      }

      _Model2.default.removeModel(key);
      _View2.default.removeView(key);
      _Controller2.default.removeController(key);
      delete Facade.instanceMap[key];
    }
  }, {
    key: 'getInstance',
    value: function getInstance(key) {
      if (null == key) {
        return null;
      }

      if (Facade.instanceMap[key] == null) {
        Facade.instanceMap[key] = new Facade(key);
      }

      return Facade.instanceMap[key];
    }
  }]);

  return Facade;
}();

Facade.instanceMap = [];
Facade.MULTITON_MSG = "Facade instance for this Multiton key already constructed!";
exports.default = Facade;

},{"../../core/Controller":2,"../../core/Model":3,"../../core/View":4,"../observer/Notification":9}],8:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Notifier2 = _dereq_("../observer/Notifier");

var _Notifier3 = _interopRequireDefault(_Notifier2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mediator = function (_Notifier) {
  _inherits(Mediator, _Notifier);

  function Mediator(mediatorName, viewComponent) {
    _classCallCheck(this, Mediator);

    var _this = _possibleConstructorReturn(this, (Mediator.__proto__ || Object.getPrototypeOf(Mediator)).call(this));

    _this.mediatorName = null;
    _this.viewComponent = null;

    _this.mediatorName = mediatorName || _this.constructor.NAME;
    _this.viewComponent = viewComponent;
    return _this;
  }

  _createClass(Mediator, [{
    key: "getMediatorName",
    value: function getMediatorName() {
      return this.mediatorName;
    }
  }, {
    key: "setViewComponent",
    value: function setViewComponent(viewComponent) {
      this.viewComponent = viewComponent;
    }
  }, {
    key: "getViewComponent",
    value: function getViewComponent() {
      return this.viewComponent;
    }
  }, {
    key: "listNotificationInterests",
    value: function listNotificationInterests() {
      return [];
    }
  }, {
    key: "handleNotification",
    value: function handleNotification(notification) {
      return;
    }
  }, {
    key: "onRegister",
    value: function onRegister() {
      return;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      return;
    }
  }]);

  return Mediator;
}(_Notifier3.default);

Mediator.NAME = "Mediator";
exports.default = Mediator;

},{"../observer/Notifier":10}],9:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notification = function () {
  function Notification(name, body, type) {
    _classCallCheck(this, Notification);

    this.name = null;
    this.type = null;
    this.body = null;

    this.name = name;
    this.body = body;
    this.type = type;
  }

  _createClass(Notification, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "setBody",
    value: function setBody(body) {
      this.body = body;
    }
  }, {
    key: "getBody",
    value: function getBody() {
      return this.body;
    }
  }, {
    key: "setType",
    value: function setType(type) {
      this.type = type;
    }
  }, {
    key: "getType",
    value: function getType() {
      return this.type;
    }
  }, {
    key: "toString",
    value: function toString() {
      var msg = "Notification Name: " + this.getName();
      msg += "\nBody:" + (this.body == null ? "null" : this.body.toString());
      msg += "\nType:" + (this.type == null ? "null" : this.type);
      return msg;
    }
  }]);

  return Notification;
}();

exports.default = Notification;

},{}],10:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Facade = _dereq_("../facade/Facade");

var _Facade2 = _interopRequireDefault(_Facade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notifier = function () {
  function Notifier() {
    _classCallCheck(this, Notifier);

    this.facade = null;
    this.multitonKey = null;
  }

  _createClass(Notifier, [{
    key: "sendNotification",
    value: function sendNotification(notificationName, body, type) {
      var facade = this.getFacade();
      if (facade) {
        facade.sendNotification(notificationName, body, type);
      }
    }
  }, {
    key: "initializeNotifier",
    value: function initializeNotifier(key) {
      this.multitonKey = String(key);
      this.facade = this.getFacade();
    }
  }, {
    key: "getFacade",
    value: function getFacade() {
      if (this.multitonKey == null) {
        throw new Error(Notifier.MULTITON_MSG);
      }

      return _Facade2.default.getInstance(this.multitonKey);
    }
  }]);

  return Notifier;
}();

Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
exports.default = Notifier;

},{"../facade/Facade":7}],11:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function () {
  function Observer(notifyMethod, notifyContext) {
    _classCallCheck(this, Observer);

    this.notify = null;
    this.context = null;

    this.setNotifyMethod(notifyMethod);
    this.setNotifyContext(notifyContext);
  }

  _createClass(Observer, [{
    key: "setNotifyMethod",
    value: function setNotifyMethod(notifyMethod) {
      this.notify = notifyMethod;
    }
  }, {
    key: "setNotifyContext",
    value: function setNotifyContext(notifyContext) {
      this.context = notifyContext;
    }
  }, {
    key: "getNotifyMethod",
    value: function getNotifyMethod() {
      return this.notify;
    }
  }, {
    key: "getNotifyContext",
    value: function getNotifyContext() {
      return this.context;
    }
  }, {
    key: "notifyObserver",
    value: function notifyObserver(notification) {
      this.getNotifyMethod().call(this.getNotifyContext(), notification);
    }
  }, {
    key: "compareNotifyContext",
    value: function compareNotifyContext(object) {
      return object === this.context;
    }
  }]);

  return Observer;
}();

exports.default = Observer;

},{}],12:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Notifier2 = _dereq_("../observer/Notifier");

var _Notifier3 = _interopRequireDefault(_Notifier2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Proxy = function (_Notifier) {
  _inherits(Proxy, _Notifier);

  function Proxy(proxyName, data) {
    _classCallCheck(this, Proxy);

    var _this = _possibleConstructorReturn(this, (Proxy.__proto__ || Object.getPrototypeOf(Proxy)).call(this));

    _this.proxyName = null;
    _this.data = null;

    _this.proxyName = proxyName || _this.constructor.NAME;
    if (data != null) {
      _this.setData(data);
    }
    return _this;
  }

  _createClass(Proxy, [{
    key: "getProxyName",
    value: function getProxyName() {
      return this.proxyName;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "onRegister",
    value: function onRegister() {
      return;
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      return;
    }
  }]);

  return Proxy;
}(_Notifier3.default);

Proxy.NAME = "Proxy";
exports.default = Proxy;

},{"../observer/Notifier":10}],13:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _View = _dereq_('./org/puremvc/es6/multicore/core/View');

var _View2 = _interopRequireDefault(_View);

var _Model = _dereq_('./org/puremvc/es6/multicore/core/Model');

var _Model2 = _interopRequireDefault(_Model);

var _Controller = _dereq_('./org/puremvc/es6/multicore/core/Controller');

var _Controller2 = _interopRequireDefault(_Controller);

var _SimpleCommand = _dereq_('./org/puremvc/es6/multicore/patterns/command/SimpleCommand');

var _SimpleCommand2 = _interopRequireDefault(_SimpleCommand);

var _MacroCommand = _dereq_('./org/puremvc/es6/multicore/patterns/command/MacroCommand');

var _MacroCommand2 = _interopRequireDefault(_MacroCommand);

var _Facade = _dereq_('./org/puremvc/es6/multicore/patterns/facade/Facade');

var _Facade2 = _interopRequireDefault(_Facade);

var _Mediator = _dereq_('./org/puremvc/es6/multicore/patterns/mediator/Mediator');

var _Mediator2 = _interopRequireDefault(_Mediator);

var _Observer = _dereq_('./org/puremvc/es6/multicore/patterns/observer/Observer');

var _Observer2 = _interopRequireDefault(_Observer);

var _Notification = _dereq_('./org/puremvc/es6/multicore/patterns/observer/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _Notifier = _dereq_('./org/puremvc/es6/multicore/patterns/observer/Notifier');

var _Notifier2 = _interopRequireDefault(_Notifier);

var _Proxy = _dereq_('./org/puremvc/es6/multicore/patterns/proxy/Proxy');

var _Proxy2 = _interopRequireDefault(_Proxy);

var _Utils = _dereq_('./utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var puremvc = {
  View: _View2.default,
  Model: _Model2.default,
  Controller: _Controller2.default,
  SimpleCommand: _SimpleCommand2.default,
  MacroCommand: _MacroCommand2.default,
  Facade: _Facade2.default,
  Mediator: _Mediator2.default,
  Observer: _Observer2.default,
  Notification: _Notification2.default,
  Notifier: _Notifier2.default,
  Proxy: _Proxy2.default,
  extendClass: _Utils2.default.extendClass
};

exports.default = puremvc;

},{"./org/puremvc/es6/multicore/core/Controller":2,"./org/puremvc/es6/multicore/core/Model":3,"./org/puremvc/es6/multicore/core/View":4,"./org/puremvc/es6/multicore/patterns/command/MacroCommand":5,"./org/puremvc/es6/multicore/patterns/command/SimpleCommand":6,"./org/puremvc/es6/multicore/patterns/facade/Facade":7,"./org/puremvc/es6/multicore/patterns/mediator/Mediator":8,"./org/puremvc/es6/multicore/patterns/observer/Notification":9,"./org/puremvc/es6/multicore/patterns/observer/Notifier":10,"./org/puremvc/es6/multicore/patterns/observer/Observer":11,"./org/puremvc/es6/multicore/patterns/proxy/Proxy":12,"./utils/Utils":14}],14:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "extendClass",
    value: function extendClass(ClassFunc) {
      var BaseClass = ClassFunc;
      BaseClass.prototype = new ClassFunc();
      BaseClass.prototype.constructor = BaseClass;
      return BaseClass;
    }
  }]);

  return Utils;
}();

exports.default = Utils;

},{}]},{},[1])(1)
});

//# sourceMappingURL=puremvc.js.map
