import Handlebars from 'handlebars';
import './style.css';
import * as Components from './components';
import * as handlebarsHelpers from './handlebarsHelpers';
// import { navigate } from './core/navigate';
import { registerComponent } from './core/registerComponent';
import { Router } from './core/Router';
import * as Pages from './pages';

Object.entries(Components).forEach(([name, component]) => {
	registerComponent(name, component);
});

// Object.entries(handlebarsHelpers).forEach(([name, component]) => {
// 	Handlebars.registerPartial(name, component);
// });

// document.addEventListener('DOMContentLoaded', () => navigate('login'));

export const router = new Router('#app');

router
	.use('/', Pages.LoginPage)
	.use('/sign-up', Pages.SigninPage)
	.use('/settings', Pages.ProfilePage)
	.use('/messenger', Pages.ChatPage)
	.start();
