const SVG_REGEX = /^[./a-zA-Z0-9$_-]+\.svg$/;

export async function resolve(specifier, context, next) {
	const nextResult = await next(specifier, context);

	if (!SVG_REGEX.test(specifier)) return nextResult;

	return {
		format: 'svg',
		shortCircuit: true,
		url: nextResult.url,
	};
}

export async function load(url, context, next) {
	if (context.format !== 'svg') return next(url, context);

	return {
		format: 'commonjs',
		shortCircuit: true,
		source: '',
	};
}
