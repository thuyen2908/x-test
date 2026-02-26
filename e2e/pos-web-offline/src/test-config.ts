import { type Browser } from '#types';

import { env } from './env';

/**
 * Test configuration
 */
export interface TestConfig {
	adminName: string;
	adminEmail: string;
	adminPassword: string;

	timezone: string;
	merchantName: string;
}

/**
 * Test configuration provider function
 */
export const getConfig = (browser: Browser = 'chrome'): TestConfig => {
	const { posConfig } = env;

	return {
		adminName: posConfig.adminName,
		adminEmail: posConfig.adminEmail,
		adminPassword: posConfig.adminPassword,

		timezone: posConfig[browser].timezone,
		merchantName: posConfig[browser].merchantName,
	};
};
