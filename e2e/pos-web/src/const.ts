import { platform, release, version } from 'node:os';
import { resolve } from 'node:path';

import { type HTTPMethod, PageId, UserRole } from '#types';

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
			junitReportFile: resolve(playwrightReportDir, 'results.xml'),

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
		} as const;
	}

	/**
	 * Get the authentication storage path for each role
	 */
	public get AuthStorage(): Record<UserRole, string> {
		const { artifactsDir } = this.PlaywrightConfig;

		return {
			[UserRole.ADMIN]: resolve(artifactsDir, `.auth/${UserRole.ADMIN}.json`),
		} as const;
	}

	/**
	 * Retrieve a mapping between page identifiers and their URLs
	 */
	public get PageUrl(): Record<PageId, string> {
		const baseURL = env.baseURL;

		return {
			[PageId.HOME]: baseURL,
			[PageId.LOGIN]: `${baseURL}/login`,
			[PageId.TICKET_VIEW]: `${baseURL}/tickets`,
			[PageId.WAITING_LIST]: `${baseURL}/waiting-list`,
			[PageId.GIFT_CARD_BALANCE]: `${baseURL}/gift-card-balance`,
			[PageId.LOYALTY_BALANCE]: `${baseURL}/loyalty-balance`,
			[PageId.CLOSED_TICKETS]: `${baseURL}/closed-tickets`,
			[PageId.TICKET_ADJUSTMENT]: `${baseURL}/management/ticket-adjustment`,
		} as const;
	}

	/**
	 * APIs endpoints called by our web
	 */
	public get APIs() {
		return {
			'Get In-Service Tickets': ['GET', '/ticket-v2/get-ticket-inservices'],
			'Save lock number': ['POST', '/ticket-management/save-lock-number'],
		} as const satisfies Record<string, [method: HTTPMethod, url: string]>;
	}
}

export const constants = new Const();
