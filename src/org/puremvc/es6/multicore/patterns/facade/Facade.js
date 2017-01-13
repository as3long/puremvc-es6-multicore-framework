import Controller from '../../core/Controller';
import Model from '../../core/Model';
import View from '../../core/View';
import Notification from '../observer/Notification';

class Facade {
  controller = null;
  model = null;
  view = null;
  multitonKey = null;
  constructor(key) {
    if (Facade.instanceMap[key] != null) {
      throw new Error(Facade.MULTITON_MSG);
    }

    this.initializeNotifier(key);
    Facade.instanceMap[key] = this;
    this.initializeFacade();
  }

  initializeFacade() {
    this.initializeModel();
    this.initializeController();
    this.initializeView();
  }

  initializeController() {
    if (this.controller != null) {
      return;
    }

    this.controller = Controller.getInstance(this.multitonKey);
  }

  initializeModel() {
    if (this.model != null) {
      return;
    }

    this.model = Model.getInstance(this.multitonKey);
  }

  initializeView() {
    if (this.view != null) {
      return;
    }

    this.view = View.getInstance(this.multitonKey);
  }

  registerCommand(notificationName, commandClassRef) {
    this.controller.registerCommand(notificationName, commandClassRef);
  }

  removeCommand(notificationName) {
    this.controller.removeCommand(notificationName);
  }

  hasCommand(notificationName) {
    return this.controller.hasCommand(notificationName);
  }

  registerProxy(proxy) {
    this.model.registerProxy(proxy);
  }

  retrieveProxy(proxyName) {
    return this.model.retrieveProxy(proxyName);
  }

  removeProxy(proxyName) {
    let proxy = null;
    if (this.model != null) {
      proxy = this.model.removeProxy(proxyName);
    }

    return proxy;
  }

  hasProxy(proxyName) {
    return this.model.hasProxy(proxyName);
  }

  registerMediator(mediator) {
    if (this.view != null) {
      this.view.registerMediator(mediator);
    }
  }

  retrieveMediator(mediatorName) {
    return this.view.retrieveMediator(mediatorName);
  }

  removeMediator(mediatorName) {
    var mediator = null;
    if (this.view != null) {
      mediator = this.view.removeMediator(mediatorName);
    }

    return mediator;
  }

  hasMediator(mediatorName) {
    return this.view.hasMediator(mediatorName);
  }

  sendNotification(notificationName, body, type) {
    this.notifyObservers(new Notification(notificationName, body, type));
  }

  notifyObservers(notification) {
    if (this.view != null) {
      this.view.notifyObservers(notification);
    }
  }

  initializeNotifier(key) {
    this.multitonKey = key;
  }

  static instanceMap = [];
  static MULTITON_MSG = "Facade instance for this Multiton key already constructed!";

  static hasCore(key) {
    return Facade.instanceMap[key] != null;
  }

  static removeCore(key) {
    if (Facade.instanceMap[key] == null) {
      return;
    }

    Model.removeModel(key);
    View.removeView(key);
    Controller.removeController(key);
    delete Facade.instanceMap[key];
  }

  static getInstance(key) {
    if (null == key) {
      return null;
    }

    if (Facade.instanceMap[key] == null) {
      Facade.instanceMap[key] = new Facade(key);
    }

    return Facade.instanceMap[key];
  }
}

export default Facade;