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

	match(pathname: string) {
		return isEqual(pathname, this.#pathname);
	}

	render() {
		const root = document.querySelector(this.#props?.rootQuyery as string);
		const content = root?.children[0];
		if (!this.#block) {
			this.#block = new this.#blockClass(this.#props);

			if (!content) {
				root?.append(this.#block.getContent() as HTMLElement);
			} else {
				content.replaceWith(this.#block.getContent());
			}
			return;
		}
		if (content) {
			content.replaceWith(this.#block.getContent());
		}
	}
}

function isEqual(lhs: string, rhs: string) {
	return lhs === rhs;
}
