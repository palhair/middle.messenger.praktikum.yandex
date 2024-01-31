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

	getDialogValue() {
		return this.refs.dialogValue.value();
	}
	setError(error: string) {
		this.refs.errorBlock.setProps({ error });
	}
	protected render(): string {
		return `{{#Dialog open=isOpenDialog}}
					<form method='dialog'>
						<h3>{{dialogOptions.dialogTitle}}</h3>
				
						{{{InputField label=dialogOptions.dialogInputLabel ref='dialogValue'}}}
						{{{ErrorBlock error=error ref='errorBlock'}}}
						<div>
							{{{Button label=dialogOptions.dialogButtonlabel type='primary' onClick=dialogOptions.onGo}}}
							{{{Button label='Отменить' type='secondary' onClick=onCancel}}}
						</div>
					</form>
				{{/Dialog}}`;
	}
}

export default connect((state) => ({ isOpenDialog: state.isOpenDialog, dialogOptions: state.dialogOptions }))(CreateDialog);
