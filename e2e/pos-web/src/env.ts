import { resolve } from 'node:path';
import dotenvx from '@dotenvx/dotenvx';
import z from 'zod';

import { Env as BaseEnv } from '@x-test/common/env';

const EnvSchema = z.object({
	BASE_URL: z.string(),

	POS_TIMEZONE: z.string().default('UTC'),
	POS_USERNAME: z.string(),
	POS_PASSWORD: z.string(),
	POS_SALON_NAME: z.string(),

	CLOCK_IN_PASSWORD: z.string(),
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
		dotenvx.config({ path: [envPath] });

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
		return this.get('BASE_URL');
	}

	/**
	 * Retrieve the POS configuration
	 */
	public get posConfig() {
		return {
			timezone: this.get('POS_TIMEZONE'),
			username: this.get('POS_USERNAME'),
			password: this.get('POS_PASSWORD'),
			salonName: this.get('POS_SALON_NAME'),

			clockInPassword: this.get('CLOCK_IN_PASSWORD'),
		};
	}
}

export const env = new Env();
