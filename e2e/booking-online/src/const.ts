import { platform, release, version } from 'node:os';
import { resolve } from 'node:path';

import { PageId } from '#types';

import { env } from './env';

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

		return {
			distDir,
			artifactsDir,
			reportDir: playwrightReportDir,

			bddRoot: resolve(projectRoot, 'src/features'),
			bddOutput: resolve(distDir, 'bdd'),

			htmlReportDir: playwrightReportDir,
			jsonReportFile: resolve(playwrightReportDir, 'report.json'),
			junitReportFile: resolve(playwrightReportDir, 'results.xml'),
		} as const;
	}

	/**
	 * Retrieve a mapping between page identifiers and their URLs
	 */
	public get PageUrl(): Record<PageId, string> {
		const baseURL = env.baseURL;

		return {
			[PageId.HOME]: baseURL,
			// Add more page URLs as needed
		} as const;
	}
}

export const constants = new Const();
