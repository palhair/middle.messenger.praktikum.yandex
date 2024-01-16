import Handlebars from 'handlebars';
import './style.css';
import * as Components from './components';
import * as handlebarsHelpers from './handlebarsHelpers';
// import avatar from './assets/5.png';
// import dots from './assets/dots.svg';
// import larger from './assets/larger.svg';
// import arrow from './assets/arrow.svg';
// import defaultAvatar from './assets/avatar.png';
import { navigate } from './core/navigate';
import { registerComponent } from './core/registerComponent';

// type pageParams = [string, Record<string, string>] | [string];

// const pages: Record<string, pageParams> = {
// 	signin: [Pages.signinPage],
// 	chatPage: [Pages.chatPage, { avatar, dots, larger }],
// 	profile: [Pages.profile, { arrow, defaultAvatar }],
// 	errorPage: [Pages.errorPage],
// 	notFoundPage: [Pages.notFoundPage],
// };
// registerComponent('InputField', Components.InputField);
// registerComponent('Input', Components.Input);
// registerComponent('ErrorBlock', Components.ErrorBlock);
// registerComponent('Heading', Components.Heading);
Object.entries(Components).forEach(([name, component]) => {
	registerComponent(name, component);
});

Object.entries(handlebarsHelpers).forEach(([name, component]) => {
	Handlebars.registerPartial(name, component);
});

document.addEventListener('DOMContentLoaded', () => navigate('chatPage'));

document.addEventListener('click', (e: MouseEvent) => {
	const target: HTMLElement = e.target as HTMLElement;

	const page = target.getAttribute('page');
	if (page) {
		navigate(page);

		e.preventDefault();
		e.stopImmediatePropagation();
	}
});
