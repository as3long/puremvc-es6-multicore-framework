import Notifier from '../observer/Notifier';
class Mediator extends Notifier {
  mediatorName = null;
  viewComponent = null;
  constructor(mediatorName, viewComponent) {
    super();
    this.mediatorName= mediatorName || this.constructor.NAME;
    this.viewComponent=viewComponent;  
  }

  getMediatorName() {
    return this.mediatorName;
  }

  setViewComponent(viewComponent) {
    this.viewComponent= viewComponent;
  }

  getViewComponent() {
    return this.viewComponent;
  }

  listNotificationInterests() {
    return [];
  }

  handleNotification(notification) {
    return;
  }

  onRegister() {
    return;
  }

  onRemove() {
    return;
  }

  static NAME = "Mediator";

}

export default Mediator;