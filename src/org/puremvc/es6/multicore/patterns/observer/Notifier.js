import Facade from '../facade/Facade';

class Notifier {
  facade = null;
  multitonKey = null;
  sendNotification(notificationName, body, type) {
    let facade = this.getFacade();
    if (facade) {
      facade.sendNotification(notificationName, body, type);
    }
  }

  initializeNotifier(key) {
    this.multitonKey = String(key);
    this.facade = this.getFacade();
  }

  getFacade() {
    if (this.multitonKey == null) {
      throw new Error(Notifier.MULTITON_MSG);
    }

    return Facade.getInstance(this.multitonKey);
  }

  static MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
}

export default Notifier;