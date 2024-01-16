import Block from './Block';

export enum EventsNames {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_CDU = 'flow:component-did-update',
	FLOW_CWU = 'flow:component-did-unmount',
	FLOW_RENDER = 'flow:render',
}

type Events = { [key: string]: (event: unknown) => void };

export type Child = {
	embed: (fragment: DocumentFragment) => void;
	[key: string]: Block;
};

export type Props = Record<string, unknown>;

export interface InputFieldProps extends Props {
	validate?: (value: string) => false | string;
}