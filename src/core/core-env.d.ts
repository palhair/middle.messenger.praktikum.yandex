import Block from './Block';

export enum EventsNames {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_CDU = 'flow:component-did-update',
	FLOW_CWU = 'flow:component-did-unmount',
	FLOW_RENDER = 'flow:render',
}

export type Children = {
	embed: (fragment: DocumentFragment) => void;
	[key: string]: Block;
};
