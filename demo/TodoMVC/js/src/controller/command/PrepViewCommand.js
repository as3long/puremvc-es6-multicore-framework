let puremvc = window.puremvc;
import TodoFormMediator from '../../view/mediator/TodoFormMediator';
import RoutesMediator from '../../view/mediator/RoutesMediator';

class PrepViewCommand extends puremvc.SimpleCommand {
  execute(note) {
    console.log('执行PrepViewCommand');
    this.facade.registerMediator(new TodoFormMediator());
    this.facade.registerMediator(new RoutesMediator())
  }
}

module.exports = PrepViewCommand;