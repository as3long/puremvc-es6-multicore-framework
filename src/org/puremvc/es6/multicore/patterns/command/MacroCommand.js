import Notifier from '../observer/Notifier';

class MacroCommand extends Notifier {
  subCommands = null;
  constructor() {
    super();
    this.subCommands = [];
    this.initializeMacroCommand();
  }
  initializeMacroCommand() {
    
  }

  addSubCommand(commandClassRef) {
    this.subCommands.push(commandClassRef);
  }

  execute(note) {
    while (this.subCommands.length > 0) {
      var ref = this.subCommands.shift();
      var cmd = new ref;
      cmd.initializeNotifier(this.multitonKey);
      cmd.execute(note);
    }
  }
}

export default MacroCommand;