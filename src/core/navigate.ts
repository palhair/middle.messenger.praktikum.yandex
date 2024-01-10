import * as Pages from '../pages';
import Block from './Block';

const pages: Record<string, typeof Block> = {
	login: Pages.LoginPage,
};

export function navigate(page: string) {
	const app = document.getElementById('app');

	const Component = pages[page];
	const component = new Component();

	app?.append(component.getContent()!);
}
