import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['dist/index.cjs'],
	splitting: false,
	sourcemap: true,
	dts: true,
	format: 'cjs',
	clean: false,
	external: ['react'],
});
