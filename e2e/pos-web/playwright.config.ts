import {
	type PlaywrightTestProject,
	type ReporterDescription,
	defineConfig,
	devices,
} from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

import { constants } from './src/const';
import { env } from './src/env';

const isCI = env.isCI;
const baseURL = env.baseURL;
const posConfig = env.posConfig;

const PlaywrightConfig = constants.PlaywrightConfig;
const userAuthStorage = constants.AuthStorage.user;

const listReporter: ReporterDescription = ['list', { printSteps: true }];
const jsonReporter: ReporterDescription = [
	'json',
	{ outputFile: PlaywrightConfig.jsonReportFile },
];
const allureReporter: ReporterDescription = [
	'allure-playwright',
	PlaywrightConfig.allureReportConfig,
];

const chromeProject: PlaywrightTestProject = {
	name: 'chrome',
	dependencies: ['setup'],
	use: {
		...devices['Desktop Chrome'],
		storageState: userAuthStorage,
	},
};
const edgeProject: PlaywrightTestProject = {
	name: 'edge',
	dependencies: ['setup'],
	use: {
		...devices['Desktop Edge'],
		storageState: userAuthStorage,
	},
};

// BDD config
const testDir = defineBddConfig({
	featuresRoot: PlaywrightConfig.bddRoot,
	outputDir: PlaywrightConfig.bddOutput,

	matchKeywords: true,
});

// Playwright config
export default defineConfig({
	testDir,
	outputDir: PlaywrightConfig.artifactsDir,
	snapshotPathTemplate: '__snapshots__/{testFileDir}/{testFileName}/{arg}{ext}',

	fullyParallel: true,

	// CI config
	forbidOnly: isCI,
	retries: isCI ? 2 : 1,
	workers: isCI ? 4 : undefined,

	expect: {
		timeout: 15_000,
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.05,
		},
	},

	reporter: isCI
		? [
				listReporter,
				jsonReporter,
				allureReporter,
				['junit', { outputFile: PlaywrightConfig.junitReportFile }],
			]
		: [
				listReporter,
				jsonReporter,
				allureReporter,
				[
					'html',
					{ outputFolder: PlaywrightConfig.htmlReportDir, open: 'never' },
				],
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
			testMatch: ['auth.setup.ts'],
			teardown: 'teardown',
		},
		{
			name: 'teardown',
			testDir: './src',
			testMatch: isCI ? [] : ['report.teardown.ts'],
		},

		/* -------------------------- Cross-browser testing ------------------------- */

		...(isCI ? [chromeProject, edgeProject] : [chromeProject]),
	],
});
