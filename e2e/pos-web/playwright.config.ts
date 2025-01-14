import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

import { env } from './src/env';

const isCI = env.get('NODE_ENV') === 'ci';

// BDD config
const testDir = defineBddConfig({
	featuresRoot: 'src/features',

	outputDir: 'dist/bdd',
});

// Playwright config
export default defineConfig({
	testDir,
	outputDir: 'test-artifacts',

	fullyParallel: true,

	// CI config
	forbidOnly: isCI,
	retries: isCI ? 2 : 0,
	workers: isCI ? 1 : undefined,

	reporter: isCI
		? [['list', { printSteps: false }]]
		: [
				['list', { printSteps: true }],
				['html', { outputFolder: 'test-report' }],
				['json', { outputFile: 'test-report/report.json' }],
			],

	use: {
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
});
