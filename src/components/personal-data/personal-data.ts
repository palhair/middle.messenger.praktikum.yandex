import { InputField } from '..';
import { User } from '../../api/type';
import Block from '../../core/Block';
import { personalDataType } from '../../type';
import { connect } from '../../utils/connect';

interface PersonalDataProps {
	personalData: personalDataType[];
	user: User;
}

type PersonalDataRefs = {
	first_name: InputField;
	second_name: InputField;
	display_name: InputField;
	phone: InputField;
	login: InputField;
	email: InputField;
};

export class PersonalData extends Block<PersonalDataProps, PersonalDataRefs> {
	constructor(props: PersonalDataProps) {
		super({
			...props,
		});
	}

	getRefs() {
		return this.refs;
	}
	protected render(): string {
		return `<form class="personal-data">

                    {{#each personalData }}
                        {{{ InputField 
                            name=this.name
                            ref=this.name
                            value=this.value
                            type=this.type
                            readonly=this.readonly
                            label=this.label
                            modificator=this.modificator
							validate=this.validate
                        }}}
                    {{/each}}
                </form>
    `;
	}
}

export default connect(({ user }) => ({ user }))(PersonalData);
