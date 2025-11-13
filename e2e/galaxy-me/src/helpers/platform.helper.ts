import { type Platform } from '#types';

/**
 * Platform Detection and Management Helper
 * Provides utilities to detect and work with different mobile platforms
 */
export class PlatformHelper {
	private static _platform: Platform | undefined;

	/**
	 * Get the current platform from driver capabilities
	 */
	static get platform(): Platform {
		if (!PlatformHelper._platform) {
			// Get platform from WebdriverIO driver
			PlatformHelper._platform = driver.isAndroid ? 'android' : 'ios';
		}
		return PlatformHelper._platform;
	}

	/**
	 * Set platform explicitly (useful for testing)
	 */
	static setPlatform(platform: Platform): void {
		PlatformHelper._platform = platform;
	}

	/**
	 * Check if current platform is Android
	 */
	static isAndroid(): boolean {
		return PlatformHelper.platform === 'android';
	}

	/**
	 * Check if current platform is iOS
	 */
	static isIOS(): boolean {
		return PlatformHelper.platform === 'ios';
	}

	/**
	 * Execute platform-specific action
	 * Allows you to provide different implementations for Android and iOS
	 *
	 * @example
	 * await PlatformHelper.executePlatformAction(
	 *   async () => { // Android action
	 *     await driver.pressKeyCode(4); // Back button
	 *   },
	 *   async () => { // iOS action
	 *     await driver.back(); // Swipe back
	 *   }
	 * );
	 */
	static async executePlatformAction<T>(
		androidAction: () => Promise<T>,
		iosAction: () => Promise<T>,
	): Promise<T> {
		return PlatformHelper.isAndroid()
			? await androidAction()
			: await iosAction();
	}

	/**
	 * Execute action only on Android
	 */
	static async executeOnAndroid(action: () => Promise<void>): Promise<void> {
		if (PlatformHelper.isAndroid()) {
			await action();
		}
	}

	/**
	 * Execute action only on iOS
	 */
	static async executeOnIOS(action: () => Promise<void>): Promise<void> {
		if (PlatformHelper.isIOS()) {
			await action();
		}
	}

	/**
	 * Get platform-specific value
	 *
	 * @example
	 * const timeout = PlatformHelper.getPlatformValue(5000, 8000); // Android: 5000, iOS: 8000
	 */
	static getPlatformValue<T>(androidValue: T, iosValue: T): T {
		return PlatformHelper.isAndroid() ? androidValue : iosValue;
	}

	/**
	 * Get platform display name
	 */
	static getPlatformName(): string {
		return (
			PlatformHelper.platform.charAt(0).toUpperCase() +
			PlatformHelper.platform.slice(1)
		);
	}

	/**
	 * Reset platform cache (useful for testing)
	 */
	static reset(): void {
		PlatformHelper._platform = undefined;
	}
}
