import { router } from '../main';

// const pages: Record<string, BlockConstructable<TProps, RefType>> = {
// 	login: Pages.LoginPage,
// 	profile: Pages.ProfilePage,
// 	signin: Pages.SigninPage,
// 	chatPage: Pages.ChatPage,
// 	notFoundPage: Pages.NotFoundPage,
// 	errorPage: Pages.ErrorPage,
// };

// export function navigate(page: string) {
// 	const app = document.getElementById('app');

// 	const Component = pages[page];
// 	const component = new Component({});

// 	app?.firstChild?.remove();
// 	app?.append(component.getContent()!);
// }

export function navigateEvent(event: Event) {
	event.preventDefault();
	const target = event.target as HTMLElement;
	if (target) {
		const page = target.getAttribute('page');
		if (page) {
			router.go(`/${page}`);
		}
	}
}
