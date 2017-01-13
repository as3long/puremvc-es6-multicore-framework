var puremvc = window.puremvc;
var TodoProxy = require('../../model/proxy/TodoProxy');

class PrepModelCommand extends puremvc.SimpleCommand {
  execute() {
    this.facade.registerProxy(new TodoProxy());
  }
}

module.exports = PrepModelCommand;