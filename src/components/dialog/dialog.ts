import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { CreateDialog } from '../create-dialog/create-dialog';

interface DialogProps {
	open: boolean;
}

type DialogRefs = {
	currentDialog: CreateDialog;
};

export class Dialog extends Block<DialogProps, DialogRefs> {
	getDialogValue() {
		return this.refs.currentDialog.getValue();
	}

	getDialogFile() {
		return this.refs.currentDialog.getFile();
	}

	setError(error: string) {
		this.refs.currentDialog.setError(error);
	}

	protected render(): string {
		return `<dialog class="dialog" {{#if isOpenDialog}}open{{/if}} >
					<div class='create-dialog'>
						{{{CreateDialog ref='currentDialog'}}}
					</div>
				</dialog>`;
	}
}

export default connect((state) => ({ isOpenDialog: state.isOpenDialog }))(Dialog);
