import { AppState } from '../type';

export function cloneDeep<T extends object = object>(obj: T): T {
	if (isArray(obj)) {
		const clone: unknown[] = [];
		for (let i = 0; i < obj.length; i++) {
			if (isPlainObjectOrArray(obj[i])) {
				clone[i] = cloneDeep(obj[i]);
			} else {
				clone[i] = obj[i];
			}
		}

		return clone as T;
	}

	if (isPlainObject(obj)) {
		const clone = {} as T;

		for (const [key, value] of Object.entries(obj)) {
			if (isPlainObjectOrArray(value)) {
				clone[key as keyof T] = cloneDeep(value);
			}
			{
				clone[key as keyof T] = value;
			}
		}
		return clone;
	}

	return obj;
}
function isPlainObject(value: unknown): value is object {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
}

function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}
function isPlainObjectOrArray(value: unknown) {
	return isArray(value) || isPlainObject(value);
}

export function getCloneStorePropery<T extends keyof AppState>(property: T): AppState[T] {
	const oldProperty = window.store.getState()[property];
	if (typeof oldProperty == 'object' && oldProperty != null) {
		const newProperty: AppState[T] = cloneDeep(oldProperty);
		return newProperty;
	}
	return oldProperty;
}
