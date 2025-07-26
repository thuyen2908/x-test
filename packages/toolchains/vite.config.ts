import path from 'node:path';

import nodeExternals from 'rollup-plugin-node-externals';
import { defineConfig, normalizePath } from 'vite';

const ENTRIES = {
	commitlint: normalizePath(path.resolve(__dirname, 'src/commitlint/index.ts')),
};

export default defineConfig({
	plugins: [nodeExternals()],
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
