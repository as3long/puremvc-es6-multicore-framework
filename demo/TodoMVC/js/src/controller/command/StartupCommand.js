var puremvc = window.puremvc;
var PrepControllerCommand = require('./PrepControllerCommand');
var PrepModelCommand = require('./PrepModelCommand');
var PrepViewCommand = require('./PrepViewCommand');

class StartupCommand extends puremvc.MacroCommand {
  initializeMacroCommand() {
    this.addSubCommand(PrepControllerCommand);
    this.addSubCommand(PrepModelCommand);
    this.addSubCommand(PrepViewCommand);
  }
}

module.exports = StartupCommand;