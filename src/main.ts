import './style.css';
import * as Components from './components';
import { registerComponent } from './core/registerComponent';
import { Router } from './core/Router';
import * as Pages from './pages';
import { initApp } from './services/initApp';
import { Store } from './core/Store';
import { AppState } from './type';
import { personalData } from './pages/profile';

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
	personalData: personalData,
};

window.store = new Store<AppState>(initState);

Object.entries(Components).forEach(([name, component]) => {
	registerComponent(name, component);
});

Router.use('/', Pages.LoginPage)
	.use('/sign-up', Pages.SigninPage)
	.use('/settings', Pages.ProfilePage)
	.use('/messenger', Pages.ChatPage)
	.use('/change-pass', Pages.ChangePassword)
	.start();

document.addEventListener('DOMContentLoaded', () => initApp());
