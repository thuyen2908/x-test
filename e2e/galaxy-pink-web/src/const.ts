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
			[PageId.CREATE_WAITING]: `${baseURL}/waiting-list/create`,
			[PageId.GIFT_CARD_BALANCE]: `${baseURL}/gift-card-balance`,
			[PageId.LOYALTY_BALANCE]: `${baseURL}/loyalty-balance`,
			[PageId.CLOSED_TICKETS]: `${baseURL}/closed-tickets`,
			[PageId.APPOINTMENT]: `${baseURL}/appointments`,
			[PageId.TICKET_ADJUSTMENT]: `${baseURL}/management/ticket-adjustment`,
			[PageId.PAYROLL]: `${baseURL}/management/payroll`,
			[PageId.TURN_DETAILS]: `${baseURL}/turn-details`,
			[PageId.CLOCK_IN_OTHERS]: `${baseURL}/clock-in-others`,
			[PageId.EMPLOYEES]: `${baseURL}/management/employees`,
			[PageId.EMPLOYEES_CREATE]: `${baseURL}/management/employees/create`,
			[PageId.CATEGORIES]: `${baseURL}/management/categories`,
			[PageId.PRODUCTS]: `${baseURL}/management/products`,
			[PageId.TAX]: `${baseURL}/management/tax`,
			[PageId.DISCOUNT]: `${baseURL}/management/discount`,
			[PageId.DISCOUNT_CREATE]: `${baseURL}/management/discount/create`,
			[PageId.DEPARTMENT]: `${baseURL}/management/department`,
			[PageId.VOID_REASONS]: `${baseURL}/management/void-reasons`,
			[PageId.APPOINTMENT_COLOR]: `${baseURL}/management/appointment-color`,
			[PageId.APPOINTMENT_TYPES]: `${baseURL}/management/appointment-types`,
			[PageId.CUSTOMERS]: `${baseURL}/management/customers`,
			[PageId.CLOSE_OUT]: `${baseURL}/management/close-out`,
			[PageId.TICKET_PAYMENTS]: `${baseURL}/management/ticket-payment`,
			[PageId.WAIT_LOG]: `${baseURL}/management/wait-log`,
			[PageId.APPOINTMENT_LOG]: `${baseURL}/management/appointment-log`,
			[PageId.ACTIVITY_LOG]: `${baseURL}/management/activity-log`,
			[PageId.RUN_LOG]: `${baseURL}/management/run-log`,
			[PageId.SMS_LOG]: `${baseURL}/management/sms-log`,
			[PageId.CONNECTION_LOG]: `${baseURL}/management/connection-log`,
			[PageId.QUICK_PAYROLL]: `${baseURL}/management/quick-payroll`,
			[PageId.CASH_IN_OUT]: `${baseURL}/management/cash-in-out`,
			[PageId.MANAGER_TIMESHEET]: `${baseURL}/management/timesheet`,
			[PageId.ONLINE_GIFT_CARD_INVENTORY]: `${baseURL}/management/online-gift-card-inventory`,
			[PageId.PAID_ONLINE_GIFT_CARD]: `${baseURL}/management/paid-online-gift-card`,
			[PageId.POSITIONS]: `${baseURL}/management/job-codes`,
		} as const;
	}

	/**
	 * APIs endpoints called by our web
	 */
	public get APIs() {
		return {
			'Get In-Service Tickets': ['GET', '/ticket-v2/get-ticket-inservices'],
			'Create a ticket': ['POST', '/ticket-v2/create-ticket'],
		} as const satisfies Record<string, [method: HTTPMethod, url: string]>;
	}
}

export const constants = new Const();
