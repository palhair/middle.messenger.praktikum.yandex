import { ErrorBlock, InputField } from '..';
import Block from '../../core/Block';
import { connect } from '../../utils/connect';

interface CreateDialogProps {
	open: boolean;
	titleDialog: string;
	inputLabel: string;
	onCancel: (e: Event) => void;
}

type Refs = {
	dialogValue: InputField;
	errorBlock: ErrorBlock;
};
export class CreateDialog extends Block<CreateDialogProps, Refs> {
	constructor(props: CreateDialogProps) {
		super({
			...props,
			onCancel: (e: Event) => {
				e.preventDefault();
				window.store.set({ isOpenDialog: false });
			},
		});
	}
	getDialogFile() {
		return this.refs.dialogValue.file();
	}
	getDialogValue() {
		return this.refs.dialogValue.value();
	}
	setError(error: string) {
		this.refs.errorBlock.setProps({ error });
	}
	protected render(): string {
		return `{{#Dialog open=isOpenDialog}}
					<div class='create-dialog'>
						<form method='dialog' class='create-dialog__form'>
							{{{Title type='h3' label=dialogOptions.dialogTitle }}}
							
							{{{InputField label=dialogOptions.dialogInputLabel ref='dialogValue' type=dialogOptions.type modificator=dialogOptions.dialog}}}
							{{{ErrorBlock error=error ref='errorBlock'}}}
							<div class='create-dialog__buttons'>
								{{{Button label=dialogOptions.dialogButtonlabel type='primary' onClick=dialogOptions.onGo}}}
								{{{Button label='Отменить' type='secondary' onClick=onCancel}}}
							</div>
						</form>
					</div>
				{{/Dialog}}`;
	}
}

export default connect((state) => ({ isOpenDialog: state.isOpenDialog, dialogOptions: state.dialogOptions }))(CreateDialog);
