import os from 'node:os';
import { resolve } from 'node:path';

import { env } from './env';
import { PageId } from './typings';

const __dirname = import.meta.dirname;
const projectRoot = resolve(__dirname, '..');

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
		const allureReportDir = resolve(projectRoot, 'allure-report');

		return {
			distDir,
			artifactsDir,
			reportDir: playwrightReportDir,

			bddRoot: resolve(projectRoot, 'src/features'),
			bddOutput: resolve(distDir, 'bdd'),

			htmlReportDir: playwrightReportDir,
			jsonReportFile: resolve(playwrightReportDir, 'report.json'),
			allureReportDir,
			allureReportConfig: {
				resultsDir: allureReportDir,
				environmentInfo: {
					os_platform: os.platform(),
					os_release: os.release(),
					os_version: os.version(),
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
