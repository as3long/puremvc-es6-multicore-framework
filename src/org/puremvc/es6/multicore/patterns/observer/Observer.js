class Observer {
  notify = null;
  context = null;
  constructor(notifyMethod, notifyContext) {
    this.setNotifyMethod(notifyMethod);
    this.setNotifyContext(notifyContext);
  }

  setNotifyMethod(notifyMethod) {
    this.notify= notifyMethod;
  }

  setNotifyContext(notifyContext) {
    this.context= notifyContext;
  }

  getNotifyMethod() {
    return this.notify;
  }

  getNotifyContext() {
    return this.context;
  }

  notifyObserver(notification) {
    this.getNotifyMethod().call(this.getNotifyContext(), notification);
  }

  compareNotifyContext(object) {
    return object === this.context;
  }
}

export default Observer;