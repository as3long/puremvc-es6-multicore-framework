import Notifier from '../observer/Notifier';

class Proxy extends Notifier {
  proxyName = null;
  data = null;
  constructor(proxyName, data) {
    super();
    this.proxyName = proxyName || this.constructor.NAME;
    if (data != null) {
      this.setData(data);
    }
  }

  getProxyName() {
    return this.proxyName;
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  onRegister() {
    return;
  }

  onRemove() {
    return;
  }

  static NAME = "Proxy";
}

export default Proxy;