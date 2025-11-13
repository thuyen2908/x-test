import { resolve } from 'node:path';

import { type Options } from '@wdio/types';

const __dirname = import.meta.dirname;

/**
 * WebdriverIO Configuration for Galaxy Me Mobile Testing
 *
 * This configuration supports:
 * - Android and iOS testing
 * - Local and cloud (BrowserStack/Sauce Labs) execution
 * - Cucumber BDD framework
 * - Allure reporting
 */
export const config: Options.Testrunner = {
	// ====================
	// Runner Configuration
	// ====================
	runner: 'local',
	autoCompileOpts: {
		autoCompile: true,
		tsNodeOpts: {
			project: './tsconfig.json',
			transpileOnly: true,
		},
	},

	// ==================
	// Specify Test Files
	// ==================
	specs: ['./src/features/**/*.feature'],
	exclude: [
		// Exclude files/patterns here
	],

	// ============
	// Capabilities
	// ============
	// Capabilities will be set dynamically based on platform
	capabilities: [],

	// ===================
	// Test Configurations
	// ===================
	logLevel: 'info',
	bail: 0,
	waitforTimeout: 30000,
	connectionRetryTimeout: 120000,
	connectionRetryCount: 3,

	// ====================
	// Test Framework Setup
	// ====================
	framework: 'cucumber',

	// Cucumber Options
	cucumberOpts: {
		require: ['./src/steps/**/*.ts'],
		backtrace: false,
		requireModule: [],
		dryRun: false,
		failFast: false,
		snippets: true,
		source: true,
		strict: false,
		tagExpression: '',
		timeout: 60000,
		ignoreUndefinedDefinitions: false,
	},

	// =====
	// Hooks
	// =====
	/**
	 * Gets executed once before all workers get launched.
	 */
	onPrepare: (config, capabilities) => {
		console.log('🚀 Preparing test execution...');
	},

	/**
	 * Gets executed before a worker process is spawned
	 */
	onWorkerStart: (cid, caps, specs, args, execArgv) => {
		console.log(`👷 Worker ${cid} started`);
	},

	/**
	 * Gets executed before test execution begins
	 */
	before: async (capabilities, specs) => {
		console.log('🎬 Test execution starting...');
		// Setup global test context
	},

	/**
	 * Runs before a Cucumber Feature
	 */
	beforeFeature: async (uri, feature) => {
		console.log(`📋 Feature: ${feature.name}`);
	},

	/**
	 * Runs before a Cucumber Scenario
	 */
	beforeScenario: async (world, context) => {
		console.log(`  📝 Scenario: ${world.pickle.name}`);
	},

	/**
	 * Runs after a Cucumber Scenario
	 */
	afterScenario: async (world, result, context) => {
		// Capture screenshot on failure
		if (result.status === 'FAILED') {
			const screenshotPath = `./test-artifacts/screenshots/FAILED_${Date.now()}.png`;
			await driver.saveScreenshot(screenshotPath);
			console.log(`📸 Screenshot saved: ${screenshotPath}`);
		}
	},

	/**
	 * Gets executed after all tests are done
	 */
	after: async (result, capabilities, specs) => {
		console.log('🏁 Test execution completed');
	},

	/**
	 * Gets executed after all workers got shut down and the process is about to exit
	 */
	onComplete: (exitCode, config, capabilities, results) => {
		console.log('✅ All tests completed');
	},

	// =========
	// Reporters
	// =========
	reporters: [
		'spec',
		[
			'allure',
			{
				outputDir: './allure-results',
				disableWebdriverStepsReporting: true,
				disableWebdriverScreenshotsReporting: false,
				useCucumberStepReporter: true,
			},
		],
	],

	// =====
	// Appium
	// =====
	services: [
		[
			'appium',
			{
				command: 'appium',
				logPath: './test-artifacts/logs/',
			},
		],
	],

	// ===========
	// Screenshots
	// ===========
	// Automatically save screenshots on test failure
};
