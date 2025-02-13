import { platform, release, version } from 'node:os';
import { resolve } from 'node:path';

import { env } from './env';

const __dirname = import.meta.dirname;
const projectRoot = resolve(__dirname, '..');

/**
 * Page identifiers
 */
export enum PageId {
	HOME = 'HOME',
	LOGIN = 'LOGIN',
}

/**
 * An utility class, which contains all the constants used in our project
 */
export class Const {
	/**
	 * Retrieve Playwright configuration
	 */
	public get PlaywrightConfig() {
		const distDir = resolve(projectRoot, 'dist');
		const artifactsDir = resolve(projectRoot, 'test-artifacts');
		const playwrightReportDir = resolve(projectRoot, 'playwright-report');

		const allureResultsDir = resolve(projectRoot, 'allure-results');
		const allureReportDir = resolve(projectRoot, 'allure-report');
		const allureReportGenerationTimeout = 5_000; // in ms

		return {
			distDir,
			artifactsDir,
			reportDir: playwrightReportDir,

			bddRoot: resolve(projectRoot, 'src/features'),
			bddOutput: resolve(distDir, 'bdd'),

			htmlReportDir: playwrightReportDir,
			jsonReportFile: resolve(playwrightReportDir, 'report.json'),

			allureResultsDir,
			allureReportDir,
			allureReportGenerationTimeout,
			allureReportConfig: {
				environmentInfo: {
					os_platform: platform(),
					os_release: release(),
					os_version: version(),
					node_version: process.version,
				},
			},
		};
	}

	/**
	 * Get the authentication storage path for each role
	 */
	public get AuthStorage() {
		const { artifactsDir } = this.PlaywrightConfig;

		return {
			user: resolve(artifactsDir, '.auth/user.json'),
		};
	}

	/**
	 * Retrieve a mapping between page identifiers and their URLs
	 */
	public get PageUrl() {
		const baseURL = env.baseURL;

		return {
			[PageId.HOME]: baseURL,
			[PageId.LOGIN]: `${baseURL}/login`,
		} satisfies Record<PageId, string>;
	}
}

export const constants = new Const();
