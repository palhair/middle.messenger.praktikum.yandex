import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export async function resolve(specifier, context, next) {
	const nextResult = await next(specifier, context);

	if (specifier.endsWith('.css')) {
		return {
			format: 'css',
			shortCircuit: true,
			url: nextResult.url,
		};
	}

	if (specifier.endsWith('.hbs?raw')) {
		return {
			format: 'hbs',
			shortCircuit: true,
			url: nextResult.url,
		};
	}

	if (specifier.endsWith('.svg')) {
		return {
			format: 'svg',
			shortCircuit: true,
			url: nextResult.url,
		};
	}

	if (specifier.endsWith('.png')) {
		return {
			format: 'png',
			shortCircuit: true,
			url: nextResult.url,
		};
	}

	return nextResult;
}

export async function load(url, context, next) {
	if (context.format === 'css') {
		return {
			format: 'module',
			shortCircuit: true,
			source: '',
		};
	}

	if (context.format === 'svg') {
		return {
			format: 'commonjs',
			shortCircuit: true,
			source: '',
		};
	}

	if (context.format === 'hbs') {
		const rawSource = await fs.readFile(fileURLToPath(url), 'utf-8');
		const source = await JSON.stringify(rawSource);
		return {
			format: 'module',
			shortCircuit: true,
			source: `const template = ${source};\nexport default template`,
		};
	}

	if (context.format === 'png') {
		return {
			format: 'commonjs',
			shortCircuit: true,
			source: '',
		};
	}

	return next(url, context);
}
