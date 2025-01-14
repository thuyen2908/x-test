import dotenvx from '@dotenvx/dotenvx';
import z from 'zod';

import { Env as BaseEnv } from '@x-test/common/env';

const EnvSchema = z.object({});

/**
 * Extend the common environment variables with this project specific ones
 */
class Env extends BaseEnv<typeof EnvSchema> {
	constructor() {
		// load .env
		dotenvx.config({ path: ['../../.env'] });

		// extend the common schema with ours
		super(EnvSchema);
	}

	/**
	 * Determine if the current environment is CI
	 */
	public get isCI() {
		return this.get('NODE_ENV') === 'ci';
	}
}

export const env = new Env();
