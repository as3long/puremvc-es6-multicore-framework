class Model {
  proxyMap = null;
  multitonKey= null;
  constructor(key) {
    if (Model.instanceMap[key]) {
      throw new Error(Model.MULTITON_MSG);
    }

    this.multitonKey = key;
    Model.instanceMap[key] = this;
    this.proxyMap = [];
    this.initializeModel();
  }

  initializeModel() {

  }

  /**
   * 注册代理
   */
  registerProxy(proxy) {
    proxy.initializeNotifier(this.multitonKey);
    this.proxyMap[proxy.getProxyName()] = proxy;
    proxy.onRegister();
  }

  /**
   * 取得中介
   */
  retrieveProxy(proxyName) {
    return this.proxyMap[proxyName];
  }

  /**
   * 是否存在中介
   */
  hasProxy(proxyName) {
    return this.proxyMap[proxyName] != null;
  }

  /**
   * 移除中介
   */
  removeProxy(proxyName) {
    var proxy = this.proxyMap[proxyName];
    if (proxy) {
      this.proxyMap[proxyName] = null;
      proxy.onRemove();
    }

    return proxy;
  }

  static instanceMap = [];
  static MULTITON_MSG = "Model instance for this Multiton key already constructed!";
  static removeModel(key) {
    delete Model.instanceMap[key];
  }

  static getInstance(key) {
    if (null == key) {
      return null;
    }

    if (Model.instanceMap[key] == null) {
      Model.instanceMap[key] = new Model(key);
    }

    return Model.instanceMap[key];
  }
}

export default Model;