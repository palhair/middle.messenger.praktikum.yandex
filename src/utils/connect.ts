import Block from '../core/Block';
import { StoreEvents } from '../core/Store';
import { RefType, TProps } from '../core/core-env';
import { AppState } from '../type';
import isEqual from './isEqual';

export function connect(makeStateProps: (state: AppState) => Partial<AppState>) {
	console.log('connect');
	return function <P extends TProps, R extends RefType>(Component: typeof Block<P, R>) {
		return class extends Component {
			private onChangeStoreCallback: () => void;
			constructor(props: P) {
				const store = window.store;
				let state = makeStateProps(store.getState());
				super({ ...props, ...state });

				this.onChangeStoreCallback = () => {
					let newState = makeStateProps(store.getState());

					if (!isEqual(state, newState)) {
						this.setProps({ ...newState } as Partial<P>);
						state = newState;
					}
					state = newState;
				};

				store.on(StoreEvents.Updated, this.onChangeStoreCallback);
			}

			componentWillUnmount() {
				super.componentWillUnmount();
				window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
			}
		};
	};
}
