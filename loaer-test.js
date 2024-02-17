export async function resolve(specifier, context, next) {
	const nextResult = await next(specifier, context);

	if (!specifier.endsWith('.hbs?raw')) return nextResult;

	return {
		format: 'hbs',
		shortCircuit: true,
		url: nextResult.url,
	};
}

export async function load(url, context, next) {
	if (context.format !== 'css') return next(url, context);

	//const rawSource = '' + await fs.readFile(fileURLToPath(url));

	return {
		format: 'commonjs',
		shortCircuit: true,
		source: '',
	};
}
