import Block from '../../core/Block';
import { Props } from '../../core/core-env';

export class PersonalData extends Block<Props> {
	constructor(props: Props) {
		super({
			...props,
		});
	}
	protected render(): string {
		return `<form class="personal-data">

                    {{#each personalData }}
                        {{{ InputField 
                            name=this.name
                            ref=this.name
                            type=this.type
                            value=this.value
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
