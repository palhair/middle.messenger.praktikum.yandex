import changePassword from './ChangePassword.hbs?raw';
import Block from '../../core/Block';
import arrow from '../../assets/arrow.svg';
import defaultAvatar from '../../assets/avatar.png';

import { connect } from '../../utils/connect';
import { PersonalDataType } from '../../type';
import { User } from '../../api/type';
import { InputField } from '../../components';
import * as validators from '../../utils/validators';
import { changePass } from '../../services/users';
import { initProfilePage } from '../../services/initApp';
import { PageName, Router } from '../../core/Router';

interface ProfileProps {
	personalData: PersonalDataType[];
	user: User;
	arrow: string;
	defaultAvatar: string;
	onSave: undefined | ((event: Event) => void);
	validators: unknown;
	onBack: EventListener;
}

type ProfilePageRefs = {
	oldPassword: InputField;
	newPassword: InputField;
};

export class ChangePassword extends Block<ProfileProps, ProfilePageRefs> {
	constructor(props: ProfileProps) {
		super({
			...props,
			defaultAvatar,
			validators,
			arrow,
			onBack: (event: Event) => {
				event.preventDefault();
				Router.go(PageName.Profile);
			},
			onSave: (event: Event) => {
				event.preventDefault();
				this.change();
			},
		});
	}

	protected async init(): Promise<void> {
		await initProfilePage();
	}

	async change() {
		const oldPassword = this.refs.oldPassword.value();
		const newPassword = this.refs.newPassword.value();

		if (oldPassword && newPassword) {
			changePass({ oldPassword, newPassword });
		}
	}

	protected render(): string {
		return changePassword;
	}
}

export default connect(({ user }) => ({ user }))(ChangePassword);
