import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

import { constants } from './src/const';
import { env } from './src/env';

const isCI = env.isCI;
const baseURL = env.baseURL;
const posConfig = env.posConfig;

const userAuthStorage = constants.AuthStorage.user;

// BDD config
const testDir = defineBddConfig({
	featuresRoot: 'src/features',

	outputDir: 'dist/bdd',
});

// Playwright config
export default defineConfig({
	testDir,
	outputDir: 'test-artifacts',
	snapshotPathTemplate: '__snapshots__/{testFileDir}/{testFileName}/{arg}{ext}',

	fullyParallel: true,

	// CI config
	forbidOnly: isCI,
	retries: isCI ? 2 : 0,
	workers: isCI ? 1 : undefined,

	reporter: isCI
		? [['list', { printSteps: false }]]
		: [
				['list', { printSteps: true }],
				['html', { outputFolder: 'test-report', open: 'never' }],
				['json', { outputFile: 'test-report/report.json' }],
			],

	use: {
		trace: 'on-first-retry',

		// general config for all projects
		baseURL,
		timezoneId: posConfig.timezone,
	},

	projects: [
		/* ------------------------ Setup & teardown projects ----------------------- */

		{
			name: 'setup',
			testDir: './src',
			testMatch: /.*\.setup\.ts/,
		},

		/* -------------------------- Cross-browser testing ------------------------- */

		{
			name: 'chromium',
			dependencies: ['setup'],
			use: {
				...devices['Desktop Chrome'],
				storageState: userAuthStorage,
			},
		},

		{
			name: 'firefox',
			dependencies: ['setup'],
			use: {
				...devices['Desktop Firefox'],
				storageState: userAuthStorage,
			},
		},

		{
			name: 'webkit',
			dependencies: ['setup'],
			use: {
				...devices['Desktop Safari'],
				storageState: userAuthStorage,
			},
		},
	],
});
