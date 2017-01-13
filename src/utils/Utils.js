class Utils {
  static extendClass(ClassFunc) {
    var BaseClass = ClassFunc;
    BaseClass.prototype = new ClassFunc;
    BaseClass.prototype.constructor = BaseClass;
    return BaseClass;
  }
}

export default Utils;