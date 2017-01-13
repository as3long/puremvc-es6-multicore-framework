import Observer from '../patterns/observer/Observer';

class View {
  mediatorMap = null;
  observerMap = null;
  multitonKey = null;
  constructor(key) {
    if (View.instanceMap[key] != null) {
      throw new Error(View.MULTITON_MSG);
    }

    this.multitonKey = key;
    View.instanceMap[this.multitonKey] = this;
    this.mediatorMap = [];
    this.observerMap = [];
    this.initializeView();
  }

  initializeView() {
    return;
  }

  registerObserver(notificationName, observer) {
    if (this.observerMap[notificationName] != null) {
      this.observerMap[notificationName].push(observer);
    } else {
      this.observerMap[notificationName] = [observer];
    }
  }

  notifyObservers(notification) {
    if (this.observerMap[notification.getName()] != null) {
      let observers_ref = this.observerMap[notification.getName()],
        observers = [],
        observer

      for (let i = 0, len = observers_ref.length; i < len; i++) {
        observer = observers_ref[i];
        observers.push(observer);
      }

      for (let i = 0, len = observers.length; i < len; i++) {
        observer = observers[i];
        observer.notifyObserver(notification);
      }
    }
  }

  removeObserver(notificationName, notifyContext) {
    var observers = this.observerMap[notificationName];
    for (let i = 0, len = observers.length; i < len; i++) {
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
  registerMediator(mediator) {
    if (this.mediatorMap[mediator.getMediatorName()] != null) {
      return;
    }

    mediator.initializeNotifier(this.multitonKey);
    // register the mediator for retrieval by name
    this.mediatorMap[mediator.getMediatorName()] = mediator;

    // get notification interests if any
    let interests = mediator.listNotificationInterests();

    // register mediator as an observer for each notification
    if (interests.length > 0) {
      // create observer referencing this mediators handleNotification method
      let observer = new Observer(mediator.handleNotification, mediator);
      for (let i = 0, len = interests.length; i < len; i++) {
        this.registerObserver(interests[i], observer);
      }
    }

    mediator.onRegister();
  }

  /**
   * 根据中介名取得中介
   */
  retrieveMediator(mediatorName) {
    return this.mediatorMap[mediatorName];
  }

  /**
   * 移除中介
   */
  removeMediator(mediatorName) {
    let mediator = this.mediatorMap[mediatorName];
    if (mediator) {
      // for every notification the mediator is interested in...
      var interests = mediator.listNotificationInterests();
      for (let i = 0, len = interests.length; i < len; i++) {
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
  hasMediator(mediatorName) {
    return this.mediatorMap[mediatorName] != null;
  }

  static instanceMap = [];
  static MULTITON_MSG = "View instance for this Multiton key already constructed!";
  static removeView(key) {
    delete View.instanceMap[key];
  }

  static getInstance(key) {
    if (null == key) {
      return null;
    }

    if (View.instanceMap[key] == null) {
      View.instanceMap[key] = new View(key);
    }

    return View.instanceMap[key];
  }
}

export default View;