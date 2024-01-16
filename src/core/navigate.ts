import * as Pages from '../pages';
import Block, { RefType } from './Block';
import { Props } from './core-env';

interface BlockConstructable<Props extends object, R extends {}> {
	new (props: Props): Block<Props, R>;
}
const pages: Record<string, BlockConstructable<Props, RefType>> = {
	login: Pages.LoginPage,
	profile: Pages.ProfilePage,
	signin: Pages.SigninPage,
	chatPage: Pages.ChatPage,
};

export function navigate(page: string) {
	const app = document.getElementById('app');

	const Component = pages[page];
	const component = new Component({});

	app?.append(component.getContent()!);
}
