import './style.css';
import * as Components from './components';
import { registerComponent } from './core/registerComponent';
import { Router } from './core/Router';
import * as Pages from './pages';
import { AuthAPI } from './api/authAPI';
import { initApp } from './services/initApp';
import { Store } from './core/Store';
import { AppState } from './type';

declare global {
	interface Window {
		store: Store<AppState>;
	}

	type Nullable<T> = T | null;
}

const initState: AppState = {
	error: null,
	user: null,
	isOpenDialog: false,
	chats: [],
	dialogOptions: {},
	messages: [],
};
window.store = new Store<AppState>(initState);

Object.entries(Components).forEach(([name, component]) => {
	registerComponent(name, component);
});

Router.use('/', Pages.LoginPage)
	.use('/sign-up', Pages.SigninPage)
	.use('/settings', Pages.ProfilePage)
	.use('/messenger', Pages.ChatPage)
	.start();

document.addEventListener('DOMContentLoaded', () => initApp());
