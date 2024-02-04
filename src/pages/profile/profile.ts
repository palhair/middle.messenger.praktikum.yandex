import profile from './profile.hbs?raw';
import Block from '../../core/Block';
import arrow from '../../assets/arrow.svg';
import defaultAvatar from '../../assets/avatar.png';
import { connect } from '../../utils/connect';
import { personalData } from '.';
import { personalDataType } from '../../type';
import { User, changeUser } from '../../api/type';
import { cloneDeep } from '../../utils/cloneDeep';
import { ChangeUserProfile } from '../../services/users';
import { PersonalData } from '../../components/personal-data/personal-data';
import { Button } from '../../components';

interface ProfileProps {
	personalData: personalDataType[];
	user: User;
	changeMyData: (event: Event) => void;
	arrow: string;
	defaultAvatar: string;
	onSave: undefined | ((event: Event) => void);
}

type ProfilePageRefs = {
	data: PersonalData;
	saveButton: Button;
};

export class ProfilePage extends Block<ProfileProps, ProfilePageRefs> {
	constructor(props: ProfileProps) {
		super({
			...props,

			changeMyData: (event: Event) => {
				event.preventDefault();
				this.changeData();
			},

			arrow,
			defaultAvatar,
			personalData,
			onSave: undefined,
		});
	}

	changeData() {
		this.props.onSave = async (e) => {
			e.preventDefault();
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
			this.setProps({ personalData: newDataUser });
		};

		const newData = cloneDeep(this.props.personalData);
		newData.forEach((param) => {
			param.readonly = false;
		});
		this.setProps({ personalData: newData });

		const buttons: HTMLElement | null = document.querySelector('.profile__footer-block');
		buttons!.style.display = 'none';

		const saveButton: HTMLElement | null = document.querySelector('.pofile__save-block');
		saveButton!.style.display = 'block';
	}

	setData() {
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

export default connect(({ user }) => ({ user }))(ProfilePage);
