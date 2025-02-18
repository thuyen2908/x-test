import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

import { constants } from './src/const';
import { env } from './src/env';

const isCI = env.isCI;
const baseURL = env.baseURL;
const posConfig = env.posConfig;

const PlaywrightConfig = constants.PlaywrightConfig;
const userAuthStorage = constants.AuthStorage.user;

// BDD config
const testDir = defineBddConfig({
	featuresRoot: PlaywrightConfig.bddRoot,

	outputDir: PlaywrightConfig.bddOutput,
});

// Playwright config
export default defineConfig({
	testDir,
	outputDir: PlaywrightConfig.artifactsDir,
	snapshotPathTemplate: '__snapshots__/{testFileDir}/{testFileName}/{arg}{ext}',

	fullyParallel: true,

	// CI config
	forbidOnly: isCI,
	retries: isCI ? 2 : 0,
	workers: isCI ? 4 : undefined,

	expect: {
		timeout: 15_000,
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.05,
		},
	},

	reporter: isCI
		? [
				['list', { printSteps: false }],
				['junit', { outputFile: PlaywrightConfig.junitReportFile }],
				[
					'html',
					{ outputFolder: PlaywrightConfig.htmlReportDir, open: 'never' },
				],
				['allure-playwright', PlaywrightConfig.allureReportConfig],
			]
		: [
				['list', { printSteps: true }],
				[
					'html',
					{ outputFolder: PlaywrightConfig.htmlReportDir, open: 'never' },
				],
				['json', { outputFile: PlaywrightConfig.jsonReportFile }],
				['allure-playwright', PlaywrightConfig.allureReportConfig],
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
			teardown: 'teardown',
		},
		{
			name: 'teardown',
			testDir: './src',
			testMatch: /.*\.teardown\.ts/,
		},

		/* -------------------------- Cross-browser testing ------------------------- */

		{
			name: 'chrome',
			dependencies: ['setup'],
			use: {
				...devices['Desktop Chrome'],
				storageState: userAuthStorage,
			},
		},

		{
			name: 'edge',
			dependencies: ['setup'],
			use: {
				...devices['Desktop Edge'],
				storageState: userAuthStorage,
			},
		},
	],
});
