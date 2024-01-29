import Block from '../../core/Block';
import { Props } from '../../core/core-env';
import { connect } from '../../utils/connect';

export class ListMessages extends Block<Props> {
	protected render(): string {
		return `<div class="list-messages">
                    {{#each messages}}
                        {{{Message
                            kind=this.kind
                            type=this.type
                            image=this.image
                            text=this.text
                            date=this.date
                        }}}
                        
                    {{/each}}
                </div>`;
	}
}

export default connect(({ chats, user }) => ({ chats, user }))(ListMessages);
