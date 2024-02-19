interface BlockComponentClass<T> {
	new (props: unknown): T;
	getContent(): Element;
	id: number;
	hide(): void;
	show(): void;
}

type ComponentType<T extends BlockComponentClass<T>> = {
	new (props: ConstructorParameters<InstanceType<T>>[0]): InstanceType<T>;
};

interface Props {
	rootQuyery?: string;
}

export class Route<T extends BlockComponentClass<T>, P extends Props> {
	#pathname;
	#blockClass;
	#block: T | null = null;
	#props;
	constructor(pathname: string, view: ComponentType<T>, props: P) {
		this.#pathname = pathname;
		this.#blockClass = view;
		this.#props = props;
	}

	// navigate(pathname: string) {
	// 	if (this.match(pathname)) {
	// 		this.#pathname = pathname;
	// 		this.render();
	// 	}
	// }
	leave() {
		if (this.#block) {
			this.#block.hide();
		}
	}

	match(pathname: string) {
		return isEqual(pathname, this.#pathname);
	}

	render() {
		if (!this.#block) {
			this.#block = new this.#blockClass(this.#props);

			render(this.#props?.rootQuyery as string, this.#block);
		}

		this.#block.show();
	}
}

function isEqual(lhs: string, rhs: string) {
	return lhs === rhs;
}

function render<T extends BlockComponentClass<T>>(query: string, block: T) {
	// Перенести в Роут
	const root = document.querySelector(query);
	root?.append(block.getContent() as HTMLElement);
}
