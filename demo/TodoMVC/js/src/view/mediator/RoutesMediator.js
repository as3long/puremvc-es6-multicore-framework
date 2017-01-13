let puremvc = window.puremvc;
let Router = window.Router;
import AppConstants from '../../AppConstants';
import TodoProxy from '../../model/proxy/TodoProxy';

class RoutesMediator extends puremvc.Mediator {
  static NAME = 'RoutesMediator';
  router = null;
  onRegister() {
    var todoProxy = this.facade.retrieveProxy(TodoProxy.NAME),
      defaultRoute = this.getRouteForFilter(todoProxy.filter),
      options = { resource: this, notfound: this.handleFilterAll },
      routes = {
        '/': this.handleFilterAll,
        '/active': this.handleFilterActive,
        '/completed': this.handleFilterCompleted
      };

    this.router = new Router(routes).configure(options);
    this.router.init(defaultRoute);
  }

  getRouteForFilter(filter) {
    var route;
    switch (filter) {
      case AppConstants.FILTER_ALL:
        route = '/';
        break;

      case AppConstants.FILTER_ACTIVE:
        route = '/active';
        break;

      case AppConstants.FILTER_COMPLETED:
        route = '/completed';
        break;
    }
    return route;
  }

  handleFilterAll = () => {
    this.facade.sendNotification(AppConstants.FILTER_TODOS, AppConstants.FILTER_ALL);
  }

  handleFilterActive = () => {
    this.facade.sendNotification(AppConstants.FILTER_TODOS, AppConstants.FILTER_ACTIVE);
  }

  handleFilterCompleted = () => {
    this.facade.sendNotification(AppConstants.FILTER_TODOS, AppConstants.FILTER_COMPLETED);
  }
}

module.exports = RoutesMediator;