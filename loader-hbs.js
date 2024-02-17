import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export async function resolve(specifier, context, next) {
	const nextResult = await next(specifier, context);

	if (!specifier.endsWith('.hbs')) return nextResult;

	return {
		format: 'hbs',
		shortCircuit: true,
		url: nextResult.url,
	};
}

export async function load(url, context, next) {
	if (context.format !== 'hbs') return next(url, context);

	const rawSource = await fs.readFile(fileURLToPath(url), 'utf-8');
	const source = JSON.stringify(rawSource);

	return {
		format: 'module',
		shortCircuit: true,
		source: `${source}`,
	};
}
