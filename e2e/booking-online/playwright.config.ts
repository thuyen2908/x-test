import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

import { constants } from './src/const';
import { env } from './src/env';

const isCI = env.isCI;
const baseURL = env.baseURL;

const PlaywrightConfig = constants.PlaywrightConfig;

// BDD config
const testDir = defineBddConfig({
	featuresRoot: PlaywrightConfig.bddRoot,
	outputDir: PlaywrightConfig.bddOutput,
	steps: ['src/features/**/*.ts', 'src/steps/**/*.ts'],
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
	retries: isCI ? 2 : 0,
	workers: isCI ? 2 : undefined,

	expect: {
		timeout: 30_000,
	},

	reporter: [
		['list', { printSteps: true }],
		['json', { outputFile: PlaywrightConfig.jsonReportFile }],
	],

	use: {
		trace: isCI ? 'on-first-retry' : 'retain-on-first-failure',
		screenshot: 'only-on-failure',
		viewport: { width: 1920, height: 1080 },
		baseURL,
		// headless: false, // Run tests with visible browser
	},

	projects: [
		{
			name: 'chrome',
			use: {
				...devices['Desktop Chrome'],
			},
		},
	],
});
