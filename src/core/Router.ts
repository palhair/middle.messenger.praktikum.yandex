import { Route } from './Route';
import { BlockConstructable, RefType, TProps } from './core-env';

export class Router {
	routes: Route[] = [];
	history = window.history;
	#currentRoute: Route | null = null;
	#rootQuyery?: string;
	static __instance: Router;

	constructor(rootQuyery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.#rootQuyery = rootQuyery;
		Router.__instance = this;
	}

	use(pathname: string, block: BlockConstructable<TProps, {}>): this {
		const route = new Route(pathname, block, { rootQuyery: this.#rootQuyery });

		this.routes.push(route);

		return this;
	}

	start() {
		window.addEventListener('popstate', (event: Event) => {
			const currentTarget = event.currentTarget as Window;
			if (currentTarget) {
				this.#onRoute(currentTarget.location.pathname);
			}
		});

		this.#onRoute(window.location.pathname);
	}

	#onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (!route) {
			return;
		}

		if (this.#currentRoute) {
			this.#currentRoute.leave();
		}

		this.#currentRoute = route;
		route.render();
	}

	go(pathname: string) {
		this.history.pushState({}, '', pathname);
		this.#onRoute(pathname);
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