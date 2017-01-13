import Observer from '../patterns/observer/Observer';
import View from './View';

class Controller {
  view = null;
  commandMap = null;
  multitonKey = null;

  constructor(key) {
    if (Controller.instanceMap[key] != null) {
      throw new Error(Controller.MULTITON_MSG);
    }

    this.multitonKey = key;
    Controller.instanceMap[this.multitonKey] = this;
    this.commandMap = new Array();
    this.initializeController();
  }

  initializeController() {
    this.view = View.getInstance(this.multitonKey);
  }

  executeCommand(note) {
    let commandClassRef = this.commandMap[note.getName()];
    if (commandClassRef == null) {
      return;
    }

    let commandInstance = new commandClassRef();
    commandInstance.initializeNotifier(this.multitonKey);
    commandInstance.execute(note);
  }

  registerCommand(notificationName, commandClassRef) {
    if (this.commandMap[notificationName] == null) {
      this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
    }

    this.commandMap[notificationName] = commandClassRef;
  }

  hasCommand(notificationName) {
    return this.commandMap[notificationName] != null;
  }

  removeCommand(notificationName) {
    if (this.hasCommand(notificationName)) {
      this.view.removeObserver(notificationName, this);
      this.commandMap[notificationName] = null;
    }
  }

  static instanceMap = [];
  static MULTITON_MSG = "controller key for this Multiton key already constructed";
  static getInstance(key) {
    if (null == key) {
      return null;
    }

    if (null == Controller.instanceMap[key]) {
      Controller.instanceMap[key] = new Controller(key);
    }
    return Controller.instanceMap[key];
  }

  static removeController(key) {
    delete Controller.instanceMap[key];
  }
}

export default Controller;