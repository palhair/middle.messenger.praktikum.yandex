import profile from './profile.hbs?raw';
import Block from '../../core/Block';
import arrow from '../../assets/arrow.svg';
import { connect } from '../../utils/connect';
import { addAvatar, personalData } from '.';
import { PersonalDataType } from '../../type';
import { User, changeUser } from '../../api/type';
import { cloneDeep } from '../../utils/cloneDeep';
import { ChangeUserProfile, changeAvatar } from '../../services/users';
import { PersonalData } from '../../components/personal-data/personal-data';
import { Button } from '../../components';
import { DialogOptions } from '../../components/chat-dropdown/chat-dropdown';
import { PageName, Router } from '../../core/Router';
import defaultAvatar from '../../assets/avatar.png';
import { logout } from '../../services/auth';
import { initProfilePage } from '../../services/initApp';
import { Dialog } from '../../components/dialog/dialog';

interface ProfileProps {
	personalData: PersonalDataType[];
	user: User;
	changeMyData: (event: Event) => void;
	arrow: string;
	defaultAvatar: string;
	onSave: undefined | ((event: Event) => void);
	openChangeAvatarDialog: (event: Event) => void;
	changePass: (event: Event) => void;
	dialog: () => Dialog;
	goChat: (event: Event) => void;
	logout: (event: Event) => void;
}

type ProfilePageRefs = {
	data: PersonalData;
	saveButton: Button;
	profileAvatar: Button;
	currentDialog: Dialog;
};

export class ProfilePage extends Block<ProfileProps, ProfilePageRefs> {
	constructor(props: ProfileProps) {
		super({
			...props,

			changeMyData: (event: Event) => {
				event.preventDefault();
				this.changeData();
			},
			openChangeAvatarDialog: (event: Event) => {
				event.preventDefault();
				this.createNewDialog({ ...addAvatar, onGo: this.changeAvatar.bind(this) });
				window.store.set({ isOpenDialog: true });
			},
			changePass: (event: Event) => {
				event.preventDefault();
				Router.go('/change-pass');
			},
			onSave: (event: Event) => {
				event.preventDefault();
				this.save();
			},
			goChat: (event: Event) => {
				event.preventDefault();
				Router.go(PageName.ChatPage);
			},
			logout: async (event: Event) => {
				event.preventDefault();
				await logout();
			},
			arrow,
			personalData,
			defaultAvatar,
		});
	}

	protected async init(): Promise<void> {
		await initProfilePage();
	}

	getDialog() {
		return this.refs.currentDialog;
	}

	async changeAvatar() {
		const dialog = this.refs.currentDialog;
		const newAvatar = await dialog.getDialogFile();
		if (newAvatar) {
			const user = await changeAvatar(newAvatar);
			window.store.set({ avatar: `https://ya-praktikum.tech/api/v2/resources${user.avatar}` });
			window.store.set({ isOpenDialog: false });
		}
	}

	createNewDialog(dialogOptions: DialogOptions) {
		window.store.set({ dialogOptions });
	}

	changeData() {
		this.refs.saveButton.setProps({ onClick: this.save.bind(this) });
		console.log(this.refs.saveButton);

		const newData = cloneDeep(this.props.personalData);
		newData.forEach((param) => {
			param.readonly = false;
		});
		this.refs.data.setProps({ personalData: newData });

		const buttons: HTMLElement | null = document.querySelector('.profile__footer-block');
		buttons!.style.display = 'none';

		const saveButton: HTMLElement | null = document.querySelector('.pofile__save-block');
		saveButton!.style.display = 'block';
	}

	async save() {
		const newData = cloneDeep(this.props.user);

		const old = this.refs.data.getRefs();

		Object.entries(old).forEach(([key, value]) => {
			const val = value.value();
			if (val) {
				newData[key as keyof changeUser] = val;
			}
		});

		const newUser = await ChangeUserProfile(newData as User);
		window.store.set({ user: newUser });

		const buttons: HTMLElement | null = document.querySelector('.profile__footer-block');
		buttons!.style.display = '';

		const saveButton: HTMLElement | null = document.querySelector('.pofile__save-block');
		saveButton!.style.display = '';

		const newDataUser = cloneDeep(this.props.personalData);
		newDataUser.forEach((param) => {
			param.readonly = true;
		});
		this.refs.data.setProps({ personalData: newDataUser });
	}

	async setData() {
		const user = this.props.user;

		this.props.personalData.forEach((param) => {
			const paramName = param.name;
			param.value = user[paramName as keyof User];
		});
	}

	protected render(): string {
		const user = this.props.user;
		if (user) {
			this.setData();
		}
		return profile;
	}
}

export default connect(({ user, avatar }) => ({ user, avatar }))(ProfilePage);
