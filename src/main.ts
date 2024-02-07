import './style.css';
import * as Components from './components';
import { registerComponent } from './core/registerComponent';
import { Router } from './core/Router';
import * as Pages from './pages';
import { Store } from './core/Store';
import { AppState } from './type';
import { personalData } from './pages/profile';
import defaultAvatar from './assets/avatar.png';
import { PageName } from './core/core-env.d';

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
	avatar: defaultAvatar,
};

window.store = new Store<AppState>(initState);

Object.entries(Components).forEach(([name, component]) => {
	registerComponent(name, component);
});

Router.use(PageName.Login, Pages.LoginPage)
	.use(PageName.Signin, Pages.SigninPage)
	.use(PageName.Profile, Pages.ProfilePage)
	.use(PageName.ChatPage, Pages.ChatPage)
	.use(PageName.ChangePass, Pages.ChangePassword)
	.start();

// document.addEventListener('DOMContentLoaded', () => initApp());
