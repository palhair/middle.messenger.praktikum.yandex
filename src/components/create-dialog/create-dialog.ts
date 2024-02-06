import { ErrorBlock, InputField } from '..';
import Block from '../../core/Block';
import { connect } from '../../utils/connect';
import { DialogOptions } from '../chat-dropdown/chat-dropdown';

interface CreateDialogProps {
	open: boolean;
	titleDialog: string;
	inputLabel: string;
	onCancel: (event: Event) => void;
	onSubmit: (event: Event) => void;
	dialogOptions: DialogOptions;
}

type Refs = {
	dialogValue: InputField;
	errorBlock: ErrorBlock;
};
export class CreateDialog extends Block<CreateDialogProps, Refs> {
	constructor(props: CreateDialogProps) {
		super({
			...props,
			onCancel: (event: Event) => {
				event.preventDefault();
				window.store.set({ isOpenDialog: false });
			},
			onSubmit: (event: Event) => {
				event.preventDefault();
				console.log(event);
				if (this.props.dialogOptions.onGo) this.props.dialogOptions.onGo(event);
			},
		});
	}

	protected init(): void {
		this.events = {
			submit: this.props.onSubmit,
		};
	}

	public getFile() {
		return this.refs.dialogValue.file();
	}

	public getValue() {
		return this.refs.dialogValue.value();
	}

	public setError(error: string) {
		this.refs.errorBlock.setProps({ error });
	}

	protected render(): string {
		return `<form method='dialog' class='create-dialog__form'>
					{{{Title type='h3' label=dialogOptions.dialogTitle }}}
					
					{{{InputField label=dialogOptions.dialogInputLabel ref='dialogValue' type=dialogOptions.type modificator=dialogOptions.dialog}}}
					{{{ErrorBlock error=error ref='errorBlock'}}}
					<div class='create-dialog__buttons'>
						{{{Button label=dialogOptions.dialogButtonlabel type='primary' }}}
						{{{Button label='Отменить' type='secondary' onClick=onCancel}}}
					</div>
				</form>`;
	}
}

export default connect((state) => ({ isOpenDialog: state.isOpenDialog, dialogOptions: state.dialogOptions }))(CreateDialog);
