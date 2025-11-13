import { resolve } from 'node:path';

import dotenvx from '@dotenvx/dotenvx';
import { z } from 'zod';

/**
 * Environment Configuration Schema
 * Validates and type-checks all environment variables
 */
const EnvSchema = z.object({
	// Application Identifiers
	APP_PACKAGE_ANDROID: z.string().min(1),
	APP_ACTIVITY_ANDROID: z.string().min(1),
	APP_BUNDLE_IOS: z.string().min(1),

	// Test Environment
	TEST_ENV: z.enum(['dev', 'staging', 'production']).default('dev'),
	BASE_URL: z.string().url(),

	// Test Credentials
	TEST_USER_EMAIL: z.string().email(),
	TEST_USER_PASSWORD: z.string().min(8),
	ADMIN_EMAIL: z.string().email(),
	ADMIN_PASSWORD: z.string().min(8),
	TECHNICIAN_EMAIL: z.string().email().optional(),
	TECHNICIAN_PASSWORD: z.string().min(8).optional(),

	// Appium Server
	APPIUM_HOST: z.string().default('localhost'),
	APPIUM_PORT: z.coerce.number().default(4723),

	// Android Device Configuration
	ANDROID_DEVICE_NAME: z.string().default('Android Emulator'),
	ANDROID_VERSION: z.string().default('13'),
	ANDROID_PLATFORM_VERSION: z.string().default('13.0'),

	// iOS Device Configuration
	IOS_DEVICE_NAME: z.string().default('iPhone 15'),
	IOS_VERSION: z.string().default('17.0'),
	IOS_PLATFORM_VERSION: z.string().default('17.0'),

	// Test Execution Settings
	TEST_TIMEOUT: z.coerce.number().default(30000),
	PAGE_LOAD_TIMEOUT: z.coerce.number().default(60000),
	IMPLICIT_WAIT: z.coerce.number().default(5000),
	EXPLICIT_WAIT: z.coerce.number().default(30000),

	// Reporting
	SCREENSHOT_ON_FAILURE: z
		.string()
		.transform((val) => val === 'true')
		.default('true'),
	ALLURE_RESULTS_DIR: z.string().default('./allure-results'),
	LOG_LEVEL: z
		.enum(['error', 'warn', 'info', 'debug', 'verbose'])
		.default('info'),

	// CI/CD
	CI: z
		.string()
		.transform((val) => val === 'true')
		.default('false'),
	PARALLEL_TESTS: z.coerce.number().default(1),

	// Cloud Testing (Optional)
	BROWSERSTACK_USERNAME: z.string().optional(),
	BROWSERSTACK_ACCESS_KEY: z.string().optional(),
	SAUCELABS_USERNAME: z.string().optional(),
	SAUCELABS_ACCESS_KEY: z.string().optional(),

	// Network Configuration (Optional)
	PROXY_HOST: z.string().optional(),
	PROXY_PORT: z.coerce.number().optional(),
	PROXY_USERNAME: z.string().optional(),
	PROXY_PASSWORD: z.string().optional(),
});

type EnvType = z.infer<typeof EnvSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvType {}
	}
}

/**
 * Environment Configuration Manager
 * Loads and validates environment variables from .env file
 */
class EnvironmentConfig {
	private config: EnvType;
	private __dirname: string;

	constructor() {
		this.__dirname = import.meta.dirname;
		const envPath = resolve(this.__dirname, '../..', '.env');

		// Load environment variables
		dotenvx.config({
			path: [envPath],
			logLevel: 'error',
			ignore: ['DEPRECATION NOTICE'],
		});

		// Validate and parse environment variables
		try {
			this.config = EnvSchema.parse(process.env);
		} catch (error) {
			console.error('❌ Environment validation failed:');
			if (error instanceof z.ZodError) {
				error.errors.forEach((err) => {
					console.error(`  - ${err.path.join('.')}: ${err.message}`);
				});
			}
			throw new Error('Invalid environment configuration');
		}
	}

	/**
	 * Get a specific environment variable
	 */
	get<K extends keyof EnvType>(key: K): EnvType[K] {
		return this.config[key];
	}

	/**
	 * Check if running in CI environment
	 */
	get isCI(): boolean {
		return this.config.CI;
	}

	/**
	 * Check if BrowserStack is configured
	 */
	get isBrowserStack(): boolean {
		return !!(
			this.config.BROWSERSTACK_USERNAME && this.config.BROWSERSTACK_ACCESS_KEY
		);
	}

	/**
	 * Check if Sauce Labs is configured
	 */
	get isSauceLabs(): boolean {
		return !!(
			this.config.SAUCELABS_USERNAME && this.config.SAUCELABS_ACCESS_KEY
		);
	}

	/**
	 * Get current test environment
	 */
	get environment(): 'dev' | 'staging' | 'production' {
		return this.config.TEST_ENV;
	}

	/**
	 * Get Appium server URL
	 */
	get appiumUrl(): string {
		return `http://${this.config.APPIUM_HOST}:${this.config.APPIUM_PORT}`;
	}

	/**
	 * Get all configuration (for debugging)
	 */
	getAll(): EnvType {
		return { ...this.config };
	}
}

// Export singleton instance
export const env = new EnvironmentConfig();
