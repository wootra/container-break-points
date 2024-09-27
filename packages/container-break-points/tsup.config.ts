import { defineConfig } from 'tsup';

export default defineConfig(opt => ({
	entry: ['src/index.ts'],
	splitting: false,
	sourcemap: true,
	dts: false,
	format: ['esm', 'cjs'],
	minify: !opt.watch,
	clean: true,
	external: ['react'],
}));
