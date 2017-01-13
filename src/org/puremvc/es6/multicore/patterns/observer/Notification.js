class Notification {
  name = null;
  type = null;
  body = null;
  constructor(name, body, type) {
    this.name = name;
    this.body = body;
    this.type = type;
  }

  getName() {
    return this.name;
  }

  setBody(body) {
    this.body = body;
  }

  getBody() {
    return this.body;
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  toString() {
    let msg = "Notification Name: " + this.getName();
    msg += "\nBody:" + ((this.body == null) ? "null" : this.body.toString());
    msg += "\nType:" + ((this.type == null) ? "null" : this.type);
    return msg;
  }
}

export default Notification;