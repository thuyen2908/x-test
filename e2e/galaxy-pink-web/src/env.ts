import { resolve } from 'node:path';

import dotenvx from '@dotenvx/dotenvx';
import z from 'zod';

import { Env as BaseEnv } from '@x-test/common/env';

const EnvSchema = z.object({
	PW_BASE_URL_PINK: z.string(),

	PW_ADMIN_NAME_PINK: z.string(),
	PW_ADMIN_EMAIL_PINK: z.string(),
	PW_ADMIN_PASSWORD_PINK: z.string(),

	PW_TIMEZONE_CHROME_PINK: z.string().default('UTC'),
	PW_TIMEZONE_EDGE_PINK: z.string().default('UTC'),

	PW_MERCHANT_NAME_CHROME_PINK: z.string(),
	PW_MERCHANT_NAME_EDGE_PINK: z.string(),
});

type ProcessEnvType = z.infer<typeof EnvSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends ProcessEnvType {}
	}
}

const __dirname = import.meta.dirname;
const envPath = resolve(__dirname, '../../..', '.env');

/**
 * Extend the common environment variables with this project specific ones
 */
class Env extends BaseEnv<typeof EnvSchema> {
	constructor() {
		// load .env
		dotenvx.config({
			path: [envPath],
			logLevel: 'error',
			ignore: ['DEPRECATION NOTICE'],
		});

		// extend the common schema with ours
		super(EnvSchema);
	}

	/**
	 * Determine if the current environment is CI
	 */
	public get isCI() {
		return this.get('NODE_ENV') === 'ci';
	}

	/**
	 * Retrieve the base URL for all tests
	 */
	public get baseURL() {
		return this.get('PW_BASE_URL_PINK');
	}

	/**
	 * Retrieve the POS configuration
	 */
	public get posConfig() {
		return {
			adminName: this.get('PW_ADMIN_NAME_PINK'),
			adminEmail: this.get('PW_ADMIN_EMAIL_PINK'),
			adminPassword: this.get('PW_ADMIN_PASSWORD_PINK'),

			chrome: {
				timezone: this.get('PW_TIMEZONE_CHROME_PINK'),
				merchantName: this.get('PW_MERCHANT_NAME_CHROME_PINK'),
			},
			edge: {
				timezone: this.get('PW_TIMEZONE_EDGE_PINK'),
				merchantName: this.get('PW_MERCHANT_NAME_EDGE_PINK'),
			},
		};
	}
}

export const env = new Env();
