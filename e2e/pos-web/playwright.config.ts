import {
	defineConfig,
	devices,
	type PlaywrightTestProject,
	type ReporterDescription,
} from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

import { constants } from './src/const';
import { env } from './src/env';
import { type Fixtures } from './src/steps/fixtures';
import { getConfig } from './src/test-config';
import { UserRole } from './src/types/common';

const isCI = env.isCI;
const baseURL = env.baseURL;

const PlaywrightConfig = constants.PlaywrightConfig;
const adminAuthStorage = constants.AuthStorage[UserRole.ADMIN];

const listReporter: ReporterDescription = ['list', { printSteps: true }];
const jsonReporter: ReporterDescription = [
	'json',
	{ outputFile: PlaywrightConfig.jsonReportFile },
];
const allureReporter: ReporterDescription = [
	'allure-playwright',
	PlaywrightConfig.allureReportConfig,
];

const chromeProject: PlaywrightTestProject<Fixtures> = {
	name: 'chrome',
	dependencies: ['setup'],
	use: {
		...devices['Desktop Chrome'],
		timezoneId: getConfig('chrome').timezone,
		storageState: adminAuthStorage,

		testConfig: getConfig('chrome'),
	},
};
// const edgeProject: PlaywrightTestProject<Fixtures> = {
// 	name: 'edge',
// 	dependencies: ['setup'],
// 	use: {
// 		...devices['Desktop Edge'],
// 		timezoneId: getConfig('edge').timezone,
// 		storageState: adminAuthStorage,

// 		testConfig: getConfig('edge'),
// 	},
// };

// BDD config
const testDir = defineBddConfig({
	featuresRoot: PlaywrightConfig.bddRoot,
	outputDir: PlaywrightConfig.bddOutput,
	steps: ['src/features/**/*.ts', 'src/steps/**/*.ts'],

	matchKeywords: true,
});

// Playwright config
export default defineConfig<Fixtures>({
	testDir,
	outputDir: PlaywrightConfig.artifactsDir,
	snapshotPathTemplate: '__snapshots__/{testFileDir}/{testFileName}/{arg}{ext}',

	fullyParallel: true,

	// CI config
	forbidOnly: isCI,
	retries: isCI ? 2 : 0,
	workers: isCI ? 2 : undefined,

	expect: {
		timeout: 30_000,
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
		trace: isCI ? 'on-first-retry' : 'retain-on-first-failure',

		// general config for all projects
		baseURL,
		timezoneId: getConfig().timezone,
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

		...(isCI ? [chromeProject /* edgeProject */] : [chromeProject]),
	],
});
