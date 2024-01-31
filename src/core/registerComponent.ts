import { HelperOptions } from 'handlebars';
import Handlebars from 'handlebars';
import { BlockConstructable } from './core-env';

interface BlockComponentClass<T> {
	new (props: unknown): T;
	getContent(): Element;
	id: number;
}

type ComponentType<T extends BlockComponentClass<T>> = {
	new (props: ConstructorParameters<InstanceType<T>>[0]): InstanceType<T>;
};

export function registerComponent<T extends BlockComponentClass<T>>(name: string, Component: ComponentType<T>): void {
	if (name in Handlebars.helpers) {
		throw new Error(`${name} уже зарегистрирован`);
	}

	Handlebars.registerHelper(name, function (this: unknown, { hash, data, fn }: HelperOptions) {
		const component = new Component(hash);
		const dataAtribute = `data-id="${component.id}"`;

		if ('ref' in hash) {
			data.root.__refs[hash.ref] = component;
		}

		data.root.__children.push({
			component,
			embed(fragment: DocumentFragment) {
				const stub = fragment.querySelector(`[${dataAtribute}]`);
				if (!stub) {
					return;
				}

				component.getContent()?.append(...Array.from(stub.childNodes));
				stub.replaceWith(component.getContent()!);
			},
		});

		const contents = fn ? fn(this) : '';

		return `<div ${dataAtribute}>${contents}</div>`;
	});
}
