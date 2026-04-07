/* ============================================
   Noora — SPA Router
   ============================================ */

type RouteHandler = () => void;

interface Route {
  path: string;
  handler: RouteHandler;
}

class Router {
  private routes: Route[] = [];
  private notFoundHandler: RouteHandler = () => {};

  addRoute(path: string, handler: RouteHandler): void {
    this.routes.push({ path, handler });
  }

  setNotFound(handler: RouteHandler): void {
    this.notFoundHandler = handler;
  }

  navigate(path: string): void {
    window.history.pushState({}, '', path);
    this.resolve();
  }

  resolve(): void {
    const currentPath = window.location.pathname;
    const route = this.routes.find(r => r.path === currentPath);
    if (route) {
      route.handler();
    } else {
      this.notFoundHandler();
    }
  }

  init(): void {
    window.addEventListener('popstate', () => this.resolve());

    document.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('a[data-link]');
      if (target) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) this.navigate(href);
      }
    });

    this.resolve();
  }
}

export const router = new Router();
