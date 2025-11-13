import { resolve } from 'node:path';

import { type Capabilities } from '@wdio/types';

import { type Platform } from '#types';

import { env } from './env.config';

/**
 * Appium Capabilities Builder
 * Generates platform-specific capabilities for Android and iOS
 */
export class AppiumCapabilities {
	private static readonly appsDir = resolve(
		import.meta.dirname,
		'../..',
		'apps',
	);

	/**
	 * Get Android capabilities for local testing
	 */
	static getAndroidCapabilities(): Capabilities.AppiumAndroidCapabilities {
		const apkPath = resolve(
			AppiumCapabilities.appsDir,
			'android',
			'GalaxyMe_1.2.3_PROD.apk',
		);

		return {
			platformName: 'Android',
			'appium:automationName': 'UiAutomator2',
			'appium:deviceName': env.get('ANDROID_DEVICE_NAME'),
			'appium:platformVersion': env.get('ANDROID_PLATFORM_VERSION'),
			'appium:app': apkPath,
			'appium:appPackage': env.get('APP_PACKAGE_ANDROID'),
			'appium:appActivity': env.get('APP_ACTIVITY_ANDROID'),
			'appium:noReset': false,
			'appium:fullReset': false,
			'appium:autoGrantPermissions': true,
			'appium:newCommandTimeout': 300000,
			'appium:uiautomator2ServerInstallTimeout': 60000,
			'appium:adbExecTimeout': 30000,
			'appium:disableWindowAnimation': true,
			'appium:skipUnlock': true,
			'appium:unicodeKeyboard': true,
			'appium:resetKeyboard': true,
		};
	}

	/**
	 * Get iOS capabilities for local testing
	 */
	static getIOSCapabilities(): Capabilities.AppiumIOSCapabilities {
		const ipaPath = resolve(
			AppiumCapabilities.appsDir,
			'ios',
			'GalaxyMe_1.2.3_PROD.ipa',
		);

		return {
			platformName: 'iOS',
			'appium:automationName': 'XCUITest',
			'appium:deviceName': env.get('IOS_DEVICE_NAME'),
			'appium:platformVersion': env.get('IOS_PLATFORM_VERSION'),
			'appium:app': ipaPath,
			'appium:bundleId': env.get('APP_BUNDLE_IOS'),
			'appium:noReset': false,
			'appium:fullReset': false,
			'appium:autoAcceptAlerts': true,
			'appium:autoDismissAlerts': false,
			'appium:newCommandTimeout': 300000,
			'appium:wdaLaunchTimeout': 60000,
			'appium:wdaConnectionTimeout': 60000,
			'appium:shouldUseSingletonTestManager': false,
			'appium:useNewWDA': false,
			'appium:usePrebuiltWDA': true,
		};
	}

	/**
	 * Get BrowserStack capabilities
	 */
	static getBrowserStackCapabilities(
		platform: Platform,
	): Capabilities.Capabilities {
		const baseCapabilities =
			platform === 'android'
				? AppiumCapabilities.getAndroidCapabilities()
				: AppiumCapabilities.getIOSCapabilities();

		return {
			...baseCapabilities,
			'bstack:options': {
				userName: env.get('BROWSERSTACK_USERNAME'),
				accessKey: env.get('BROWSERSTACK_ACCESS_KEY'),
				projectName: 'Galaxy Me E2E Tests',
				buildName: `Build-${Date.now()}`,
				sessionName: `Galaxy Me ${platform.toUpperCase()} Test`,
				// BrowserStack specific options
				debug: true,
				networkLogs: true,
				video: true,
				appiumLogs: true,
				deviceLogs: true,
				local: false,
				// Device selection for cloud
				...(platform === 'android'
					? {
							deviceName: 'Samsung Galaxy S23',
							osVersion: '13.0',
						}
					: {
							deviceName: 'iPhone 15',
							osVersion: '17',
						}),
			},
		};
	}

	/**
	 * Get Sauce Labs capabilities
	 */
	static getSauceLabsCapabilities(
		platform: Platform,
	): Capabilities.Capabilities {
		const baseCapabilities =
			platform === 'android'
				? AppiumCapabilities.getAndroidCapabilities()
				: AppiumCapabilities.getIOSCapabilities();

		return {
			...baseCapabilities,
			'sauce:options': {
				username: env.get('SAUCELABS_USERNAME'),
				accessKey: env.get('SAUCELABS_ACCESS_KEY'),
				name: `Galaxy Me ${platform.toUpperCase()} Test`,
				build: `Build-${Date.now()}`,
				// Sauce Labs specific options
				recordVideo: true,
				recordScreenshots: true,
				recordDeviceVitals: true,
				// Device selection for cloud
				...(platform === 'android'
					? {
							deviceName: 'Google Pixel 7',
							platformVersion: '13',
						}
					: {
							deviceName: 'iPhone 15 Simulator',
							platformVersion: '17.0',
						}),
			},
		};
	}

	/**
	 * Get capabilities based on environment and cloud provider
	 */
	static getCapabilities(
		platform: Platform,
		cloud?: 'browserstack' | 'saucelabs',
	): Capabilities.Capabilities {
		if (cloud === 'browserstack' && env.isBrowserStack) {
			return AppiumCapabilities.getBrowserStackCapabilities(platform);
		}

		if (cloud === 'saucelabs' && env.isSauceLabs) {
			return AppiumCapabilities.getSauceLabsCapabilities(platform);
		}

		// Default to local capabilities
		return platform === 'android'
			? AppiumCapabilities.getAndroidCapabilities()
			: AppiumCapabilities.getIOSCapabilities();
	}

	/**
	 * Get common capabilities shared across platforms
	 */
	static getCommonCapabilities(): Partial<Capabilities.Capabilities> {
		return {
			'appium:newCommandTimeout': env.get('TEST_TIMEOUT'),
			'appium:orientation': 'PORTRAIT',
			'appium:language': 'en',
			'appium:locale': 'US',
			'appium:autoWebview': false,
			'appium:nativeWebScreenshot': true,
			'appium:enablePerformanceLogging': true,
		};
	}
}
