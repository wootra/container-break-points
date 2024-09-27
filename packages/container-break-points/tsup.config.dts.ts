import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['dist/index.js'],
	splitting: false,
	sourcemap: true,
	dts: true,
	format: 'esm',
	clean: false,
	external: ['react'],
});
