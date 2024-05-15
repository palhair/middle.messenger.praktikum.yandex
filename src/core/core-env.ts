import Block from './Block';

export enum EventsNames {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_CDU = 'flow:component-did-update',
	FLOW_CWU = 'flow:component-did-unmount',
	FLOW_RENDER = 'flow:render',
}

export interface Child {
	component: Block<Props>;
	embed: (fragment: DocumentFragment) => void;
}

export type TProps = object;
export type Props = Record<string, any>;

export type RefType = Record<string, Element | Block<TProps>>;

export interface InputFieldProps extends TProps {
	validate?: (value: string) => false | string;
}

export interface BlockConstructable<Props extends TProps, R extends {}> {
	new (props: Props): Block<Props, R>;
}
