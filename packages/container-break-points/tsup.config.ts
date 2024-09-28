import { defineConfig } from 'tsup';

export default defineConfig(opt => ({
	entry: ['src/index.ts'],
	tsconfig: 'tsconfig.build.json',
	splitting: false,
	sourcemap: true,
	dts: true,
	format: ['esm', 'cjs'],
	minify: !opt.watch,
	clean: true,
}));
