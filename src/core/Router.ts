import { NotFoundPage } from '../pages';
import { Route } from './Route';

interface BlockComponentClass<T> {
	new (props: unknown): T;
	getContent(): Element | null;
	id: number;
}
type ComponentType<T extends BlockComponentClass<T>> = {
	new (props: ConstructorParameters<InstanceType<T>>[0]): InstanceType<T>;
};

interface RouteComponentClass<R> {
	new <T extends BlockComponentClass<T>>(pathname: string, view: ComponentType<T>, props: unknown): R;
	navigate(): void;
	leave(): void;
	match(pathname: string): boolean;
	render(): void;
}

export class RouterClass<R extends RouteComponentClass<R>> {
	routes: R[] = [];
	history = window.history;
	#rootQuyery?: string;
	#currentRoute: R | null = null;

	constructor(rootQuyery: string) {
		this.#rootQuyery = rootQuyery;
	}

	use<T extends BlockComponentClass<T>>(pathname: string, block: ComponentType<T>): this {
		const route = new Route(pathname, block, { rootQuyery: this.#rootQuyery });

		this.routes.push(route as unknown as R);

		return this;
	}

	start() {
		this.use('/404', NotFoundPage);

		window.addEventListener('popstate', (event: Event) => {
			const currentTarget = event.currentTarget as Window;
			if (currentTarget) {
				this.#onRoute(currentTarget.location.pathname);
			}
		});

		this.#onRoute(window.location.pathname);
	}

	#onRoute(pathname: string) {
		let route = this.getRoute(pathname);

		if (!route) {
			route = this.getRoute('/404') as R;
		}

		if (this.#currentRoute) {
			this.#currentRoute.leave();
		}

		this.#currentRoute = route;
		route.render();
	}

	go(pathname: string) {
		this.history.pushState({ page: pathname }, '', pathname);
		this.#onRoute(pathname);
	}

	async back() {
		await this.history.back();
		return 'back';
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname));
	}
}

export const Router = new RouterClass('#app');
