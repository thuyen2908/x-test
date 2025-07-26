import path from 'node:path';

import nodeExternals from 'rollup-plugin-node-externals';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, normalizePath } from 'vite';
import dts from 'vite-plugin-dts';

const ENTRIES = {
	index: normalizePath(path.resolve(__dirname, 'src/shared/index.ts')),
	env: normalizePath(path.resolve(__dirname, 'src/env/index.ts')),
};

export default defineConfig({
	plugins: [
		dts(),
		nodeExternals(),
		visualizer({
			open: false,
			title: 'Bundle visualizer',
			filename: '.analyzer/bundle-stats.html',
			template: 'treemap',
			gzipSize: true,
			brotliSize: true,
		}),
	],
	build: {
		emptyOutDir: true,
		sourcemap: process.env.NODE_ENV !== 'production',
		lib: {
			entry: ENTRIES,
			formats: ['es', 'cjs'],
			fileName: (format, entryName) => {
				if (format === 'es') return `${entryName}.mjs`;

				if (format === 'cjs') return `${entryName}.cjs`;

				return `${entryName}.[format].js`;
			},
		},
	},
});
