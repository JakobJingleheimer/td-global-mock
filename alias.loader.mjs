export async function resolve(specifier, ctx, next) {
	if (!specifier.startsWith(alias)) return next(specifier);

	const dealiasedSpecifier = specifier.replace(alias, base);
	return next(dealiasedSpecifier);
}

const base = (new URL('./', import.meta.url)).href;
const alias = '…/';
