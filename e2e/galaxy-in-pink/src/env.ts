import { resolve } from 'node:path';

import dotenvx from '@dotenvx/dotenvx';
import z from 'zod';

import { Env as BaseEnv } from '@x-test/common/env';

const EnvSchema = z.object({
	BASE_URL_GALAXY_IN_PINK: z.string().url(),
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
		return this.get('BASE_URL_GALAXY_IN_PINK');
	}
}

export const env = new Env();
