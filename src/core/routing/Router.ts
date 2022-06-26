import Route from './Route';
import Block from '../Block';

export default class Router {
  public routes: Route[];

  public history: History;

  private static _instance: Router;

  private _currentRoute: Route | null;

  private readonly _rootQuery: string;

  constructor(rootQuery: string = '#app') {
    if (Router._instance) {
      return Router._instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router._instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute(event.currentTarget.location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    console.log(window.location);
    console.log(pathname);
    if (pathname !== window.location.pathname) {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
